
class AccountService {
    constructor(repositories) {
        this.accountRepository = repositories.AccountRepository;
    }

    async getAccounts() {
        const result = await this.accountRepository.findAll({});

        return result;
    }
}


module.exports = AccountService;