import React from "react";
import "./SettingsBar.css"
import "./Sidebar.css"
import SelectSearch from "react-select-search";
import { UilChannelAdd, UilSetting, UilFilePlusAlt, UilFolderPlus, UilBars, UilStore, UilCreditCardSearch, UilCreateDashboard, UilUniversity, UilChannel, UilExchange } from '@iconscout/react-unicons'
import {SwipeableDrawer, Button, Box} from '@mui/material';
import Switch from "react-switch"
import { accountTypeOptions, shopCityOptions, categoryOptions } from "../constants";
import { createNewAccount, getAllAccounts } from "../Backend/accountCalls"
import { createNewLedger, getAllLedgers } from "../Backend/ledgerCalls"
import Logo from "../Assets/logo.png"
import { createNewShop, getAllShops } from "../Backend/shopCalls";
import { createNewPaymentMethod, getAllPaymentMethods } from "../Backend/paymentCalls";
import { createnewTransc } from "../Backend/transactionCalls";

class SettingsBar extends React.Component {
    constructor() {
        super()
        this.state = {
            activeMenu: "",
            allAccounts: [],
            allLedgers: [],
            allShops: [],
            allPayments: [],
            bankName: "",
            accountType: "",
            ledgerName: "",
            ledgerPurpose: "",
            ledgerAccount: "",
            selectedLedger: "",
            selectedAccount: "",
            selectedAccountName: "",
            selectedLedgerName: "",
            shopName: "",
            shopCity: "",
            paymentName: "",
            itemName: "",
            date: "",
            amount: 0,
            paymentMethod: "",
            category: "",
            credit: false,
            isCredit: false,
            creditPerson: "",
            lent: false,
            anchor: false
        }
    }
    async componentDidMount() {
        const url = window.location.href
        var name = url.split("/").pop()
        if (name === "")
            name = "dashboard"
        this.setState({ activeMenu: name })

        getAllAccounts().then(result => {
            let accountsOptions = []
            result.map(eachAccountData => {
                let eachAccount = {
                    name: `${eachAccountData.bankName} - ${eachAccountData.accountType}`,
                    value: eachAccountData._id
                }
                accountsOptions.push(eachAccount)
            })
            this.setState({ allAccounts: accountsOptions })
        })
        getAllLedgers ().then (result => {
            let ledgerOptions = []
            result.map(eachLedgerData => {
                let eachLedger = {
                    name: eachLedgerData.name,
                    value: eachLedgerData._id
                }
                if (eachLedgerData.active)
                    ledgerOptions.push(eachLedger)
            })
            this.setState({ allLedgers: ledgerOptions })
        })
        getAllShops ().then(result => {
            let shopsOptions = []
            result.map(eachShopData => {
                let eachShop = {
                    name: eachShopData.name,
                    value: eachShopData._id
                }
                shopsOptions.push(eachShop)
            })
            this.setState({ allShops: shopsOptions })
        })
        getAllPaymentMethods().then (result => {
            let paymentOptions = []
            result.map(eachPaymentData => {
                let eachPayment = {
                    name: eachPaymentData.paymentMethodName,
                    value: eachPaymentData._id
                }
                paymentOptions.push(eachPayment)
            })
            this.setState({ allPayments: paymentOptions })
        })
        // getEachAccount(localStorage.getItem("account")).then(result => {
        //     this.setState({ selectedAccountName: `${result.bankName} - ${result.accountType}` })
        // })
        // getEachLedger(localStorage.getItem("ledger")).then(result => {
        //     this.setState({ selectedLedgerName: result.name })
        // })

    }
    render() {
        const toggleDrawer = (open) => (event) => {
            if (
                event &&
                event.type === 'keydown' &&
                (event.key === 'Tab' || event.key === 'Shift')
            ) {
                return;
            }

            this.setState({ anchor: open })
        };
        const list = () => (
            <Box
                sx={{ width: 350, backgroundColor: "var(--primary-color)" }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}

            >
                <img alt="/logo" src={Logo} className="sidebar-logo" />
                <div className="sidebar-menu">
                    <div className={`sidebar-menu-item ${this.state.activeMenu === "" ? "sidebar-menu-item-active" : ""}`}>
                        <a style={{ display: "flex" }} className="sidebar-menu-item" href="/"> <UilCreateDashboard style={{ marginRight: "0.5rem" }} />Dashboard</a>
                    </div>
                    <div className={`sidebar-menu-item ${this.state.activeMenu === "transaction" ? "sidebar-menu-item-active" : ""}`}>
                        <a style={{ display: "flex" }} className="sidebar-menu-item" href="/transaction"> <UilExchange style={{ marginRight: "0.5rem" }} /> Transactions </a>
                    </div>
                    <div className={`sidebar-menu-item ${this.state.activeMenu === "account" ? "sidebar-menu-item-active" : ""}`}>
                        <a style={{ display: "flex" }} className="sidebar-menu-item" href="/account"><UilUniversity style={{ marginRight: "0.5rem" }} /> Accounts </a>
                    </div>
                    <div className={`sidebar-menu-item ${this.state.activeMenu === "ledger" ? "sidebar-menu-item-active" : ""}`}>
                        <a style={{ display: "flex" }} className="sidebar-menu-item" href="/ledger"><UilChannel style={{ marginRight: "0.5rem" }} /> Ledgers </a>
                    </div>
                    <div className={`sidebar-menu-item ${this.state.activeMenu === "settings" ? "sidebar-menu-item-active" : ""}`}>
                        <a style={{ display: "flex" }} className="sidebar-menu-item" href="/settings"><UilSetting style={{ marginRight: "0.5rem" }} /> Settings </a>
                    </div>
                </div>
            </Box>
        );
        const onChange = (event) => {
            const { name, value } = event.target
            this.setState({ [name]: value })
        }
        const onCreateAccount = () => {
            const data = {
                bankName: this.state.bankName,
                accountType: this.state.accountType
            }
            createNewAccount(data).then(() => {
                window.location.reload()
            })
        }
        const onLedgerCreate = () => {
            const data = {
                name: this.state.ledgerName,
                purpose: this.state.ledgerPurpose,
                account: this.state.ledgerAccount,
                active: true
            }
            createNewLedger(data).then(() => {
                window.location.reload()
            })
        }
        const onShopCreate = () => {
            const data = {
                name: this.state.shopName,
                city: this.state.shopCity
            }
            createNewShop(data).then (() => {
                window.location.reload()
            })
        }
        const onPaymentCreate = () => {
            const data = {
                paymentMethodName: this.state.paymentName,
                account: this.state.selectedAccount,
                isCredit: this.state.isCredit
            }
            createNewPaymentMethod(data).then (() => {
                window.location.reload()
            })
        }
        const onTransactionCreate = () => {
            const data = {
                itemName: this.state.itemName,
                shopName: this.state.shopName,
                amount: parseInt(this.state.amount),
                ledger: this.state.selectedLedger,
                account: this.state.selectedAccount,
                paymentMethod: this.state.paymentMethod,
                date: this.state.date,
                category: this.state.category,
                credit: this.state.credit,
                lent: this.state.lent,
                creditPerson: this.state.creditPerson
            }
            createnewTransc(data).then (() => {
                window.location.reload()
            })
        }
        return (
            <div>
                <div className="d-flex flex-xl-row flex-column align-items-center">
                    <React.Fragment>
                        <Button className="py-2 px-1 rounded ms-3" style={{ color: "var(--tertiary-color)", backgroundColor: "var(--text-color)" }} onClick={toggleDrawer(true)}>
                            <UilBars />
                        </Button>
                        <span className="settings-heading">
                            {this.state.activeMenu.toUpperCase()}
                        </span>
                        <SwipeableDrawer
                            style={{ backgroundColor: "var(--primary-color)" }}
                            anchor="left"
                            open={this.state.anchor}
                            onClose={toggleDrawer(false)}
                            onOpen={toggleDrawer(true)}
                        >
                            {list("left")}
                        </SwipeableDrawer>
                    </React.Fragment>
                    <div className="d-flex me-3 ms-auto my-3">
                        <div data-bs-toggle="modal" data-bs-target="#transactModal" className="settings-add-button">
                            <UilFilePlusAlt />
                        </div>
                        <div data-bs-toggle="modal" data-bs-target="#shopModal" className="settings-add-button">
                            <UilStore />
                        </div>
                        <div data-bs-toggle="modal" data-bs-target="#paymentModal" className="settings-add-button">
                            <UilCreditCardSearch />
                        </div>
                        <div data-bs-toggle="modal" data-bs-target="#ledgerModal" className="settings-add-button">
                            <UilChannelAdd />
                        </div>
                        <div data-bs-toggle="modal" data-bs-target="#accountModal" className="settings-add-button">
                            <UilFolderPlus />
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="accountModal" tabIndex="-1" role="dialog" aria-labelledby="accountModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="accountModalLabel">CREATE ACCOUNT</h5>
                            </div>
                            <div className="modal-body">
                                <div className="row row-cols-1 g-3">
                                    <div className="col">
                                        <div className="settings-label">Bank Name:</div>
                                        <input onChange={onChange} value={this.state.bankName} name="bankName" placeholder="Enter Bank Name" />
                                    </div>
                                    <div className="col">
                                        <div className="settings-label">Account Type:</div>
                                        <SelectSearch onChange={(value) => { this.setState({ accountType: value }) }} value={this.state.accountType} search options={accountTypeOptions} name="accountType" placeholder="Select Account Type" />
                                    </div>
                                </div>
                                {this.state.bankName && this.state.accountType ?
                                    <div className="d-flex justify-content-center">
                                        <button onClick={onCreateAccount} className="success-button">
                                            CREATE ACCOUNT
                                        </button>
                                    </div> : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="ledgerModal" tabIndex="-1" role="dialog" aria-labelledby="ledgerModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="accountModalLabel">CREATE LEDGER</h5>
                            </div>
                            <div className="modal-body">
                                <div className="row row-cols-1 g-3">
                                    <div className="col">
                                        <div className="settings-label">Ledger Name:</div>
                                        <input onChange={onChange} value={this.state.ledgerName} name="ledgerName" placeholder="Enter Ledger Name" />
                                    </div>
                                    <div className="col">
                                        <div className="settings-label">Purpose:</div>
                                        <input onChange={onChange} value={this.state.ledgerPurpose} name="ledgerPurpose" placeholder="Enter Ledger Purpose" />
                                    </div>
                                    <div className="col">
                                        <div className="settings-label">Linked Account:</div>
                                        <SelectSearch onChange={(value) => { this.setState({ ledgerAccount: value }) }} search options={this.state.allAccounts} value={this.state.ledgerAccount} name="ledgerAccount" placeholder="Select Account" />
                                    </div>
                                </div>
                                {this.state.ledgerName && this.state.ledgerPurpose && this.state.ledgerAccount ?
                                    <div className="d-flex justify-content-center">
                                        <button onClick={onLedgerCreate} className="success-button">
                                            CREATE LEDGER
                                        </button>
                                    </div> : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="paymentModal" tabIndex="-1" role="dialog" aria-labelledby="paymentModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="accountModalLabel">CREATE PAYMENT METHOD</h5>
                            </div>
                            <div className="modal-body">
                                <div className="row row-cols-1 g-3">
                                    <div className="col">
                                        <div className="settings-label">Payment Method Name:</div>
                                        <input onChange={onChange} value={this.state.paymentName} name="paymentName" placeholder="Enter Payment Method Name" />
                                    </div>
                                    <div className="col">
                                        <div className="settings-label">Account:</div>
                                        <SelectSearch onChange={(value) => { this.setState({ selectedAccount: value }) }} search options={this.state.allAccounts} value={this.state.selectedAccount} name="selectedAccount" placeholder="Select Account" />
                                    </div>
                                    <div className="col">
                                        <div className="settings-label">Credit Card?</div>
                                        <Switch onChange={(value) => this.setState({ isCredit: value })} checked={this.state.isCredit} />
                                    </div>
                                </div>
                                {this.state.paymentName && this.state.selectedAccount ?
                                    <div className="d-flex justify-content-center">
                                        <button onClick={onPaymentCreate} className="success-button">
                                            CREATE PAYMENT METHOD
                                        </button>
                                    </div> : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="shopModal" tabIndex="-1" role="dialog" aria-labelledby="shopModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="accountModalLabel">CREATE SHOP</h5>
                            </div>
                            <div className="modal-body">
                                <div className="row row-cols-1 g-3">
                                    <div className="col">
                                        <div className="settings-label">Shop Name:</div>
                                        <input onChange={onChange} value={this.state.shopName} name="shopName" placeholder="Enter Shop Name" />
                                    </div>
                                    <div className="col">
                                        <div className="settings-label">Location:</div>
                                        <SelectSearch onChange={(value) => { this.setState({ shopCity: value }) }} search options={shopCityOptions} value={this.state.shopCity} name="shopCity" placeholder="Select Shop Location" />
                                    </div>
                                </div>
                                {this.state.shopName && this.state.shopCity ?
                                    <div className="d-flex justify-content-center">
                                        <button onClick={onShopCreate} className="success-button">
                                            CREATE SHOP
                                        </button>
                                    </div> : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="transactModal" tabIndex="-1" role="dialog" aria-labelledby="transactModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="accountModalLabel">CREATE TRANSACTION</h5>
                            </div>
                            <div className="modal-body">
                                <div className="row row-cols-xl-2 g-3 row-cols-1">
                                    <div className="col">
                                        <div className="settings-label">Item Name:</div>
                                        <input onChange={onChange} value={this.state.itemName} name="itemName" placeholder="Enter item Name" />
                                    </div>
                                    <div className="col">
                                        <div className="settings-label">Shop Name:</div>
                                        <SelectSearch onChange={(value) => { this.setState({ shopName: value }) }} search options={this.state.allShops} name="shopName" value={this.state.shopName} placeholder="Select Shop" />
                                    </div>
                                    <div className="col">
                                        <div className="settings-label">Date:</div>
                                        <input onChange={onChange} value={this.state.date} name="date" placeholder="Enter the date" type="date" />
                                    </div>
                                    <div className="col">
                                        <div className="settings-label">Amount:</div>
                                        <input onChange={onChange} value={this.state.amount} name="amount" placeholder="Enter Amount" />
                                    </div>
                                    <div className="col">
                                        <div className="settings-label">Payment Method:</div>
                                        <SelectSearch onChange={(value) => { this.setState({ paymentMethod: value }) }} search options={this.state.allPayments} value={this.state.paymentMethod} name="paymentMethod" placeholder="Select Payment Method" />
                                    </div>
                                    <div className="col">
                                        <div className="settings-label">Category:</div>
                                        <SelectSearch onChange={(value) => { this.setState({ category: value }) }} search options={categoryOptions} value={this.state.category} name="category" placeholder="Select Category" />
                                    </div>
                                    <div className="col">
                                        <div className="settings-label">Account:</div>
                                        <SelectSearch onChange={(value) => { this.setState({ selectedAccount: value }) }} search options={this.state.allAccounts} value={this.state.selectedAccount} name="selectedAccount" placeholder="Select Account" />
                                    </div>
                                    <div className="col">
                                        <div className="settings-label">Ledger:</div>
                                        <SelectSearch onChange={(value) => { this.setState({ selectedLedger: value }) }} search options={this.state.allLedgers} value={this.state.selectedLedger} name="selectedLedger" placeholder="Select Ledger" />
                                    </div>
                                    <div className="col">
                                        <div className="settings-label">Credit Transaction?</div>
                                        <Switch onChange={(value) => this.setState({ credit: value })} checked={this.state.credit} />
                                    </div>
                                    <div className="col">
                                        <div className="settings-label">Money Given on Credit?</div>
                                        <Switch onChange={(value) => this.setState({ lent: value })} checked={this.state.lent} />
                                    </div>
                                    {this.state.lent &&
                                        <div className="col">
                                            <div className="settings-label">Person Name:</div>
                                            <input onChange={onChange} value={this.state.creditPerson} name="creditPerson" placeholder="Enter the name of the person" />
                                        </div>}
                                </div>
                                {this.state.itemName && this.state.shopName && this.state.date && this.state.amount && this.state.paymentMethod &&
                                    this.state.category && this.state.selectedAccount && this.state.selectedLedger ?
                                    <div className="d-flex justify-content-center">
                                        <button onClick={onTransactionCreate} style={{ marginTop: "0rem" }} className="success-button">
                                            CREATE TRANSACTION
                                        </button>
                                    </div> : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SettingsBar