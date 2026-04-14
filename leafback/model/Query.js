const mongoose = require("mongoose");
const QuerySchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },

        name: {
            type: String,
        },

        issue: {
            type: String
        },
        message: {
            type: String,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Query", QuerySchema); 