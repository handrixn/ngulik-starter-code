

const exec = (merchantRepository) => {
    return async (payload) => {
        // validation
        // logic
        // return
        const result = await merchantRepository.findOne({ id: payload.merchantId });

        return {
            id: result.uuid,
            name: result.name
        }
    }
}

module.exports = exec;