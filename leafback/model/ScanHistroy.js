const mongoose = require("mongoose");

const ScanHistorySchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        image_url: {
            type: String,
            required: true,
            trim: true,
        },

        predicted_class: {
            type: String,
            required: true,
            trim: true,
        },

        confidence_score: {
            type: Number,
            required: true,
            min: 0,
            max: 100,
        },
    },
    { timestamps: true }
);
ScanHistorySchema.index({ user_id: 1, createdAt: -1 });

module.exports = mongoose.model("ScanHistory", ScanHistorySchema);