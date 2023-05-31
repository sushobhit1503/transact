import React from "react";
import "./Ledger.css"
import SettingsBar from "../Components/SettingsBar";
import randomColor from "randomcolor";
import { baseUrl } from "../index";
import axios from "axios";
import StatCards from "../Components/StatCards";
import { calculateActiveLedgers, calculateNegativeLedgers, calculateNonActiveLedgers, } from "../LedgerUtils";

class Ledger extends React.Component {
    constructor () {
        super ()
        this.state = {
            totalActive: 0,
            totalNonActive: 0,
            totalNegative: 0,
            color1: "",
            color2: "",
            color3: "",
            color4: ""
        }
    }
    componentDidMount () {
        axios.get(`${baseUrl}/ledger/all`).then(result => {
            const totalActive = calculateActiveLedgers (result.data)
            const totalNonActive = calculateNonActiveLedgers (result.data)
            const totalNegative = calculateNegativeLedgers (result.data)
            this.setState ({totalActive, totalNegative, totalNonActive})
        })
        this.setState ({color1: randomColor(), color2: randomColor (), color3: randomColor(), color4: randomColor()})
    }
    render() {
        return (
            <div style={{ marginLeft: "20%" }}>
                <SettingsBar />
                <div className="stat-card-panel">
                    <StatCards backgroundColor={this.state.color1} text="TOTAL LEDGERS" amount={this.state.totalActive + this.state.totalNonActive} />
                    <StatCards backgroundColor={this.state.color2} text="ACTIVE LEDGERS" amount={this.state.totalActive} />
                    <StatCards backgroundColor={this.state.color3} text="NON ACTIVE LEDGERS" amount={this.state.totalNonActive} />
                    <StatCards backgroundColor={this.state.color4} text="NEGATIVE LEDGERS" amount={this.state.totalNegative} />
                </div>
                <div className="graph-panel">
                    <div className="account-overview">
                        <div className="card-title"> Ledger Overview </div>
                        Show the overall balance, deducted, earned here for all the ledgers
                    </div>
                    <div className="account-details">
                        <div className="card-title"> Ledger History </div>
                        Provide a toggle button with three options of payment method, category and calendar view to show the net earnings and spent in those times
                    </div>
                </div>
            </div>
        )
    }
}

export default Ledger