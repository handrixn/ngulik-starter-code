const MerchantConstant = require('../constants/merchant.constants');

module.exports = (sequelize, DataTypes) => {
    const MerchantLandingPageMetadata = sequelize.define('MerchantLandingPageMetadata', {
        id: {
            type: DataTypes.INTEGER().UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        uuid: {
            type: DataTypes.STRING(36),
            allowNull: false,
            unique: true,
            defaultValue: DataTypes.UUIDV1
        },
        merchant_id: {
            type: DataTypes.INTEGER().UNSIGNED,
            allowNull: false
        },
        merchant_uuid: {
            type: DataTypes.STRING(36),
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM(...MerchantConstant.MERCHANT_LANDING_PAGE_METADATA_TYPE_ENUM),
            allowNull: false
        },
    }, {
        tableName: 'merchant_landing_page_metadata',
        underscored: true,
        paranoid: true
    });

    return MerchantLandingPageMetadata;
};
