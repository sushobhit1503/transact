import React from "react";
import StatCards from "../Components/StatCards";
import "./Dashboard.css"
import Cards from "../Components/Cards";
import SettingsBar from "../Components/SettingsBar";
import { baseUrl } from "../index";
import axios from "axios";
import { calculateCreditCardInfo, calculateOverallExpense, calculateOverallRevenue, calculateOverallLent, calculateOverallCategoryShare, calculateOverallPaymentShare } from "../DashboardUtils";
import randomColor from "randomcolor";
import { getPaymentByCredit } from "../Backend/paymentCalls";

class Dashboard extends React.Component {
    constructor() {
        super()
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
    componentDidMount() {
        axios.get(`${baseUrl}/transaction/all`).then(result => {
            const totalExpense = calculateOverallExpense(result.data)
            const totalRevenue = calculateOverallRevenue(result.data)
            const totalLent = calculateOverallLent(result.data)
            axios.get(`${baseUrl}/payment`).then(result1 => {
                const paymentShareData = calculateOverallPaymentShare(result.data, result1.data)
                this.setState({ paymentShareData })
            })
            const categoryShareData = calculateOverallCategoryShare(result.data)
            getPaymentByCredit().then(allPayments => {
                const creditCardInfo = calculateCreditCardInfo(allPayments, result.data)
                this.setState({ totalExpense, totalLent, totalRevenue, categoryShareData, creditCardInfo }, () => {
                })
            })
        })
        this.setState({ color1: randomColor(), color2: randomColor(), color3: randomColor(), color4: randomColor() })
    }
    render() {
        return (
            <div>
                <SettingsBar />
                <div className="row row-cols-1 row-cols-xl-4 row-cols-md-2 g-3">
                    <StatCards backgroundColor={this.state.color1} text="TOTAL BALANCE" amount={`Rs. ${this.state.totalRevenue - this.state.totalExpense}`} />
                    <StatCards backgroundColor={this.state.color2} text="TOTAL EXPENSE" amount={`Rs. ${this.state.totalExpense - this.state.totalLent}`} />
                    <StatCards backgroundColor={this.state.color3} text="TOTAL REVENUE" amount={`Rs. ${this.state.totalRevenue}`} />
                    <StatCards backgroundColor={this.state.color4} text="TOTAL LENT" amount={`Rs. ${this.state.totalLent}`} />
                </div>
                <div className="row row-cols-1 row-cols-xl-2 g-3">
                    <Cards data={this.state.creditCardInfo} />
                    <div className="col">
                        <div className="row row-cols-1 row-cols-xl-2 g-3">
                            <div className="col">
                                <div className="graph-card">
                                    <div className="card-title"> Account 1 </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="graph-card">
                                    <div className="card-title"> Account 2 </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="graph-card">
                                    <div className="card-title"> Account 3 </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="graph-card">
                                    <div className="card-title"> Account 4 </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row row-cols-1 row-cols-xl-2 g-3">
                    <div className="col">
                        <div className="graph-card">
                            <div className="card-title"> Payment Method Share </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="graph-card">
                            <div className="card-title"> Category Share </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard