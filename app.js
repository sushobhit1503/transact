const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb+srv://sushobhitsrivastava2017:Transact@cluster0.ckcsytg.mongodb.net/Transact?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

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
const port = process.env.PORT || 8001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});