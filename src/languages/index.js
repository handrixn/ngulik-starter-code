const en = require('./en');
const id = require('./id');

const getLanguage = (lang = '') => {
    if (lang.toLowerCase() === 'id') {
        return id;
    }

    return en;
};

exports.getLanguage = getLanguage;

module.exports = exports;
