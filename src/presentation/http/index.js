const http = require('http');
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const YAML = require('yaml');

const accountRouter = require('./routes/account');

function init(handlers) {
    const app = express();
    
    app.set('trust proxy', 1);
    app.use(cors({
        origin: '*',
        methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
        allowedHeaders: ['Content-Type', 'Accept-Language', 'Authorization', 'Accept', 'admin-api-key', 'x-requested-with'],
        AccessControlAllowOrigin: '*',
        credentials: true,
        optionsSuccessStatus: 200
    }));

    app.use(express.json({ limit: '5mb' }));
    app.use(express.urlencoded({ extended: false }));

    // Swagger
    const swaggerFile = fs.readFileSync('./docs/swagger.yaml', 'utf8');
    const swaggerDocument = YAML.parse(swaggerFile);

    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    
    app.use('/accounts', accountRouter(handlers.AccountHandler));

    const httpServer = http.createServer(app);

    return httpServer;
}

module.exports = {
    init
};
