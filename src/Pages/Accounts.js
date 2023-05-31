import React from "react";
import "./Accounts.css"
import SettingsBar from "../Components/SettingsBar";
import StatCards from "../Components/StatCards";
import randomColor from "randomcolor";
import axios from "axios";
import { baseUrl } from "../index";
import { calculateCurrentAccounts, calculateSavingAccounts, calculateTotalBanks } from "../AccountUtils";

class Accounts extends React.Component {
    constructor () {
        super ()
        this.state = {
            totalCurrent: 0,
            totalSaving: 0,
            totalBanks: 0,
            color1: "",
            color2: "",
            color3: "",
            color4: ""
        }
    }
    componentDidMount () {
        axios.get(`${baseUrl}/account/all`).then(result => {
            const totalCurrent = calculateCurrentAccounts (result.data)
            const totalSaving = calculateSavingAccounts (result.data)
            const totalBanks = calculateTotalBanks (result.data)
            this.setState ({totalBanks, totalCurrent, totalSaving})
        })
        this.setState ({color1: randomColor(), color2: randomColor (), color3: randomColor(), color4: randomColor()})
    }
    render() {
        return (
            <div style={{ marginLeft: "20%" }}>
                <SettingsBar />
                <div className="stat-card-panel">
                    <StatCards backgroundColor={this.state.color1} text="TOTAL ACCOUNTS" amount={this.state.totalSaving + this.state.totalCurrent} />
                    <StatCards backgroundColor={this.state.color2} text="TOTAL SAVING ACCOUNTS" amount={this.state.totalSaving} />
                    <StatCards backgroundColor={this.state.color3} text="TOTAL CURRENT ACCOUNTS" amount={this.state.totalCurrent} />
                    <StatCards backgroundColor={this.state.color4} text="TOTAL BANKS" amount={this.state.totalBanks} />
                </div>
                <div className="graph-panel">
                    <div className="account-overview">
                        <div className="card-title"> Account Overview </div>
                        Show the overall balance, deducted, earned here for the account in overall along with individual ledger balance

                    </div>
                    <div className="account-details">
                        <div className="card-title"> Account History </div>
                        Provide a toggle button with three options of payment method, category and calendar view to show the net earnings and spent in those times
                    </div>
                </div>
            </div>
        )
    }
}

export default Accounts