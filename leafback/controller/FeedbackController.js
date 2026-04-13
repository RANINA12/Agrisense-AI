const Feedback = require("../model/Feedback");
const ScanHistory = require("../model/ScanHistroy");
const SubmitFeedback = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized." });
        }
        const {
            scan_id,
            is_accurate,
            wrong_leaf_detected,
            wrong_disease,
            wrong_treatment,
            user_comment,
        } = req.body;

        // 1. scan_id is required
        if (!scan_id) {
            return res.status(400).json({ success: false, message: "scan_id is required." });
        }

        // 2. At least one feedback field must be filled
        const hasFeedback =
            is_accurate !== undefined ||
            wrong_leaf_detected ||
            wrong_disease ||
            wrong_treatment ||
            user_comment;

        if (!hasFeedback) {
            return res.status(400).json({
                success: false,
                message: "Provide at least one feedback field.",
            });
        }

        // 3. Verify the scan exists and belongs to this user
        const scan = await ScanHistory.findOne({ _id: scan_id, user_id: userId });
        if (!scan) {
            return res.status(404).json({
                success: false,
                message: "Scan not found or does not belong to you.",
            });
        }

        // 4. Prevent duplicate feedback for the same scan
        const existing = await Feedback.findOne({ scan_id });
        if (existing) {
            return res.status(409).json({
                success: false,
                message: "Feedback for this scan has already been submitted.",
            });
        }

        const feedback = await Feedback.create({
            scan_id,
            user_id: userId,
            is_accurate: is_accurate ?? null,
            wrong_leaf_detected: wrong_leaf_detected ?? false,
            wrong_disease: wrong_disease ?? false,
            wrong_treatment: wrong_treatment ?? false,
            user_comment: user_comment?.trim() || "",
        });

        return res.status(201).json({
            success: true,
            message: "Feedback submitted. Thank you!",
            data: feedback,
        });

    } catch (error) {
        console.error("SubmitFeedback error:", error);
        return res.status(500).json({ success: false, message: "Failed to submit feedback." });
    }
};
const UpdateFeedback = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { scanId } = req.params;

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized." });
        }
        const {
            is_accurate,
            wrong_leaf_detected,
            wrong_disease,
            wrong_treatment,
            user_comment,
        } = req.body;
        const updates = {};
        if (is_accurate !== undefined) updates.is_accurate = is_accurate;
        if (wrong_leaf_detected !== undefined) updates.wrong_leaf_detected = wrong_leaf_detected;
        if (wrong_disease !== undefined) updates.wrong_disease = wrong_disease;
        if (wrong_treatment !== undefined) updates.wrong_treatment = wrong_treatment;
        if (user_comment !== undefined) updates.user_comment = user_comment.trim();

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ success: false, message: "No fields provided to update." });
        }

        // Find feedback by scan + verify ownership via user_id
        const feedback = await Feedback.findOneAndUpdate(
            { scan_id: scanId, user_id: userId },
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!feedback) {
            return res.status(404).json({
                success: false,
                message: "Feedback not found or does not belong to you.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Feedback updated.",
            data: feedback,
        });

    } catch (error) {
        console.error("UpdateFeedback error:", error);
        return res.status(500).json({ success: false, message: "Failed to update feedback." });
    }
};
const GetAllFeedback = async (req, res) => {
    try {
        // 1. Get the user ID from the authenticated token
        const userId = req.user._id;

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized." });
        }

        const allFeedback = await Feedback.find({
            user_id: userId
        }).sort({ createdAt: -1 });

        // 3. Return the array to the frontend
        return res.status(200).json({
            success: true,
            count: allFeedback.length, // Helpful for the UI to know how many items there are
            data: allFeedback,         // This is now an array: [] or [{}, {}]
        });

    } catch (error) {
        console.error("GetAllFeedback error:", error);
        return res.status(500).json({ success: false, message: "Failed to fetch feedback." });
    }
};

module.exports = { SubmitFeedback, UpdateFeedback, GetAllFeedback };