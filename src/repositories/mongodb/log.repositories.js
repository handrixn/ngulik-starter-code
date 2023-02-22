const Models = require('../../models/mongodb');

exports.push = function (data) {
    return Models.Log.create(data);
};

module.exports = exports;
