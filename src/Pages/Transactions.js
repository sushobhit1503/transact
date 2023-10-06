import React from "react";
import "./Transactions.css"
import SettingsBar from "../Components/SettingsBar";
import StatCards from "../Components/StatCards";
import randomColor from "randomcolor";
import Table from "../Components/Table";
import { calculateLentTransc, calculateAllTransc } from "../Transactionutils";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import CheckCircle from "@material-ui/icons/CheckCircle";
import { changeTranscAmount, deleteTransaction, getAllTransc, getEachTransc } from "../Backend/transactionCalls";
import { creditTransc, creditTranscTransfer, debitTransc, debitTranscCardPayments, debitTranscLent, debitTranscTransfer } from "../Utils/commonUtils";
import { getAllShops } from "../Backend/shopCalls";
import { getAllPaymentMethods } from "../Backend/paymentCalls";
import { getAllAccounts } from "../Backend/accountCalls";
import { getAllLedgers } from "../Backend/ledgerCalls";
import Moment from "react-moment";

class Transactions extends React.Component {
    constructor() {
        super()
        this.state = {
            totalDebit: 0,
            totalCredit: 0,
            totalLent: 0,
            totalTransaction: 0,
            allLentTransc: [],
            allTransc: [],
            oneTransaction: null,
            settledAmount: 0,
            color1: "",
            color2: "",
            color3: "",
            color4: ""
        }
    }
    componentDidMount() {
        getAllTransc().then(allTranc => {
            const totalCredit = creditTransc(allTranc).totalCredit - creditTranscTransfer(allTranc).totalCredit
            const totalDebit = debitTransc(allTranc).totalDebit - debitTranscLent(allTranc).totalLent - debitTranscCardPayments(allTranc).totalDebit - debitTranscTransfer(allTranc).totalDebit
            const totalLent = debitTranscLent(allTranc).totalLent
            const totalTransaction = totalCredit + totalDebit + totalLent
            getAllShops().then(allShops => {
                getAllPaymentMethods().then(allPayment => {
                    const allLentTransc = calculateLentTransc(allTranc, allShops, allPayment)
                    getAllAccounts().then(allAccounts => {
                        getAllLedgers().then(allLedger => {

                            const allTransc = calculateAllTransc(allTranc, allShops, allAccounts, allLedger, allPayment)
                            this.setState({ color1: randomColor(), color2: randomColor(), color3: randomColor(), color4: randomColor(), totalCredit, totalDebit, totalLent, totalTransaction, allLentTransc, allTransc })
                        })
                    })
                })
            })
        })
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
                name: "paymentName",
                label: "Payment",
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
                name: "_id",
                label: "Settle",
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return (
                            <div style={{ display: "flex" }}>
                                <input onChange={onChange} value={this.state.settledAmount} style={{ width: "100px" }} placeholder="Rs. 0" />
                            </div>
                        )
                    },
                    filter: false
                }
            },
            {
                name: "_id",
                label: "Action",
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        const itemId = tableMeta.rowData[6]
                        return (
                            <div style={{ display: "flex", cursor: "pointer" }}>
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
                                <div style={{ display: "flex", cursor: "pointer" }}>
                                    <Add />
                                </div>
                            )
                        else
                            return (
                                <div style={{ display: "flex", cursor: "pointer" }}>
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
                    customBodyRender: (value, tableMeta, updateValue) => {
                        const itemId = tableMeta.rowData[7]
                        return (
                            <div>
                                <Moment format="DD/MM/YYYY">
                                    {itemId}
                                </Moment>
                            </div>
                        )
                    }
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
                name: "_id",
                label: "Edit",
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        const itemId = tableMeta.rowData[9]
                        return (
                            <div style={{ display: "flex", cursor: "pointer" }}>
                                <EditIcon onClick={() => handleEditClick(itemId)} />
                            </div>
                        )
                    },
                    filter: false
                }
            }
        ];

        const handleCheckClick = (accountId) => {
            changeTranscAmount(this.state.settledAmount, accountId).then(() => {
                window.alert("Amount changed")
            })
        }

        const handleDeleteClick = (accountId) => {
            deleteTransaction(accountId).then(() => {
                window.alert("Transaction Deleted")
            }
            )
        }

        const handleEditClick = (accountId) => {
            getEachTransc(accountId).then(result => {
                this.setState({ oneTransaction: result })
            })
        }

        const onChange = (event) => {
            this.setState({ settledAmount: event.target.value })
        }

        return (
            <div>
                <SettingsBar />
                <div className="row row-cols-1 row-cols-xl-4 row-cols-md-2 g-3">
                    <StatCards backgroundColor={this.state.color1} text="TOTAL TRANSACTIONS" amount={this.state.totalTransaction} />
                    <StatCards backgroundColor={this.state.color2} text="TOTAL DEBIT TRANSACTIONS" amount={this.state.totalDebit} />
                    <StatCards backgroundColor={this.state.color3} text="TOTAL CREDIT TRANSACTIONS" amount={this.state.totalCredit} />
                    <StatCards backgroundColor={this.state.color4} text="TOTAL LENT TRANSACTIONS" amount={this.state.totalLent} />
                </div>
                <div className="m-3">
                    <div className="transaction-details">
                        <Table columns={allTranscLentColumn} data={this.state.allLentTransc} title="Lent Transactions" />
                    </div>
                </div>
                <div className="m-3">
                    <div className="transaction-details">
                        <Table columns={allTranscColumn} data={this.state.allTransc} title="All Transactions" />
                    </div>
                </div>
                <div className="row row-cols-xl-2 row-cols-1 g-3">
                    <div className="col-12 col-xl-4">
                        <div className="graph-card">
                            <div className="card-title"> Transaction Overview </div>
                            <div>
                                {!this.state.oneTransaction && <div className="card-subheading">
                                    No Transaction is selected to view
                                </div>}
                                {this.state.oneTransaction && <div className="card-heading d-flex justify-content-between">
                                    {this.state.oneTransaction.itemName}
                                    <button onClick={() => handleDeleteClick(this.state.oneTransaction._id)} className="btn btn-danger card-subheading d-flex align-items-center">
                                        Delete
                                        <DeleteIcon className="cursor" />
                                    </button>
                                </div>}
                                {this.state.oneTransaction && <div className="text-color">
                                    <div className="m-1"><span className="sub-heading">CATEGORY:</span> {this.state.oneTransaction.category}</div>
                                    <div className="m-1"><span className="sub-heading">DATE:</span>
                                        <Moment format="DD/MM/YYYY">
                                            {this.state.oneTransaction.date}
                                        </Moment> </div>
                                    <div className="m-1"><span className="sub-heading">AMOUNT:</span> {this.state.oneTransaction.amount}</div>
                                    <div className="m-1">
                                        <input onChange={onChange} value={this.state.settledAmount} style={{ width: "100px" }} placeholder="Rs. 0" />
                                    </div>
                                    <div className="mt-3">
                                        <button className="btn btn-primary" onClick={() => handleCheckClick(this.state.oneTransaction._id)}>
                                            Edit Amount
                                        </button>
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-xl-8">
                        <div className="graph-card">
                            <div className="card-title"> SOME POINTS TO REMEMBER </div>
                            <ul className="payment-overview-empty">
                                <li>The correct figures are displayed on the overall ledger balance which includes lent amount also.</li>
                                <li>Add the taxes paid on Credit Card in the transaction.</li>
                                <li>Use General Store only if the store is one time use or unknown.</li>
                                <li>Use Self if the transaction is not a merchant transaction.</li>
                                <li>If Lent transaction has another payment Method, transfer the received amount in the same payment method.</li>
                                <li>The settlement value is the pending amount to be paid and not the received amount.</li>
                                <li>For investment ledger, all the money which is invested should be in the investment ledger.</li>
                                <li>Try to keep allocation to 0. Transfer money into trade account as per requirement.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Transactions