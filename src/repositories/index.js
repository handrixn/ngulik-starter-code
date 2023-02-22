
const models = require('../models');

const merchantRepository = require('./merchant');

module.exports = {
    merchantRepository: merchantRepository(models.merchantModel),
}