import React from "react";
import "./Transactions.css"
import SettingsBar from "../Components/SettingsBar";
import StatCards from "../Components/StatCards";
import axios from "axios";
import { baseUrl } from "../index";
import randomColor from "randomcolor";
import { calculateOverallCreditTransactions, calculateOverallDebitTransactions, calculateOverallLentTransactions } from "../Transactionutils";

class Transactions extends React.Component {
    constructor () {
        super ()
        this.state = {
            totalDebit: 0,
            totalCredit: 0,
            totalLent: 0,
            color1: "",
            color2: "",
            color3: "",
            color4: ""
        }
    }
    componentDidMount () {
        axios.get(`${baseUrl}/transaction/all`).then(result => {
            const totalCredit = calculateOverallCreditTransactions (result.data)
            const totalDebit = calculateOverallDebitTransactions (result.data)
            const totalLent = calculateOverallLentTransactions (result.data)
            this.setState ({totalCredit, totalDebit, totalLent})
        })
        this.setState ({color1: randomColor(), color2: randomColor (), color3: randomColor(), color4: randomColor()})
    }
    render() {
        return (
            <div style={{ marginLeft: "20%" }}>
                <SettingsBar />
                <div className="stat-card-panel">
                    <StatCards backgroundColor={this.state.color1} text="TOTAL TRANSACTIONS" amount={this.state.totalCredit + this.state.totalDebit} />
                    <StatCards backgroundColor={this.state.color2} text="TOTAL DEBIT TRANSACTIONS" amount={this.state.totalDebit - this.state.totalLent} />
                    <StatCards backgroundColor={this.state.color3} text="TOTAL CREDIT TRANSACTIONS" amount={this.state.totalCredit} />
                    <StatCards backgroundColor={this.state.color4} text="TOTAL LENT TRANSACTIONS" amount={this.state.totalLent} />
                </div>
                <div className="graph-panel">
                    <div className="transaction-overview">
                        <div className="card-title"> Account Overview </div>
                        Give the overview of the number of transaction as per the above card and selected account/ledger
                    </div>
                    <div className="transaction-details">
                        <div className="card-title"> Transaction History </div>
                        Show all the account/ledger transactions and provide the delete option only. There will be sort and filter as per the date and the number of transactions
                    </div>
                </div>
            </div>
        )
    }
}

export default Transactions