import React from "react";
import "./Payment.css"
import SettingsBar from "../Components/SettingsBar";
import StatCards from "../Components/StatCards";
import randomColor from "randomcolor";
import { deletePaymentMethod, getAllPaymentMethods, getEachPaymentMethod } from "../Backend/paymentCalls";
import { accountWiseColumn, calculatePaymentOverview, getAccountWisePayment } from "../PaymentUtils";
import { getAllAccounts, getEachAccount } from "../Backend/accountCalls";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Visibility from '@material-ui/icons/Visibility'
import { getAllTransc } from "../Backend/transactionCalls";
import Table from "../Components/Table";

class Payment extends React.Component {
    constructor() {
        super()
        this.state = {
            allPayments: [],
            selectedPaymentOverview: {},
            selectedPayment: {},
            selectedAccount: {},
            accountWise: [],
            color1: ""
        }
    }
    componentDidMount() {
        getAllPaymentMethods().then(result => {
            this.setState({ allPayments: result })
            getAllAccounts ().then (resultData => {
                let accountWise = getAccountWisePayment(result, resultData);
                this.setState ({accountWise})
            })
        })
        this.setState({ color1: randomColor() })
    }


    render() {
        const allPaymentColumn = [
            {
                name: "paymentMethodName",
                label: "Name",
                options: {
                    filter: true,
                    sort: true,
                },
            },
            {
                name: "_id",
                label: "View",
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        const itemId = tableMeta.rowData[1]
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
                name: "_id",
                label: "Delete",
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        const itemId = tableMeta.rowData[1]
                        return (
                            <IconButton onClick={() => handleDeleteClick(itemId)}>
                                <DeleteIcon />
                            </IconButton>
                        )
                    },
                    filter: false
                }
            }
        ];

        const handleDeleteClick = (accountId) => {
            deletePaymentMethod(accountId).then(() => window.location.reload())
        }

        const handleViewClick = (accountId) => {
            getEachPaymentMethod(accountId).then(result => {
                getEachAccount(result.account).then(result1 => {
                    this.setState({ selectedAccount: result1 })
                })
                this.setState({ selectedPayment: result })
            })
            getAllTransc().then(result => {
                this.setState({ selectedPaymentOverview: calculatePaymentOverview(accountId, result) })
            })
        }

        return (
            <div>
                <SettingsBar />
                <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4">
                    <StatCards backgroundColor={this.state.color1} text="TOTAL PAYMENT METHODS" amount={this.state.allPayments.length} />
                    <div className="shop-overview">
                        <div style={{ alignItems: "flex-start" }} className="card-title"> Payment Overview
                            <div className="payment-heading">
                                {this.state.selectedPayment.paymentMethodName}
                                {this.state.selectedAccount.bankName &&
                                    <div className="payment-subheading">
                                        {this.state.selectedAccount.bankName} ( {this.state.selectedAccount.accountType} )
                                    </div>}
                            </div>
                        </div>
                        <div className="payment-overview-container">
                            {!this.state.selectedAccount.bankName && 
                            <div className="payment-overview-empty">
                                Please select any payment method to view its overview
                            </div>}
                            {this.state.selectedAccount.bankName && <div className="payment-overview-stats">
                                Rs. {this.state.selectedPaymentOverview.sum}
                                <div className="payment-overview-stats-heading">TOTAL TRANSC. AMOUNT</div>
                            </div>}
                            {this.state.selectedAccount.bankName && <div className="payment-overview-stats">
                                {this.state.selectedPaymentOverview.count}
                                <div className="payment-overview-stats-heading">TOTAL TRANSACTIONS</div>
                            </div>}
                        </div>
                    </div>
                    <div className="shop-city-list">
                        <div className="card-title"> Account-wise Payment Methods </div>
                        <Table columns={accountWiseColumn} data={this.state.accountWise} title="" />
                    </div>
                </div>
                <div className="shop-list">
                    <Table columns={allPaymentColumn} data={this.state.allPayments} title="All Registered Payment Methods" />
                </div>
            </div>
        )
    }
}

export default Payment