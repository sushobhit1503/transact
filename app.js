const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config()


const app = express();

mongoose.connect(process.env.MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

const shopRouter = require('./routes/shopRoutes');
const transactionRouter = require('./routes/transactionRoutes');
const accountRouter = require("./routes/accountRoutes")
const ledgerRouter = require("./routes/ledgerRoutes")
const paymentRouter = require("./routes/paymentRoutes")

app.use('/shop', shopRouter);
app.use('/transaction', transactionRouter);
app.use('/account', accountRouter);
app.use('/ledger', ledgerRouter);
app.use('/payment', paymentRouter);

// Start the Express server
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});