const MerchantConstant = require('../../constants/merchant.constants');
const MerchantLandingPageMetadataDetail = require('../merchant-landing-page-metadata/detail.transformer');

exports.item = (data) => {
    const responseObject = {
        id: data.uuid,
        slug: data.slug,
        name: data.name,
        landingPageMetadata: [],
    };

    if (data.MerchantLandingPageMetadata?.length > 0) {
        const metadataLandingPage = data.MerchantLandingPageMetadata;
        responseObject.landingPageMetadata = metadataLandingPage.map(MerchantLandingPageMetadataDetail.item);
    }

    return responseObject;
};

module.exports = exports;
