
const appHttpServer = require('./presentations/http');
const appGrpcServer = require('./presentations/grpc');
const appWebsocketServer = require('./presentations/websocket');

const httpHost = process.env.APP_URL;
const httpPort = process.env.APP_PORT;

appHttpServer.listen(httpPort, () => console.log(`app running on ${httpHost}:${httpPort}`));
appGrpcServer.connect();
appWebsocketServer.connect();