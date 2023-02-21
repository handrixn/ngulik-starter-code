const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth');

module.exports = (serviceA, serviceB) => {
    router.get('/', authMiddleware, serviceA.getAccounts);
    router.post('/', authMiddleware, serviceA.createAccount);
    router.put('/:id', authMiddleware, serviceB.updateAccounts);

    return router;
}
