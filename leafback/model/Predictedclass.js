const mongoose = require("mongoose");

const Predictedclass = new mongoose.Schema({
    folder_name: {
        type: String,
        required: true,
        unique: true
    },

    crop_en: String,
    crop_hi: String,

    disease_en: String,
    disease_hi: String,

    scientific_name: String,

    type_en: String,
    type_hi: String,

    severity_en: String,
    severity_hi: String,

    possible_reason_en: String,
    possible_reason_hi: String,

    symptoms_en: String,
    symptoms_hi: String,

    precaution_method_en: String,
    precaution_method_hi: String,

    treatment: {
        pesticide_en: String,
        pesticide_hi: String,
        dosage_per_acre_en: String,
        dosage_per_acre_hi: String,
        water_required_en: String,
        water_required_hi: String
    },

    other_suggestion_en: String,
    other_suggestion_hi: String

}, { timestamps: true });

module.exports = mongoose.model("CropDisease", Predictedclass);