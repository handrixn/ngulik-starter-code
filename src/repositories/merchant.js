
const exec = (merchantModel) => {
    async function findOne(params) {
        const where = { id: params.id };
        const result = await merchantModel.findOne({ where });

        return result;
    }

    async function findAndCountAll() {
        const result = await merchantModel.findAndCountAll();
        return result;
    }

    return {
        findOne,
        findAndCountAll
    }
}

module.exports = exec;