const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 20,
    delayMs: 0,
    handler(req, res) {
        return res.status(429).json({ message: 'Too many requests, please try again later.' });
    }
});

module.exports = limiter;
