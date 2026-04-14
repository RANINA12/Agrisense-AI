from fastapi import FastAPI, UploadFile, File, HTTPException
from contextlib import asynccontextmanager
from typing import List
import tensorflow as tf
import numpy as np
from PIL import Image, UnidentifiedImageError
import io
import asyncio
import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
IMG_SIZE           = (224, 224)
CONFIDENCE_THRESHOLD = 0.60
MAX_FILES          = 4
MAX_FILE_SIZE_MB   = 20
MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024
ALLOWED_MIME_TYPES = {"image/jpeg", "image/png", "image/webp"}

ml = {} 

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Loading AI model...")
    ml["model"] = tf.keras.models.load_model("best_crop_model.keras")
    dummy = np.zeros((1, *IMG_SIZE, 3), dtype=np.float32)
    ml["model"].predict(dummy, verbose=0)
    logger.info("Loading class names...")
    with open("class_names.txt") as f:
        ml["class_names"] = [line.strip() for line in f if line.strip()]

    logger.info(f"Ready — {len(ml['class_names'])} classes loaded.")
    yield
    ml.clear()

app = FastAPI(lifespan=lifespan)
def decode_image(contents: bytes, filename: str) -> Image.Image:
    """Decode bytes → PIL Image, raising HTTPException on bad input."""
    try:
        img = Image.open(io.BytesIO(contents)).convert("RGB")
        return img
    except UnidentifiedImageError:
        raise HTTPException(
            status_code=400,
            detail=f"'{filename}' is not a valid image file."
        )
def preprocess_batch(images: List[Image.Image]) -> np.ndarray:
    """
    Resize + normalize a list of PIL images into a single batched array.
    Shape: (N, 224, 224, 3) — one model.predict() call for all images.
    """
    arrays = [
        np.array(img.resize(IMG_SIZE), dtype=np.float32) / 255.0
        for img in images
    ]
    return np.stack(arrays, axis=0)  # (N, H, W, 3)

def validate_file(file: UploadFile, contents: bytes) -> None:
    """Raise HTTPException if file fails type or size checks."""
    if file.content_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(
            status_code=415,
            detail=f"'{file.filename}' has unsupported type '{file.content_type}'. "
                   f"Allowed: JPEG, PNG, WEBP."
        )
    if len(contents) > MAX_FILE_SIZE_BYTES:
        raise HTTPException(
            status_code=413,
            detail=f"'{file.filename}' exceeds {MAX_FILE_SIZE_MB}MB limit."
        )

@app.post("/predict")
async def predict(files: List[UploadFile] = File(...)):
    if not files:
        raise HTTPException(status_code=400, detail="No images uploaded.")
    if len(files) > MAX_FILES:
        raise HTTPException(status_code=400, detail=f"Maximum {MAX_FILES} images allowed.")

    contents_list: List[bytes] = await asyncio.gather(*[f.read() for f in files])

   
    images: List[Image.Image] = []
    for file, contents in zip(files, contents_list):
        validate_file(file, contents)
        images.append(decode_image(contents, file.filename))

    batch = preprocess_batch(images)
    predictions: np.ndarray = await asyncio.get_event_loop().run_in_executor(
        None,
        lambda: ml["model"].predict(batch, verbose=0)   
    )

    class_names = ml["class_names"]
    valid_predictions  = []
    predicted_classes  = []
    individual_results = []

    for file, pred_row in zip(files, predictions):
        conf  = float(np.max(pred_row))
        index = int(np.argmax(pred_row))
        pred_class = class_names[index]

        if conf < CONFIDENCE_THRESHOLD:
            individual_results.append({
                "image":      file.filename,
                "status":     "rejected",
                "reason":     "Low confidence — unclear or unrecognizable leaf",
                "confidence": round(conf * 100, 2),
            })
        else:
            individual_results.append({
                "image":           file.filename,
                "status":          "accepted",
                "predicted_class": pred_class,
                "confidence":      round(conf * 100, 2),
            })
            valid_predictions.append(pred_row)
            predicted_classes.append(pred_class)
    if not valid_predictions:
        return {
            "success": False,
            "error":   "Could not confidently identify a leaf in any uploaded image. "
                       "Please retry with clear, well-lit photos.",
            "details": individual_results,
        }
    unique_classes = set(predicted_classes)
    if len(unique_classes) > 1:
        return {
            "success":       False,
            "error":         "Multiple different crops or diseases detected. "
                             "Please upload images of one plant issue at a time.",
            "detected_mix":  list(unique_classes),
            "details":       individual_results,
        }
    avg_pred        = np.mean(valid_predictions, axis=0)
    final_index     = int(np.argmax(avg_pred))
    final_confidence = float(np.max(avg_pred))
    final_class     = class_names[final_index]

    return {
        "success":          True,
        "predicted_class":  final_class,
        "confidence":       round(final_confidence * 100, 2),
        "stats": {
            "images_uploaded":        len(files),
            "images_accepted_by_ai":  len(valid_predictions),
        },
        "details": individual_results,
    }