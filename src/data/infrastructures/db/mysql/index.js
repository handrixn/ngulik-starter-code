'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

function init(connectionString, connection) {
    const db = {};
    const url = connectionString;

    if (url) {
        const basename = 'index.js';
        const dirname = '../schemas';
        const timezoneOffset = require('./timezone.json');
        const config = {
            dialect: 'mysql2',
            dialectOptions: {
                dateStrings: true,
                decimalNumbers: true,
                typeCast(field, next) {
                    if (field.type === 'DATETIME') {
                        return field.string();
                    }
                    return next();
                }
            },
            timezone: (process.env.TZ ? (timezoneOffset[process.env.TZ] || '+07:00') : '+07:00'),
            // eslint-disable-next-line no-console
            logging: (process.env.DB_LOGGING === 'true' ? console.log : false),
            operatorsAliases: 0,
            define: {
                createdAt: 'created_at',
                updatedAt: 'updated_at',
                deletedAt: 'deleted_at'
            },
            pool: {
                max: (process.env.MYSQL_MAX_POOL ? parseInt(process.env.MYSQL_MAX_POOL) : 100),
                min: 1,
                acquire: 30000,
                idle: 10000
            }
        };
        
        const sequelize = new Sequelize(url, config);

        fs.readdirSync(dirname)
        .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
        .forEach((file) => {
            const model = require(path.join(dirname, file))(sequelize, Sequelize.DataTypes);
            db[model.name] = model;
        });
        
        Object.keys(db).forEach((modelName) => {
            if (db[modelName].associate) {
                db[modelName].associate(db);
            }
        });
        
        db.sequelize = sequelize;
        db.Sequelize = Sequelize;
        db.Op = Sequelize.Op;
    }

    return db;
}

module.exports = init;