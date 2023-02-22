const Joi = require('joi');
const SlugValidation = require('../custom/slug.validation');

module.exports = function (lang) {
    return Joi.object().keys({
        slug: SlugValidation(lang)
    });
};
