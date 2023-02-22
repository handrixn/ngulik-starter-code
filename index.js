require('dotenv').config();

const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const merchantRouter = require('./src/routes/merchant.routes');

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

app.use(fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 }
}));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: false }));

app.use('/merchants', merchantRouter);

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`app running on ${host}:${port}`));
