const MerchantSlugValidation = require('../../validations/merchants/slug');
const MerchantService = require('../../services/merchant.services');
const MerchantDetailTransformer = require('../../transformers/merchants/detail.transformers');
const Logger = require('../../utils/logger.utils');
const Language = require('../../languages');

let lang;

exports.getDetailFromSlug = async (req, res) => {
    try {
        let { params: input, locale } = req;

        lang = Language.getLanguage(locale);

        try {
            input = await MerchantSlugValidation(lang).validateAsync(input);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }

        const result = await MerchantService.getMerchantDetailWithLandingPageMetadata(input.slug, lang);

        if (!result.status) {
            return res.status(result.code).json({ message: result.message });
        }

        return res.status(200).json({
            data: MerchantDetailTransformer.item(result.data)
        });
    } catch (err) {
        Logger.error({
            functionName: 'getDetailFromSlug',
            message: err.message
        });

        return res.status(500).json({ message: lang.INTERNAL_SERVER_ERROR });
    }
};

module.exports = exports;