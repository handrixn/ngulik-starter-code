
const repositories = require('../../repositories');

const merchantDetail = require('./detail');
const merchantList = require('./list');

module.exports = {
    merchantDetail: merchantDetail(repositories.merchantRepository),
    merchantList: merchantList(repositories.merchantRepository),
};
