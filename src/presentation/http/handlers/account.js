
class AccountHandler {
    constructor(services) {
        this.accountService = services.AccountService;
    }

    async getAccounts(req, res) {
        console.log('=======', this)
        const accounts = await this.accountService.getAccounts();
        
        return accounts;
    }
}

module.exports = AccountHandler;

