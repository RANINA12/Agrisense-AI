const Query = require("../model/Query");
const validator = require("validator");

const HelpQueryController = async (req, res) => {
    try {
        const { name, email, issue, message } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                msg: "Email required"
            });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                msg: "Invalid email format"
            });
        }

        const newQuery = await Query.create({
            name,
            email,
            issue,
            message
        });

        return res.status(200).json({
            success: true,
            msg: "We will contact you within 24 hours"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            msg: "Server Error"
        });
    }
};

module.exports = { HelpQueryController };