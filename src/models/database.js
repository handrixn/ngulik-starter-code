
const Sequelize = require('sequelize');

const exec = (payload) => {
    const {
        dbName,
        dbUser,
        dbPassword,
        dbHostReplica,
        dbHost
    } = payload;

    const db = new Sequelize(dbName, dbUser, dbPassword, {
        dialect: 'mysql',
        port: process.env.DB_PORT,
        logging: process.env.APP_DEBUG ? console.log : false,
        replication: {
            read: [
                {
                    host: dbHostReplica,
                },
            ],
            write: {
                host: dbHost,
            },
        },
        pool: {
            max: 500,
            min: 30,
            acquire: 60000,
            idle: 30000,
        },
        dialectOptions: {
            // @see https://github.com/sequelize/sequelize/issues/8019
            maxPreparedStatements: 100,
        },
        define: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at'
        },
    });
    
    db.Sequelize = Sequelize;
    db.Op = Sequelize.Op;
    db.DataTypes = Sequelize.DataTypes;

    return db
};

module.exports = exec;
