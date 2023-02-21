const express = require('express');
const router = express.Router();

// const authMiddleware = require('../middlewares/auth');

module.exports = (handlers) => {
    // router.get('/', authMiddleware, handlers.getAccounts);
    router.get('/', handlers.getAccounts);

    return router;
}
