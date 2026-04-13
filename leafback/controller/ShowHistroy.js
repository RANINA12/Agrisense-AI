const ScanHistroy = require("../model/ScanHistroy");
const CropDisease = require("../model/Predictedclass");

const ShowHistory = async (req, res) => {
    try {
        // user comes from auth middleware (req.user), never from req.body
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized." });
        }

        const scans = await ScanHistroy.find({ user_id: userId })
            .select("_id image_url predicted_class confidence_score createdAt") // only what the list UI needs
            .sort({ createdAt: -1 }); // newest first

        return res.status(200).json({ success: true, data: scans });

    } catch (error) {
        console.error("ShowHistory error:", error);
        return res.status(500).json({ success: false, message: "Failed to fetch history." });
    }
};



const ShowDetailedHistory = async (req, res) => {
    try {
        const userId = req.user?.id;
        const scanId = req.params.scan_id;

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized." });
        }

        if (!scanId) {
            return res.status(400).json({ success: false, message: "scan_id is required." });
        }

        // 1. Find the scan — also verify it belongs to this user (security check)
        const scan = await ScanHistroy.findOne({ _id: scanId, user_id: userId });

        if (!scan) {
            return res.status(404).json({ success: false, message: "Scan not found." });
        }

        // 2. Fetch the prescription using the stored predicted_class
        const prescription = await CropDisease.findOne({
            folder_name: scan.predicted_class,
        });

        if (!prescription) {
            return res.status(404).json({
                success: false,
                message: `No prescription found for: ${scan.predicted_class}`,
            });
        }

        return res.status(200).json({
            success: true,
            data: {
                scan,
                prescription,
            },
        });

    } catch (error) {
        console.error("ShowDetailedHistory error:", error);
        return res.status(500).json({ success: false, message: "Failed to fetch scan details." });
    }
};

module.exports = { ShowHistory, ShowDetailedHistory };