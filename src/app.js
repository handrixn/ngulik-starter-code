
require('dotenv').config();

const db1 = require('./data/infrastructures/db/mysql')(process.env.DB_MYSQL_CONNECTION_STRING_1);

const AccountRepository = require('./data/repositories/account');

const AccountService = require('./domain/account/services');
const AccountHandler = require('./presentation/http/handlers/account');

const RepositoryContainer = {
    AccountRepository: new AccountRepository(db1),
};

const ServiceContainer = {
    AccountService: new AccountService(RepositoryContainer),
};

const HandlerContainer = {
    AccountHandler: new AccountHandler(ServiceContainer),
};

const httpAppServerContainer = require('./presentation/http');
const grpcAppServerContainer = require('./presentation/grpc');
const websocketAppServerContainer = require('./presentation/websocket');
const httpAppServer = httpAppServerContainer.init({
    AccountHandler: HandlerContainer.AccountHandler,
});

httpAppServer.listen(process.env.APP_PORT, () => {
    console.log(process.env.APP_PORT)
});

grpcAppServerContainer.connectWithTls();
websocketAppServerContainer.connect();