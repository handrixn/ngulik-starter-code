const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const db = {};
const basename = 'index.js';
const username = process.env.MONGO_INITDB_ROOT_USERNAME;
const password = process.env.MONGO_INITDB_ROOT_PASSWORD;
const host = process.env.MONGODB_HOST;
const port = process.env.MONGODB_PORT;
const database = process.env.MONGODB_DATABASE;
const auth = username && password ? `${username}:${password}@` : '';
const url = `mongodb://${auth}${host}:${port}/${database}?authMechanism=DEFAULT&authSource=admin`;
const dirname = `${__dirname}`;

const options = {
    connectTimeoutMS: 30000,
};

if (url && process.env.NODE_ENV !== 'test') {
    mongoose.connect(url, options);

    mongoose.pluralize(null); // disable auto pluralize collection name eg: student to students
    mongoose.set('debug', ((process.env.DB_LOGGING === 'true') || false));
    mongoose.set("strictQuery", false);

    fs.readdirSync(dirname)
        .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
        .forEach((file) => {
            const model = require(path.join(dirname, file))(mongoose);
            db[model.modelName] = mongoose.model(model.collectionName, model.collectionSchema);
        });

    db.mongoose = mongoose;
}

module.exports = db;
