const LogRepository = require('../repositories/mongodb/log.repositories');

const error = async (params) => {
    const payload = {
        type: 'error',
        function_name: params.functionName,
        message: params.message,
        request: params.request,
        response: params.response,
        error: params.error
    };

    await LogRepository.push(payload);
};

exports.error = error;

module.exports = exports;
