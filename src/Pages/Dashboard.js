import React from "react";
import StatCards from "../Components/StatCards";
import "./Dashboard.css"
import Cards from "../Components/Cards";
import CanvasJSReact from '@canvasjs/react-charts';
import SettingsBar from "../Components/SettingsBar";
import { calculateCreditCardInfo, calculateOverallCategoryShare, calculateOverallPaymentShare } from "../Utils/DashboardUtils";
import randomColor from "randomcolor";
import { getPaymentByCredit } from "../Backend/paymentCalls";
import { calculateAccountOverview } from "../AccountUtils.js"
import { creditTransc, creditTranscTransfer, debitTranscLent, debitTransc, debitTranscCardPayments, debitTranscTransfer } from "../Utils/commonUtils";
import AccountCards from "../Components/AccountCards";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Dashboard extends React.Component {
    constructor() {
        super()
        this.state = {
            totalRevenue: 0,
            totalExpense: 0,
            totalLent: 0,
            totalBalance: 0,
            paymentShareData: [],
            categoryShareData: [],
            creditCardInfo: [],
            accountInfo: [],
            color1: "",
            color2: "",
            color3: "",
            color4: ""
        }
    }
    componentDidMount() {
        const allTransc = JSON.parse(localStorage.getItem("transc"))
        const allPayments = JSON.parse(localStorage.getItem("payments"))
        const allAccount = JSON.parse(localStorage.getItem("accounts"))
        const totalLent = debitTranscLent(allTransc).totalRevenue
        const totalRevenue = creditTransc(allTransc).totalRevenue - creditTranscTransfer(allTransc).totalRevenue
        const totalExpense = debitTransc(allTransc).totalRevenue - debitTranscLent(allTransc).totalRevenue - debitTranscCardPayments(allTransc).totalExpense - debitTranscTransfer(allTransc).totalRevenue
        const totalBalance = creditTransc(allTransc).totalRevenue - debitTransc(allTransc).totalRevenue + debitTranscCardPayments(allTransc).totalExpense
        const paymentShareData = calculateOverallPaymentShare(allTransc, allPayments)
        const categoryShareData = calculateOverallCategoryShare(allTransc)
        const accountInfo = calculateAccountOverview (allAccount, allTransc)
        getPaymentByCredit().then(allPayments => {
            const creditCardInfo = calculateCreditCardInfo(allPayments, allTransc)
            this.setState({ totalExpense, totalBalance, totalLent, totalRevenue, categoryShareData, creditCardInfo, paymentShareData, accountInfo })
        })
        this.setState({ color1: randomColor(), color2: randomColor(), color3: randomColor(), color4: randomColor() })
    }
    render() {
        const optionsPayment = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "dark2",
			axisY: {
				includeZero: true
			},
			data: [{
				type: "column",
				indexLabelFontColor: "#5A5757",
				indexLabelPlacement: "outside",
                axisX: {
                    valueFormatString: ""
                },
				dataPoints: this.state.paymentShareData
			}]
		}

        const optionsCategory = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "dark2",
			axisY: {
				includeZero: true
			},
			data: [{
				type: "column",
				indexLabelFontColor: "#5A5757",
				indexLabelPlacement: "outside",
                axisX: {
                    valueFormatString: ""
                },
				dataPoints: this.state.categoryShareData
			}]
		}
        return (
            <div>
                <SettingsBar />
                <div className="row row-cols-1 row-cols-xl-4 row-cols-md-2 g-3">
                    <StatCards backgroundColor={this.state.color1} text="TOTAL BALANCE" amount={`Rs. ${this.state.totalBalance}`} />
                    <StatCards backgroundColor={this.state.color2} text="TOTAL EXPENSE" amount={`Rs. ${this.state.totalExpense}`} />
                    <StatCards backgroundColor={this.state.color3} text="TOTAL REVENUE" amount={`Rs. ${this.state.totalRevenue}`} />
                    <StatCards backgroundColor={this.state.color4} text="TOTAL LENT" amount={`Rs. ${this.state.totalLent}`} />
                </div>
                <div className="row row-cols-1 row-cols-xl-2 g-3">
                    <Cards data={this.state.creditCardInfo} />
                    <AccountCards data={this.state.accountInfo} />
                </div>
                <div className="row row-cols-1 row-cols-xl-2 g-3">
                    <div className="col">
                        <div className="graph-card">
                            <div className="card-title"> Payment Method Share </div>
                            <div>
                                <CanvasJSChart options={optionsPayment}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="graph-card">
                            <div className="card-title"> Category Share </div>
                            <div>
                                <CanvasJSChart options={optionsCategory}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard