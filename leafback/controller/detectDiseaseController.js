const axios = require("axios");
const FormData = require("form-data");
const Predictedclass = require("../model/Predictedclass.js");
const ScanHistory = require("../model/ScanHistroy");
const cloudinary = require("../util/cloudnairy");
const diseaseCache = new Map();

const uploadToCloudinary = (buffer) =>
    new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: "agrisense_leaves" },
            (err, result) => (err ? reject(err) : resolve(result.secure_url))
        );
        stream.end(buffer);
    });

const getLanguage = (body) => {
    const lang = (body.language || "en").toLowerCase();
    return lang === "hi" || lang === "hindi" ? "hi" : "en";
};

const buildGreeting = (pres, confidence, userName, lang) => {
    const isHindi = lang === "hi";
    const crop = isHindi ? pres.crop_hi : pres.crop_en;
    const disease = isHindi ? pres.disease_hi : pres.disease_en;

    return isHindi
        ? `आपके धैर्य के लिए धन्यवाद ${userName}। आपके ${crop} में ${confidence}% संभावना के साथ ${disease} की पहचान की गई है।`
        : `Thank you for your patience ${userName}. Your ${crop} is diagnosed with ${disease} with ${confidence}% confidence.`;
};

const INVALID_VALUES = new Set(["N/A", "None", "none", "लागू नहीं", "कोई नहीं"]);

const cleanObject = (obj) => {
    for (const key in obj) {
        const val = obj[key];
        if (typeof val === "string") {
            if ([...INVALID_VALUES].some((v) => val.includes(v))) {
                obj[key] = "";
            }
        } else if (val && typeof val === "object") {
            cleanObject(val);
        }
    }
};
exports.detectDisease = async (req, res) => {
    try {
        // 1. Validate upload
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: "No images uploaded." });
        }
        const form = new FormData();
        req.files.forEach((file) =>
            form.append("files", file.buffer, { filename: file.originalname })
        );

        let pythonResponse;
        try {
            pythonResponse = await axios.post(
                "http://127.0.0.1:8000/predict",
                form,
                { headers: form.getHeaders(), timeout: 30_000 }
            );
        } catch (err) {
            const isTimeout = err.code === "ECONNABORTED";
            return res.status(502).json({
                success: false,
                message: isTimeout
                    ? "Prediction service timed out. Please try again."
                    : "Prediction service is unavailable.",
            });
        }

        // 3. Early-exit if Python rejected the image
        if (!pythonResponse.data.success) {
            return res.status(400).json({
                success: false,
                message: pythonResponse.data.error,
                details: pythonResponse.data.details || [],
            });
        }

        // 4. Validate predicted class
        const predictedFolder =
            pythonResponse.data.raw_class ?? pythonResponse.data.predicted_class;

        if (!predictedFolder) {
            return res.status(502).json({
                success: false,
                message: "Prediction service returned an invalid response.",
            });
        }

        const confidence = pythonResponse.data.confidence;

        // 5. Upload image + fetch prescription in parallel (prediction already succeeded)
        const [imageUrl, prescriptionDoc] = await Promise.all([
            uploadToCloudinary(req.files[0].buffer), // Only first image — intentional
            diseaseCache.has(predictedFolder)
                ? Promise.resolve(diseaseCache.get(predictedFolder))
                : Predictedclass.findOne({ folder_name: predictedFolder }),
        ]);

        if (!prescriptionDoc) {
            return res.status(404).json({
                success: false,
                message: `No disease data found for: ${predictedFolder}`,
            });
        }

        // Cache for future lookups (disease data is static)
        if (!diseaseCache.has(predictedFolder)) {
            diseaseCache.set(predictedFolder, prescriptionDoc);
        }
        const newScan = await ScanHistory.create({
            user_id: req.user?.id || null,
            image_url: imageUrl,
            predicted_class: predictedFolder,
            confidence_score: confidence,
        });
        const scanId = newScan._id.toString();

        const lang = getLanguage(req.body);
        const userName = req.body.userName || (lang === "hi" ? "किसान" : "Farmer");

        const pres = prescriptionDoc.toObject();
        cleanObject(pres);

        return res.json({
            scan_id: scanId,
            success: true,
            image_url: imageUrl,
            ai_greeting: buildGreeting(pres, confidence, userName, lang),
            ai_prediction: {
                class: predictedFolder,
                confidence,
            },
            prescription: pres,
        });

    } catch (error) {
        console.error("Detection Error:", error);
        return res.status(500).json({
            success: false,
            message: "An internal server error occurred during disease detection.",
        });
    }
};