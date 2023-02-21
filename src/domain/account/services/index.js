
const createAccount = async (payload) => {
    const { repoA: AccountRepository } = this.getRepository();

    await AccountRepository.create({});
};

const exported = {
    createAccount
};

module.exports = function (repositories) {
    return Object.assign(
        Object.create(exported),
        {
            getRepository() {
                return repositories;
            }
        }
    ) 
}