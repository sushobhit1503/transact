import React from "react";
import "./Accounts.css"
import SettingsBar from "../Components/SettingsBar";
import StatCards from "../Components/StatCards";
import randomColor from "randomcolor";
import { calculateCurrentAccounts, calculateSavingAccounts, calculateTotalBanks, calculateAccountOverview, calculateAccountLedgers, calculateLedgerAccountOverview, calculateCalendarData } from "../AccountUtils";
import Table from "../Components/Table";
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import CanvasJSReact from '@canvasjs/react-charts';
import { getTranscByAccount } from "../Backend/transactionCalls";
import { getEachAccount } from "../Backend/accountCalls";
import { getAllLedgers, getLedgersByAccount } from "../Backend/ledgerCalls";
import { calculateOverallCategoryShare, calculateOverallPaymentShare } from "../Utils/DashboardUtils";
import Calendar from "../Components/Calendar";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Accounts extends React.Component {
    constructor() {
        super()
        this.state = {
            totalCurrent: 0,
            totalSaving: 0,
            totalBanks: 0,
            allAccounts: [],
            selectedAccount: {},
            selectedLedger: [],
            selectedAccountOverview: {},
            calendarData: [],
            categoryData: [],
            paymentData: [],
            color1: "",
            color2: "",
            color3: "",
            color4: "",
            history: "Payment Method"
        }
    }
    componentDidMount() {
        var allAccount = JSON.parse(localStorage.getItem("accounts"))
        var allTransc = JSON.parse(localStorage.getItem("transc"))
        const totalCurrent = calculateCurrentAccounts(allAccount)
        const totalSaving = calculateSavingAccounts(allAccount)
        const totalBanks = calculateTotalBanks(allAccount)
        const allAccounts = calculateAccountOverview(allAccount, allTransc)
        this.setState({ color1: randomColor(), color2: randomColor(), color3: randomColor(), color4: randomColor(), totalBanks, totalCurrent, totalSaving, allAccounts })
    }
    render() {
        const allAccountColumn = [
            {
                name: "bankName",
                label: "Name",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "accountType",
                label: "Type",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "balance",
                label: "Balance",
                options: {
                    filter: true,
                    sort: true,
                },
            },
            {
                name: "debit",
                label: "Debit",
                options: {
                    filter: true,
                    sort: true,
                },
            },
            {
                name: "credit",
                label: "Credit",
                options: {
                    filter: true,
                    sort: true,
                },
            },
            {
                name: "uid",
                label: "View",
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        const itemId = tableMeta.rowData[5]
                        return (
                            <IconButton onClick={() => handleViewClick(itemId)}>
                                <Visibility />
                            </IconButton>
                        )
                    },
                    filter: false
                }
            }
        ];

        const allLedgerColumn = [
            {
                name: "name",
                label: "Name",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "balance",
                label: "Balance",
                options: {
                    filter: true,
                    sort: true,
                },
            },
            {
                name: "debit",
                label: "Debit",
                options: {
                    filter: true,
                    sort: true,
                },
            },
            {
                name: "credit",
                label: "Credit",
                options: {
                    filter: true,
                    sort: true,
                },
            }
        ];

        const handleViewClick = (accountId) => {
            var allPayments = JSON.parse(localStorage.getItem("payments"))
            getEachAccount(accountId).then(selectedAccount => {
                this.setState({ selectedAccount })
            })
            getAllLedgers().then(ledgers => {
                getTranscByAccount(accountId).then(result => {
                    const selectedLedger = calculateAccountLedgers(result, ledgers, accountId)
                    this.setState({ selectedLedger })
                })
            })
            getLedgersByAccount(accountId).then(result => {
                const selectedAccountOverview = calculateLedgerAccountOverview(result)
                this.setState({ selectedAccountOverview })
            })
            getTranscByAccount(accountId).then(result => {
                const paymentData = calculateOverallPaymentShare(result, allPayments)
                const categoryData = calculateOverallCategoryShare(result)
                const calendarData = calculateCalendarData(result)
                this.setState({ paymentData, categoryData, calendarData })
            })
        }

        const optionsPayment = {
            exportEnabled: true,
            animationEnabled: true,
            theme: "dark2",
            data: [{
                type: "pie",
                startAngle: 75,
                dataPoints: this.state.paymentData
            }]
        }

        const optionsCategory = {
            exportEnabled: true,
            animationEnabled: true,
            theme: "dark2",
            data: [{
                type: "pie",
                startAngle: 75,
                dataPoints: this.state.categoryData
            }]
        }

        return (
            <div>
                <SettingsBar />
                <div className="row row-cols-1 row-cols-xl-4 row-cols-md-2 g-3">
                    <StatCards backgroundColor={this.state.color1} text="TOTAL ACCOUNTS" amount={this.state.totalSaving + this.state.totalCurrent} />
                    <StatCards backgroundColor={this.state.color2} text="TOTAL SAVING ACCOUNTS" amount={this.state.totalSaving} />
                    <StatCards backgroundColor={this.state.color3} text="TOTAL CURRENT ACCOUNTS" amount={this.state.totalCurrent} />
                    <StatCards backgroundColor={this.state.color4} text="TOTAL BANKS" amount={this.state.totalBanks} />
                </div>
                <div className="row row-cols-1 row-cols-xl-2 g-3">
                    <div className="col">
                        <div className="account-overview">
                            <Table columns={allAccountColumn} data={this.state.allAccounts} title="All Accounts" />
                        </div>
                    </div>
                    <div className="col">
                        <div className="account-overview">
                            <div className="card-title"> Account Overview
                                <div className="payment-subheading">
                                    <div>
                                        {this.state.selectedAccount?.bankName} - {this.state.selectedAccount.accountType}
                                    </div>
                                </div>
                            </div>
                            <div className="row row-cols-3 g-3 mb-3">
                                <div className="col-12">
                                    {!this.state.selectedLedger[0] &&
                                        <div className="payment-overview-empty">
                                            Please select any account to view its overview
                                        </div>}
                                </div>
                                <div className="col-4">
                                    {this.state.selectedLedger[0] && <div className="payment-overview-stats">
                                        {this.state.selectedAccountOverview.total}
                                        <div className="payment-overview-stats-heading">TOTAL LEDGERS</div>
                                    </div>}
                                </div>
                                <div className="col-4">
                                    {this.state.selectedLedger[0] && <div className="payment-overview-stats">
                                        {this.state.selectedAccountOverview.totalActive}
                                        <div className="payment-overview-stats-heading">ACTIVE</div>
                                    </div>}
                                </div>
                                <div className="col-4">
                                    {this.state.selectedLedger[0] && <div className="payment-overview-stats">
                                        {this.state.selectedAccountOverview.totalDeactive}
                                        <div className="payment-overview-stats-heading">DE-ACTIVE</div>
                                    </div>}
                                </div>
                            </div>
                            {this.state.selectedLedger[0] && <Table columns={allLedgerColumn} data={this.state.selectedLedger} title="All Ledgers" />}
                            <div className="payment-overview-empty">
                                NOTE: The debit amount includes money given on lent
                            </div>

                        </div>
                    </div>
                </div>
                <div className="row row-cols-1 row-cols-xl-2 g-3">
                    <div className="col">
                        <div className="graph-card">
                            <div className="card-title"> Calendar Graph </div>
                            <div>
                                {this.state.calendarData.length === 0 ?
                                    <div className="payment-overview-empty">
                                        No account selected
                                    </div> :
                                    <div className="myCustomHeight">
                                        <Calendar currentEvents={this.state.calendarData} />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="graph-card">
                            <div className="card-title"> Payment Graph </div>
                            <div>
                                {this.state.paymentData.length === 0 ?
                                    <div className="payment-overview-empty">
                                        No account selected
                                    </div> :
                                    <CanvasJSChart options={optionsPayment}
                                    />
                                }
                            </div>
                        </div>
                        <div className="graph-card">
                            <div className="card-title"> Category Graph </div>
                            <div>
                                {this.state.categoryData.length === 0 ?
                                    <div className="payment-overview-empty">
                                        No account selected
                                    </div> :
                                    <CanvasJSChart options={optionsCategory}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Accounts