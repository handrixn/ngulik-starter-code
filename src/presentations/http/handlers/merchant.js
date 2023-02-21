
const merchantUseCase = require('../../../use-cases/merchants');

module.exports = Object.freeze({
    async getDetailMerchant(req, res) {
        const payload = { ...req.params };
        const result = await merchantUseCase.merchantDetail(payload);

        return res.status(200).json(result)
    },
    async getMerchants(req, res) {
        return res.status(200).json({
            message: 'ok 2'
        })
    }
})