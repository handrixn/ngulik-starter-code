module.exports = (sequelize, DataTypes) => {
    const Merchant = sequelize.define('Merchant', {
        id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        uuid: {
            type: DataTypes.STRING(36),
            allowNull: false,
            unique: true,
            defaultValue: DataTypes.UUIDV1
        },
        slug: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
    }, {
        tableName: 'merchants',
        underscored: true,
        paranoid: true
    });

    Merchant.associate = (models) => {
        Merchant.hasMany(models.MerchantLandingPageMetadata, {
            sourceKey: 'id',
            foreignKey: 'merchant_id'
        });
    };

    return Merchant;
};
