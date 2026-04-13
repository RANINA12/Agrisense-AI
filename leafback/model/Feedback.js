const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema(
    {
        scan_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ScanHistory",
            required: true,
            unique: true,
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        is_accurate: {
            type: Boolean,
            default: null,
        },
        wrong_leaf_detected: {
            type: Boolean,
            default: false,
        },
        wrong_disease: {
            type: Boolean,
            default: false,
        },
        wrong_treatment: {
            type: Boolean,
            default: false,
        },
        user_comment: {
            type: String,
            trim: true,
            maxlength: [1000, "Comment cannot exceed 1000 characters."],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Feedback", FeedbackSchema); 