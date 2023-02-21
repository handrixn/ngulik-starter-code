
class AccountHandler {
    constructor(services) {
        this.accountService = services.AccountService;
    }

    async getAccounts(req, res) {
        const accounts = await this.accountService.findAll();
        
        return accounts;
    }
}

module.exports = AccountHandler;

