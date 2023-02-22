const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const database = process.env.DB_NAME;
const url = `mysql://${username}:${password}@${host}/${database}`;

const db = {};
const basename = 'index.js';
const dirname = `${__dirname}`;

const config = {
    dialect: 'mysql2',
    dialectOptions: {
        maxPreparedStatements: 100, // @see https://github.com/sequelize/sequelize/issues/8019
    },
    logging: (process.env.DB_LOGGING === 'true' ? console.log : false),
    operatorsAliases: 0, // https://lab.wallarm.com/risks-involved-with-operatoraliases-in-sequelize/
    define: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    },
    replication: {
        read: [
            {
                host: process.env.DB_HOST_REPLICA,
            },
        ],
        write: {
            host: process.env.DB_HOST,
        },
    },
    pool: {
        max: 500,
        min: 30,
        acquire: 60000,
        idle: 30000,
    },
};

if (url) {
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

module.exports = db;
