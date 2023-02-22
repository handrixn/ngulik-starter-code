
const exec = (database) => {
    const { DataTypes } = database.Sequelize;

    const attributes = {
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
    };

    const MerchantModel = database.define(
        'merchants',
        attributes,
        {
            underscore: true,
            tableName: 'merchants',
        }
    );

    MerchantModel.associate = (models) => {
        // Merchant.hasMany(models.Category, {
        //     sourceKey: 'id',
        //     foreignKey: 'merchant_id'
        // });
    };

    return MerchantModel;
}

module.exports = exec;
