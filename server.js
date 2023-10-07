const express = require('express');
const db = require('./config/connection');
const router = express.Router();
//require models

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
// app.use(require('./routes'));

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`You are being watched from port ${PORT}!`);
    });
});

