

class AccountRepository {
    constructor(db) {
        this.accountModel = db.AccountModel;
    }
}

module.exports = AccountRepository;
