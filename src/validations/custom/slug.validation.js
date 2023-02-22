const Joi = require('joi');

module.exports = function (lang) {
    return Joi.string().trim().max(50).required().error(new Error(lang.MERCHANT_SLUG_NOT_VALID));
};
