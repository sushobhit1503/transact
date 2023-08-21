import React from "react";
import "./Ledger.css"
import SettingsBar from "../Components/SettingsBar";
import randomColor from "randomcolor";
import { baseUrl } from "../index";
import axios from "axios";
import StatCards from "../Components/StatCards";
import { calculateActiveLedgers, calculateAllLedgers, calculateCalendarLedger, calculateCategoryLedger, calculateNegativeLedgers, calculateNonActiveLedgers, calculatePaymentMethodsLedger, } from "../LedgerUtils";
import IconButton from '@material-ui/core/IconButton';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Cancel from "@material-ui/icons/Cancel"
import Visibility from '@material-ui/icons/Visibility'
import Table from "../Components/Table";
import { getEachLedger, deActivateLedger, activateLedger } from "../Backend/ledgerCalls";
import { getEachAccount } from "../Backend/accountCalls";
import { getAllTransc, getTranscByLedger } from "../Backend/transactionCalls";
import { getAllPaymentMethods } from "../Backend/paymentCalls";
import { BarChart, Bar } from "recharts";


class Ledger extends React.Component {
    constructor() {
        super()
        this.state = {
            totalActive: 0,
            totalNonActive: 0,
            totalNegative: 0,
            allLedgers: [],
            selectedLedger: {},
            selectedAccount: {},
            paymentData: [],
            categoryData: [],
            calendarData: [],
            show: false,
            color1: "",
            color2: "",
            color3: "",
            color4: ""
        }
    }
    componentDidMount() {
        axios.get(`${baseUrl}/ledger/all`).then(result => {
            const totalActive = calculateActiveLedgers(result.data)
            const totalNonActive = calculateNonActiveLedgers(result.data)
            getAllTransc().then((transData) => {
                const totalNegative = calculateNegativeLedgers(result.data, transData)
                const allLedgers = calculateAllLedgers(result.data, transData)
                this.setState({ totalActive, totalNegative, totalNonActive, allLedgers })
            })
        })
        this.setState({ color1: randomColor(), color2: randomColor(), color3: randomColor(), color4: randomColor() })
        getTranscByLedger("647b681972e1812b5d9145c8").then(result => {
            getAllPaymentMethods().then(data => {
                const paymentData = calculatePaymentMethodsLedger(result, data)
                const categoryData = calculateCategoryLedger(result)
                const calendarData = calculateCalendarLedger(result)
                this.setState({ paymentData, calendarData, categoryData, show: true }, () => console.log(this.state.categoryData, this.state.show))
            })
        })
    }

