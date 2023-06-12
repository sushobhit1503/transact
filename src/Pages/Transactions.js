import React from "react";
import "./Transactions.css"
import SettingsBar from "../Components/SettingsBar";
import StatCards from "../Components/StatCards";
import axios from "axios";
import { baseUrl } from "../index";
import randomColor from "randomcolor";
import Table from "../Components/Table";
import { calculateOverallCreditTransactions, calculateOverallDebitTransactions, calculateOverallLentTransactions, calculateAllTransc, calculateLentTransc } from "../Transactionutils";
import DeleteIcon from '@material-ui/icons/Delete';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import { getAllShops } from "../Backend/shopCalls";
import CheckCircle from "@material-ui/icons/CheckCircle";
import { changeTranscAmount, deleteTransaction } from "../Backend/transactionCalls";
import { getAllAccounts } from "../Backend/accountCalls";
import { getAllLedgers } from "../Backend/ledgerCalls";
import { getAllPaymentMethods } from "../Backend/paymentCalls";

class Transactions extends React.Component {
    constructor() {
        super()
        this.state = {
            totalDebit: 0,
            totalCredit: 0,
            totalLent: 0,
            allLentTransc: [],
            allTransc: [],
            settledAmount: 0,
            color1: "",
            color2: "",
            color3: "",
            color4: ""
        }
    }
    componentDidMount() {
        axios.get(`${baseUrl}/transaction/all`).then(result => {
            const totalCredit = calculateOverallCreditTransactions(result.data)
            const totalDebit = calculateOverallDebitTransactions(result.data)
            const totalLent = calculateOverallLentTransactions(result.data)
            getAllShops().then(resultData => {
                const allLentTransc = calculateLentTransc(result.data, resultData)
                getAllAccounts().then (allAccounts => {
                    getAllLedgers().then (allLedgers => {
                        getAllPaymentMethods().then (allPaymentMethods => {
                            const allTransc = calculateAllTransc (result.data, resultData, allAccounts, allLedgers, allPaymentMethods)
                            this.setState({ totalCredit, totalDebit, totalLent, allLentTransc, allTransc })
                        })
                    })
                })
            })
        })
        this.setState({ color1: randomColor(), color2: randomColor(), color3: randomColor(), color4: randomColor() })
    }
    render() {
        const allTranscLentColumn = [
            {
                name: "itemName",
                label: "Name",
                options: {
                    filter: true,
                    sort: true,
                },
            },
            {
                name: "shop",
                label: "Shop",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "creditPerson",
                label: "Person",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "amount",
                label: "Amount",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "uid",
                label: "Settle",
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return (
                            <div style={{ display: "flex" }}>
                                <input onChange={onChange} value={this.state.settledAmount} style={{ width: "40px" }} placeholder="Rs. 0" />
                            </div>
                        )
                    },
                    filter: false
                }
            },
            {
                name: "uid",
                label: "Action",
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        const itemId = tableMeta.rowData[4]
                        return (
                            <div style={{ display: "flex", cursor:"pointer" }}>
                                <CheckCircle onClick={() => handleCheckClick(itemId)} />
                            </div>
                        )
                    },
                    filter: false
                }
            }
        ];

        const allTranscColumn = [
            {
                name: "itemName",
                label: "Name",
                options: {
                    filter: true,
                    sort: true,
                },
            },
            {
                name: "shop",
                label: "Shop",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "ledgerName",
                label: "Ledger",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "accountName",
                label: "Bank Name",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "paymentName",
                label: "Payment",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "category",
                label: "Category",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "credit",
                label: "Transc",
                options: {
                    filter: true,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        const itemId = tableMeta.rowData[6]
                        if (itemId)
                        return (
                            <div style={{ display: "flex", cursor:"pointer" }}>
                                <Add/>
                            </div>
                        )
                        else 
                        return (
                            <div style={{ display: "flex", cursor:"pointer" }}>
                                <Remove />
                            </div>
                        )
                    },
                }
            },
            {
                name: "date",
                label: "Date",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "amount",
                label: "Amount",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "uid",
                label: "Delete",
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        const itemId = tableMeta.rowData[8]
                        return (
                            <div style={{ display: "flex", cursor:"pointer" }}>
                                <DeleteIcon onClick={() => handleDeleteClick(itemId)} />
                            </div>
                        )
                    },
                    filter: false
                }
            }
        ];

        const handleCheckClick = (accountId) => {
            changeTranscAmount(this.state.settledAmount, accountId).then(() => {
                window.location.reload()
            })
        }

        const handleDeleteClick = (accountId) => {
            deleteTransaction (accountId).then (() => {
                window.location.reload ()
            })
        }

        const onChange = (event) => {
            this.setState({ settledAmount: event.target.value })
        }

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
                    <div className="transaction-details">
                        <Table columns={allTranscLentColumn} data={this.state.allLentTransc} title="Lent Transactions" />
                    </div>
                </div>
                <div className="graph-panel">
                    <div className="transaction-details">
                        <Table columns={allTranscColumn} data={this.state.allTransc} title="All Transactions" />
                    </div>
                </div>
                <div className="graph-panel">
                    <div className="transaction-overview">
                        Transaction overview
                    </div>
                    <div className="transaction-overview">
                        <div className="card-title"> Transaction Data Graphs </div>
                        Show all the account/ledger transactions and provide the delete option only. There will be sort and filter as per the date and the number of transactions
                    </div>
                </div>
            </div>
        )
    }
}

export default Transactions