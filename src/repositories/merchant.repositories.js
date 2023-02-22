const Models = require('../models');

exports.findOneWithLandingPageMetadata = function (where) {
    return Models.Merchant.findOne({
        where,
        include: [
            {
                model: Models.MerchantLandingPageMetadata,
                required: false
            }
        ]
    });
};

module.exports = exports;
