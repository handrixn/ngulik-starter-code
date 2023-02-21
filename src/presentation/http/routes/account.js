const express = require('express');
const router = express.Router();

// const authMiddleware = require('../middlewares/auth');

module.exports = (handler) => {
    // router.get('/', authMiddleware, handlers.getAccounts);
    router.get('/', handler.getAccounts);

    return router;
}
