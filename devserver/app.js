const express = require('express');

const routes = require('./routes');

const app = express();

app.use(express.static('build'));
app.use('/api', routes);

app.listen(8080);