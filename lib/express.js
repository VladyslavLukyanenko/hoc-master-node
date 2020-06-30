const express = require('express');
const app = express();
const port = 80;
app.use(express.json());

app.use('/', require('../routes/index'));

app.listen(port, () => console.log(`Master Node server listening on port ${port}!`));