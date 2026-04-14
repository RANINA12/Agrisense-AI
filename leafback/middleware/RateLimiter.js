const rateLimit = require("express-rate-limit");
const strictLimiter = rateLimit({
    windowMs: 2 * 60 * 1000,
    max: 5,
    message: {
        success: false,
        msg: "Too many requests. Try again after 2 minute"
    },
    standardHeaders: true,
    legacyHeaders: false,
});
const mediumLimiter = rateLimit({
    windowMs: 2 * 60 * 1000,
    max: 10,
    message: {
        success: false,
        msg: "Too many requests. Try again after 2 minute"
    },
    standardHeaders: true,
    legacyHeaders: false,
});
const lowLimiter = rateLimit({
    windowMs: 2 * 60 * 1000,
    max: 15,
    message: {
        success: false,
        msg: "Too many requests. Try again after 2 minute"
    },
    standardHeaders: true,
    legacyHeaders: false,
});
module.exports = {
    strictLimiter,
    mediumLimiter,
    lowLimiter
};