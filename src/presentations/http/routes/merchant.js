const express = require('express');
const router = express.Router();

const merchantHandler = require('../handlers/merchant');

router.get('/', merchantHandler.getMerchants);
router.get('/:merchantId', merchantHandler.getDetailMerchant);

module.exports = router;
