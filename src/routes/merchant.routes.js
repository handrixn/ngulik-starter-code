const router = require('express').Router();
const rateLimitMiddleware = require('../middlewares/rate-limit');

router.get('/:slug', [rateLimitMiddleware], (require('../methods/merchants/detail.methods')).getDetailFromSlug);

module.exports = router;