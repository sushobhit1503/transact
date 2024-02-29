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
import PrivateRoute from './Components/PrivateRoute';
import Authentication from './Pages/Authentication';

class App extends React.Component {
  componentDidMount () {
    getAllAccounts().then (result => {
      localStorage.setItem("accounts", JSON.stringify(result))
    })

    getAllPaymentMethods().then (result => {
      localStorage.setItem("payments", JSON.stringify(result))
    })

    getAllLedgers().then (result => {
      localStorage.setItem("ledgers", JSON.stringify(result))
    })

    getAllShops().then (result => {
      localStorage.setItem("shops", JSON.stringify(result))
    })

    getAllTransc().then (result => {
      localStorage.setItem("transcs", JSON.stringify(result))
    })
  }
  render() {
    return (
      <div>
        <Routes>
          <Route path="/" exact element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/transaction" exact element={<PrivateRoute><Transactions /></PrivateRoute>} />
          <Route path="/account" exact element={<PrivateRoute><Accounts /></PrivateRoute>} />
          <Route path="/ledger" exact element={<PrivateRoute><Ledger /></PrivateRoute>} />
          <Route path="/shop" exact element={<PrivateRoute><Shop /></PrivateRoute>} />
          <Route path="/payment" exact element={<PrivateRoute><Payment /></PrivateRoute>} />
          <Route path="/settings" exact element={<PrivateRoute><Settings /></PrivateRoute>} />
          <Route path="/login" exact element={<Authentication />} />
        </Routes>
      </div>
    );
  }
}

export default App;
