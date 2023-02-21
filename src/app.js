
const db1 = require('./db/mysql')(process.env.DB_MYSQL_CONNECTION_STRING_1);

const AccountRepository = () => ({})(db1);

const AccountService = require('./domain/account/services');
const AccountHandler = require('./domain/account/handlers');

const ServiceContainer = {
    AccountService: AccountService(AccountRepository),
};

const HandlerContainer = {
    AccountHandler: AccountHandler(ServiceContainer.AccountService)
};

const httpAppServerContainer = require('./presentation/http');
const grpcAppServerContainer = require('./presentation/grpc');
const websocketAppServerContainer = require('./presentation/websocket');
const httpAppServer = httpAppServerContainer.init({
    AccountHandler,
});

httpAppServer.listen(':3000');
grpcAppServerContainer.connectWithTls();
websocketAppServerContainer.connect();