    render() {
        const allLedgerColumn = [
            {
                name: "name",
                label: "Name",
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        const itemId = tableMeta.rowData[5]
                        if (itemId)
                            return (
                                <div style={{ display: "flex" }}>
                                    {tableMeta.rowData[0]} <div style={{ marginLeft: "4px" }}> (A) </div>
                                </div>
                            )
                        else
                            return (
                                <div style={{ display: "flex" }}>
                                    {tableMeta.rowData[0]} <div style={{ marginLeft: "4px" }}> (D) </div>
                                </div>
                            )
                    },
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
                        const itemId = tableMeta.rowData[4]
                        return (
                            <IconButton onClick={() => handleViewClick(itemId)}>
                                <Visibility />
                            </IconButton>
                        )
                    },
                    filter: false
                }
            },
            {
                name: "active",
                label: "Status",
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        const itemId = tableMeta.rowData[4]
                        if (tableMeta.rowData[5])
                            return (
                                <IconButton onClick={() => handleStatusClick(itemId, tableMeta.rowData[5])}>
                                    <Cancel />
                                </IconButton>
                            )
                        else
                            return (
                                <IconButton onClick={() => handleStatusClick(itemId, tableMeta.rowData[5])}>
                                    <CheckCircle />
                                </IconButton>
                            )
                    },
                    filter: false
                }
            }
        ];
        const options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                }
            },
        };
        const handleStatusClick = (accountId, status) => {
            if (status) {
                deActivateLedger(accountId).then(() => window.location.reload())
            }
            else
                activateLedger(accountId).then(() => window.location.reload())
        }

        const data = [
            {
                name: "Page A",
                uv: 4000,
                pv: 2400,
                amt: 2400
            },
            {
                name: "Page B",
                uv: 3000,
                pv: 1398,
                amt: 2210
            },
            {
                name: "Page C",
                uv: 2000,
                pv: 9800,
                amt: 2290
            },
            {
                name: "Page D",
                uv: 2780,
                pv: 3908,
                amt: 2000
            },
            {
                name: "Page E",
                uv: 1890,
                pv: 4800,
                amt: 2181
            },
            {
                name: "Page F",
                uv: 2390,
                pv: 3800,
                amt: 2500
            },
            {
                name: "Page G",
                uv: 3490,
                pv: 4300,
                amt: 2100
            }
        ];

        const handleViewClick = (accountId) => {

            getEachLedger(accountId).then(result => {
                this.setState({ selectedLedger: result }, () => {
                    getEachAccount(result.account).then(result1 => {
                        this.setState({ selectedAccount: result1 })
                    })
                })
            })
            getTranscByLedger(accountId).then(result => {
                getAllPaymentMethods().then(data => {
                    const paymentData = calculatePaymentMethodsLedger(result, data)
                    const categoryData = calculateCategoryLedger(result)
                    const calendarData = calculateCalendarLedger(result)
                    this.setState({ paymentData, calendarData, categoryData, show: true }, () => console.log(this.state.categoryData, this.state.show))
                })
            })
        }


        const onChange = (value) => {
            this.setState({ history: value })
        }
        return (
            <div>
                <SettingsBar />
                <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4">
                    <StatCards backgroundColor={this.state.color1} text="TOTAL LEDGERS" amount={this.state.totalActive + this.state.totalNonActive} />
                    <StatCards backgroundColor={this.state.color2} text="ACTIVE LEDGERS" amount={this.state.totalActive} />
                    <StatCards backgroundColor={this.state.color3} text="NON ACTIVE LEDGERS" amount={this.state.totalNonActive} />
                    <StatCards backgroundColor={this.state.color4} text="NEGATIVE LEDGERS" amount={this.state.totalNegative} />
                </div>
                <div className="row row-cols-1 row-cols-xl-2 g-3">
                    <div className="col">
                        <div className="account-overview">
                            <Table columns={allLedgerColumn} data={this.state.allLedgers} title="All Ledgers" />
                        </div>
                    </div>
                    <div className="col">
                        <div className="ledger-overview">
                            <div className="card-title"> Ledger Overview</div>
                            {!this.state.selectedLedger.name &&
                                <div className="payment-overview-empty">
                                    Please select any ledger to view its overview
                                </div>}
                            <div className="ledger-heading">
                                <div>
                                    {this.state.selectedLedger?.name}
                                    {this.state.selectedLedger.name &&
                                        <div className="payment-subheading">
                                            {this.state.selectedAccount.bankName} - {this.state.selectedAccount.accountType}
                                        </div>}
                                </div>
                                {this.state.selectedLedger.purpose && <div>
                                    {this.state.selectedLedger?.active ? <div className="ledger-active-tablet">ACTIVE</div> : <div className="ledger-deactive-tablet">NON - ACTIVE</div>}
                                </div>}
                            </div>
                            {this.state.selectedLedger.purpose && <div className="ledger-purpose">
                                PURPOSE: {this.state.selectedLedger?.purpose}
                            </div>}
                        </div>
                    </div>
                </div>
                <div className="row row-cols-1 row-cols-xl-3 g-3">
                    <div className="col">
                        <div className="graph-card">
                            <div className="card-title"> Calendar Graph </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="graph-card">
                            <div className="card-title"> Payment Graph </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="graph-card">
                            <div className="card-title"> Category Graph </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Ledger