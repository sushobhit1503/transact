import './App.css';
import React from 'react';
import Dashboard from './Pages/Dashboard';
import Sidebar from "./Components/Sidebar";
import { Route, Routes } from "react-router-dom"
import Transactions from './Pages/Transactions';
import Accounts from "./Pages/Accounts"
import Ledger from "./Pages/Ledger"
import Shop from "./Pages/Shop"
import Payment from "./Pages/Payment"

class App extends React.Component {
  render() {
    return (
      <div>
        <Sidebar />
        {console.log(process.env.NODE_ENV)}
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/transaction" exact element={<Transactions />} />
          <Route path="/account" exact element={<Accounts />} />
          <Route path="/ledger" exact element={<Ledger />} />
          <Route path="/shop" exact element={<Shop />} />
          <Route path="/payment" exact element={<Payment />} />
        </Routes>
      </div>
    );
  }
}

export default App;
