
const database = require('./database');

const transactionDatabase = database({
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHostReplica: process.env.DB_HOST_REPLICA,
    dbHost: process.env.DB_HOST
});

const merchantModel = require('./merchant');

module.exports = {
    merchantModel: merchantModel(transactionDatabase),
};
