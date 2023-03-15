const express = require('express');

const router = require('./router/router')

const app = express();
const port = 3000;

app.use(router)
app.listen(port, () => console.log(`Todo service listening on port ${port}!`));