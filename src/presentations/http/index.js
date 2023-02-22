require('dotenv').config();

const http = require('http');
const express = require('express');
const cors = require('cors');

const healthCheckRouter = require('./routes/health-check');
const merchantRouter = require('./routes/merchant');

const app = express();
const host = process.env.APP_URL;
const port = process.env.APP_PORT;

app.set('trust proxy', 1);

app.use(cors({
    origin: '*',
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    allowedHeaders: '*',
    AccessControlAllowOrigin: '*',
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: false }));

app.use('/health-check', healthCheckRouter);
app.use('/merchant', merchantRouter);

// client error handler
app.use((err, req, res, next) => {
    if (req.xhr) {
        res.status(500).send({
            success: false,
            message: 'Something failed!',
        });
    } else {
        next(err);
    }
});

// error handler
app.use((err, req, res, _next) => {
    console.error(err);

    res.status(500).json({
        success: false,
        message: 'Internal server error',
    });
});

const httpServer = http.createServer(app);

module.exports = httpServer;
