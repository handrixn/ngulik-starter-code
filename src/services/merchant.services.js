const MerchantRepository = require('../repositories/merchant.repositories');
const Response = require('../utils/response.utils');

const getMerchantDetailWithLandingPageMetadata = async (slug, lang) => {
    const result = await MerchantRepository.findOneWithLandingPageMetadata({ slug });

    if (!result) {
        return Response.formatServiceReturn(false, 404, null, lang.MERCHANT_NOT_FOUND);
    }

    return Response.formatServiceReturn(true, 200, result, null);
};

exports.getMerchantDetailWithLandingPageMetadata = getMerchantDetailWithLandingPageMetadata;

module.exports = exports;
