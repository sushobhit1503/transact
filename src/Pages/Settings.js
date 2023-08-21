import React from "react";
import "./Payment.css"
import SettingsBar from "../Components/SettingsBar";
import StatCards from "../Components/StatCards";
import axios from "axios";
import randomColor from "randomcolor";
import Table from "../Components/Table";
import { baseUrl } from "../index";
import { calculateShopOverview, cityWiseColumn, getCityWiseShop } from "../ShopUtils";
import { deletePaymentMethod, getAllPaymentMethods, getEachPaymentMethod } from "../Backend/paymentCalls";
import { accountWiseColumn, calculatePaymentOverview, getAccountWisePayment } from "../PaymentUtils";
import { getAllAccounts, getEachAccount } from "../Backend/accountCalls";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Visibility from '@material-ui/icons/Visibility'
import { deleteShop, getEachShop } from "../Backend/shopCalls"
import { getAllTransc } from "../Backend/transactionCalls";

class Settings extends React.Component {
    constructor() {
        super()
        this.state = {
            color1: "",
            totalShops: 0,
            allPayments: [],
            selectedShop: {},
            selectedShopOverview: {},
            cityWiseShops: [],
            allShops: [],
            allPayments: [],
            selectedPaymentOverview: {},
            selectedPayment: {},
            selectedAccount: {},
            accountWise: []
        }
    }
    componentDidMount() {
        axios.get(`${baseUrl}/shops`).then(result => {
            this.setState({ totalShops: result.data.length, allShops: result.data, cityWiseShops: getCityWiseShop(result.data) })
        })
        getAllPaymentMethods().then(result => {
            this.setState({ allPayments: result })
            getAllAccounts().then(resultData => {
                let accountWise = getAccountWisePayment(result, resultData);
                this.setState({ accountWise })
            })
        })
        this.setState({ color1: randomColor(), color2: randomColor() })
    }
    render() {
        const allShopColumn = [
            {
                name: "name",
                label: "Name",
                options: {
                    filter: true,
                    sort: true,
                },
            },
            {
                name: "city",
                label: "City",
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
                        const itemId = tableMeta.rowData[2]
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
                name: "uid",
                label: "Delete",
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        const itemId = tableMeta.rowData[2]
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
                name: "uid",
                label: "View",
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        const itemId = tableMeta.rowData[1]
                        return (
                            <IconButton onClick={() => handleViewClick1(itemId)}>
                                <Visibility />
                            </IconButton>
                        )
                    },
                    filter: false
                }
            },
            {
                name: "uid",
                label: "Delete",
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        const itemId = tableMeta.rowData[1]
                        return (
                            <IconButton onClick={() => handleDeleteClick1(itemId)}>
                                <DeleteIcon />
                            </IconButton>
                        )
                    },
                    filter: false
                }
            }
        ];
        const handleDeleteClick = (accountId) => {
            deleteShop(accountId).then(() => window.location.reload())
        }

        const handleViewClick = (accountId) => {
            getEachShop(accountId).then(result => {
                this.setState({ selectedShop: result })
            })
            getAllTransc().then(result => {
                this.setState({ selectedShopOverview: calculateShopOverview(accountId, result) })
            })
        }
        const handleDeleteClick1 = (accountId) => {
            deletePaymentMethod(accountId).then(() => window.location.reload())
        }

        const handleViewClick1 = (accountId) => {
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
                <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 mb-3 g-3">
                    <StatCards backgroundColor={this.state.color1} text="TOTAL SHOPS" amount={this.state.totalShops} />
                    <StatCards backgroundColor={this.state.color2} text="TOTAL PAYMENT METHODS" amount={this.state.allPayments.length} />
                </div>
                <div className="settings-heading">
                    Shops
                </div>
                <div className="row row-cols-1 row-cols-xl-3 mb-3 g-3">
                    <div className="col">
                        <div className="shop-list">
                            <Table columns={allShopColumn} data={this.state.allShops} title="All Registered Shops" />
                        </div>
                    </div>
                    <div className="col">
                        <div className="shop-overview">
                            <div style={{ alignItems: "flex-start" }} className="card-title"> Shop Overview
                                <div className="payment-heading">
                                    {this.state.selectedShop.name}
                                    {this.state.selectedShop.name &&
                                        <div className="payment-subheading">
                                            {this.state.selectedShop.city}
                                        </div>}
                                </div>
                            </div>
                            <div className="row row-cols-1 row-cols-xl-2 g-3">
                                <div className="col-12">
                                    {!this.state.selectedShop.name &&
                                        <div className="payment-overview-empty">
                                            Please select any shop to view its overview
                                        </div>}
                                </div>
                                <div className="col">
                                    {this.state.selectedShop.name && <div className="payment-overview-stats">
                                        Rs. {this.state.selectedShopOverview.sum}
                                        <div className="payment-overview-stats-heading">TOTAL TRANSC. AMOUNT</div>
                                    </div>}
                                </div>
                                <div className="col">
                                    {this.state.selectedShop.name && <div className="payment-overview-stats">
                                        {this.state.selectedShopOverview.count}
                                        <div className="payment-overview-stats-heading">TOTAL TRANSACTIONS</div>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="shop-city-list">
                            <div className="card-title"> City-wise Shops </div>
                            <Table columns={cityWiseColumn} data={this.state.cityWiseShops} title="" />
                        </div>
                    </div>
                </div>
                <div className="settings-heading">
                    Payment Methods
                </div>
                <div className="row row-cols-1 row-cols-xl-3 mb-3 g-3">
                    <div className="col">
                        <div className="shop-list">
                            <Table columns={allPaymentColumn} data={this.state.allPayments} title="All Registered Payment Methods" />
                        </div>
                    </div>
                    <div className="col">
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
                            <div className="row row-cols-1 row-cols-xl-2 g-3">
                                <div className="col-12">
                                    {!this.state.selectedAccount.bankName &&
                                        <div className="payment-overview-empty">
                                            Please select any payment method to view its overview
                                        </div>}
                                </div>
                                <div className="col">
                                    {this.state.selectedAccount.bankName && <div className="payment-overview-stats">
                                        Rs. {this.state.selectedPaymentOverview.sum}
                                        <div className="payment-overview-stats-heading">TOTAL TRANSC. AMOUNT</div>
                                    </div>}
                                </div>
                                <div className="col">
                                    {this.state.selectedAccount.bankName && <div className="payment-overview-stats">
                                        {this.state.selectedPaymentOverview.count}
                                        <div className="payment-overview-stats-heading">TOTAL TRANSACTIONS</div>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="shop-city-list">
                            <div className="card-title"> Account-wise Payment Methods </div>
                            <Table columns={accountWiseColumn} data={this.state.accountWise} title="" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Settings