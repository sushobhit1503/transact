import React from "react";
import "./Ledger.css"
import SettingsBar from "../Components/SettingsBar";
import randomColor from "randomcolor";
import { baseUrl } from "../index";
import axios from "axios";
import StatCards from "../Components/StatCards";
import { calculateActiveLedgers, calculateAllLedgers, calculateCalendarLedger, calculateCategoryLedger, calculateNegativeLedgers, calculateNonActiveLedgers, calculatePaymentMethodsLedger, } from "../LedgerUtils";
import SelectSearch from "react-select-search";
import { ledgerHistoryOptions } from "../constants";
import IconButton from '@material-ui/core/IconButton';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Cancel from "@material-ui/icons/Cancel"
import Visibility from '@material-ui/icons/Visibility'
import Table from "../Components/Table";
import { getEachLedger } from "../Backend/ledgerCalls";
import { getEachAccount } from "../Backend/accountCalls";
import { getAllTransc, getTranscByLedger } from "../Backend/transactionCalls";
import { getAllPaymentMethods } from "../Backend/paymentCalls";
import PieChart from "../Components/PieChart";
import { deActivateLedger, activateLedger } from "../Backend/ledgerCalls";

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
            color1: "",
            color2: "",
            color3: "",
            color4: "",
            history: ""
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
        const handleStatusClick = (accountId, status) => {
            if (status) {
                deActivateLedger(accountId).then(() => window.location.reload())
            }
            else
                activateLedger(accountId).then(() => window.location.reload())
        }

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
                    this.setState({ paymentData, calendarData, categoryData })
                })
            })
        }

        const onChange = (value) => {
            this.setState({ history: value })
        }
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
                    <div className="ledger-history">
                        <Table columns={allLedgerColumn} data={this.state.allLedgers} title="All Ledgers" />
                    </div>
                    <div>
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
                        <div className="ledger-details">
                            <div className="card-title"> Ledger History
                                <SelectSearch onChange={onChange} search options={ledgerHistoryOptions} value={this.state.history} name="history" placeholder="Select Options" />
                            </div>
                            <div>
                            {this.state.history && <PieChart data={this.state.paymentData} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Ledger