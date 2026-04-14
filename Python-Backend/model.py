import os
import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout
from tensorflow.keras.models import Model, load_model
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint
from sklearn.utils.class_weight import compute_class_weight
from tensorflow.keras.layers import RandomFlip, RandomRotation, RandomZoom

TRAIN_DIR = r"C:\Users\91623\Desktop\final year project\Data fo Project\Data to detect diseases\Traning data"
VAL_DIR = r"C:\Users\91623\Desktop\final year project\Data fo Project\Data to detect diseases\Testing data"
IMG_SIZE = (224,224)
BATCH_SIZE = 32
MODEL_FILE = "best_crop_model.keras"

train_datagen = ImageDataGenerator(rescale=1./255)
val_datagen = ImageDataGenerator(rescale=1./255)

print("Loading training dataset...")
train_generator = train_datagen.flow_from_directory(
    TRAIN_DIR,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='categorical'
)

print("Loading validation dataset...")
val_generator = val_datagen.flow_from_directory(
    VAL_DIR,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='categorical'
)

NUM_CLASSES = train_generator.num_classes
print("Detected classes:", NUM_CLASSES)

true_labels = train_generator.classes
class_weights_array = compute_class_weight(
    class_weight='balanced',
    classes=np.unique(true_labels),
    y=true_labels
)
class_weights = dict(enumerate(class_weights_array))
print("Class weights calculated.")

if os.path.exists(MODEL_FILE):
    print(f"\n[INFO] Found existing model: {MODEL_FILE}")
    old_model = load_model(MODEL_FILE)
    
    # Check if the model's output matches the number of folders
    if old_model.output_shape[-1] == NUM_CLASSES:
        print("Model matches folder count. Resuming training where you left off...\n")
        model = old_model
    else:
        print(f"Upgrading model from {old_model.output_shape[-1]} classes to {NUM_CLASSES} classes...")
        # Keep everything except the final Dense classification layer
        x = old_model.layers[-2].output
        # Add a fresh final layer for the new total number of classes
        new_outputs = Dense(NUM_CLASSES, activation='softmax', name=f'predictions_{NUM_CLASSES}')(x)
        model = Model(inputs=old_model.input, outputs=new_outputs)
        
        # We MUST recompile because we added a new layer
        model.compile(
            optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
            loss=tf.keras.losses.CategoricalCrossentropy(label_smoothing=0.1),
            metrics=['accuracy']
        )
        print("Model upgraded and compiled successfully!\n")
        
else:
    print(f"\n[INFO] No existing model found. Building a new model...\n")
    
    data_augmentation = tf.keras.Sequential([
        RandomFlip("horizontal"),
        RandomRotation(0.1),
        RandomZoom(0.1)
    ])

    base_model = MobileNetV2(weights='imagenet', include_top=False, input_shape=(224,224,3))
    base_model.trainable = False

    inputs = tf.keras.Input(shape=(224,224,3))
    x = data_augmentation(inputs)
    x = base_model(x, training=False)
    x = GlobalAveragePooling2D()(x)
    x = Dense(256, activation='relu')(x)
    x = Dropout(0.5)(x)
    outputs = Dense(NUM_CLASSES, activation='softmax')(x)

    model = Model(inputs, outputs)

    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
        loss=tf.keras.losses.CategoricalCrossentropy(label_smoothing=0.1),
        metrics=['accuracy']
    )

model.summary()

early_stop = EarlyStopping(monitor='val_loss', patience=5, restore_best_weights=True)
checkpoint = ModelCheckpoint(MODEL_FILE, monitor='val_accuracy', save_best_only=True)
print("Starting/Resuming Phase 1 Training...")
history = model.fit(
    train_generator,
    epochs=20,
    validation_data=val_generator,
    class_weight=class_weights,
    callbacks=[early_stop, checkpoint]
)

print("Starting/Resuming Phase 2 Fine Tuning...")

# Dynamically find the MobileNetV2 layer inside the model so we can unfreeze it
base_model_layer = None
for layer in model.layers:
    if isinstance(layer, tf.keras.Model):
        base_model_layer = layer
        break

if base_model_layer:
    base_model_layer.trainable = True
    for layer in base_model_layer.layers[:-40]:
        layer.trainable = False

# Recompile with a slower learning rate for fine-tuning
model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=0.0001),
    loss=tf.keras.losses.CategoricalCrossentropy(label_smoothing=0.1),
    metrics=['accuracy']
)

history_finetune = model.fit(
    train_generator,
    epochs=10,
    validation_data=val_generator,
    class_weight=class_weights,
    callbacks=[early_stop, checkpoint]
)
class_names = list(train_generator.class_indices.keys())

with open("class_names.txt", "w") as f:
    for name in class_names:
        f.write(name + "\n")

print("Training complete.")
print(f"Model saved as {MODEL_FILE}")
print("Class names saved in class_names.txt")