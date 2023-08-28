import './App.css';
import React from 'react';
import Dashboard from './Pages/Dashboard';
import { Route, Routes } from "react-router-dom"
import Transactions from './Pages/Transactions';
import Accounts from "./Pages/Accounts"
import Ledger from "./Pages/Ledger"
import Shop from "./Pages/Shop"
import Payment from "./Pages/Payment"
import Settings from './Pages/Settings';
import { getAllAccounts } from './Backend/accountCalls';
import { getAllPaymentMethods } from './Backend/paymentCalls';
import { getAllLedgers } from './Backend/ledgerCalls';
import { getAllShops } from './Backend/shopCalls';
import { getAllTransc } from './Backend/transactionCalls';

class App extends React.Component {
  componentDidMount () {
    getAllAccounts ().then (allAccounts => {
      localStorage.setItem("accounts", JSON.stringify(allAccounts))
    })
    getAllPaymentMethods().then (allPayment => {
      localStorage.setItem("payments", JSON.stringify(allPayment))
    })
    getAllLedgers ().then (allLedgers => {
      localStorage.setItem("ledgers", JSON.stringify(allLedgers))
    })
    getAllShops ().then (allShops => {
      localStorage.setItem("shops", JSON.stringify(allShops))
    })
    getAllTransc ().then (allTransc => {
      localStorage.setItem("transc", JSON.stringify(allTransc))
    })
  }
  render() {
    return (
      <div>
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/transaction" exact element={<Transactions />} />
          <Route path="/account" exact element={<Accounts />} />
          <Route path="/ledger" exact element={<Ledger />} />
          <Route path="/shop" exact element={<Shop />} />
          <Route path="/payment" exact element={<Payment />} />
          <Route path="/settings" exact element={<Settings />} />
        </Routes>
      </div>
    );
  }
}

export default App;
