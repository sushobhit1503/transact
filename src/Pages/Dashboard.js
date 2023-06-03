import React from "react";
import StatCards from "../Components/StatCards";
import "./Dashboard.css"
import Cards from "../Components/Cards";
import SettingsBar from "../Components/SettingsBar";
import { baseUrl } from "../index";
import axios from "axios";
import { calculateCreditCardInfo, calculateOverallExpense, calculateOverallRevenue, calculateOverallLent, calculateOverallCategoryShare, calculateOverallPaymentShare  } from "../DashboardUtils";
import randomColor from "randomcolor";
import PieChart from "../Components/PieChart";
import { getPaymentByCredit } from "../Backend/paymentCalls";

class Dashboard extends React.Component {
    constructor () {
        super ()
        this.state = {
            totalRevenue: 0,
            totalExpense: 0,
            totalLent: 0,
            paymentShareData: [],
            categoryShareData: [],
            creditCardInfo: [],
            color1: "",
            color2: "",
            color3: "",
            color4: ""
        }
    }
    componentDidMount () {
        axios.get(`${baseUrl}/transaction/all`).then(result => {
            const totalExpense = calculateOverallExpense(result.data)
            const totalRevenue = calculateOverallRevenue(result.data)
            const totalLent = calculateOverallLent(result.data)
            axios.get(`${baseUrl}/payment`).then(result1 => {
                const paymentShareData = calculateOverallPaymentShare (result.data, result1.data)
                this.setState ({paymentShareData})
            })
            const categoryShareData = calculateOverallCategoryShare (result.data)
            getPaymentByCredit ().then (allPayments => {
                const creditCardInfo = calculateCreditCardInfo (allPayments, result.data)
                this.setState ({totalExpense, totalLent, totalRevenue, categoryShareData, creditCardInfo}, () => {
                })
            })
        })
        this.setState ({color1: randomColor(), color2: randomColor (), color3: randomColor(), color4: randomColor()})
    }
    render() {
        return (
            <div style={{ marginLeft: "20%" }}>
                <SettingsBar />
                <div className="stat-card-panel">
                    <StatCards backgroundColor={this.state.color1} text="TOTAL BALANCE" amount={`Rs. ${this.state.totalRevenue - this.state.totalExpense}`} />
                    <StatCards backgroundColor={this.state.color2} text="TOTAL EXPENSE" amount={`Rs. ${this.state.totalExpense - this.state.totalLent}`} />
                    <StatCards backgroundColor={this.state.color3} text="TOTAL REVENUE" amount={`Rs. ${this.state.totalRevenue}`} />
                    <StatCards backgroundColor={this.state.color4} text="TOTAL LENT" amount={`Rs. ${this.state.totalLent}`} />
                </div>
                <div className="graph-panel">
                    <Cards data={this.state.creditCardInfo} />
                    <div className="graph-card">
                        <div className="card-title"> Payment Method Share </div>
                    </div>
                    <div className="graph-card">
                        <div className="card-title"> Category Share </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard