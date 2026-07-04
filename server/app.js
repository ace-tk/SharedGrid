const express = require('express');
const cors = require('cors');
const env = require('./config/env');
const indexRoutes = require('./routes/index.routes');
const gridRoutes = require('./routes/grid.routes');

const app = express();

app.use(cors({
  origin: env.CLIENT_URL
}));
app.use(express.json());

app.use('/', indexRoutes);
app.use('/api/grid', gridRoutes);

module.exports = app;
