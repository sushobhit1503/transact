import React from "react";
import "./SettingsBar.css"
import SelectSearch from "react-select-search";
import { UilChannelAdd } from '@iconscout/react-unicons'
import { UilFilePlusAlt } from '@iconscout/react-unicons'
import { UilFolderPlus } from '@iconscout/react-unicons'
import { UilPlusSquare } from '@iconscout/react-unicons'
import { UilStore } from '@iconscout/react-unicons'
import { UilCreditCardSearch } from '@iconscout/react-unicons'
import SkyLight from "react-skylight";
import axios from "axios";
import { baseUrl } from "../index"
import Switch from "react-switch"
import { accountTypeOptions, shopCityOptions, categoryOptions } from "../constants";
import { createNewAccount, getEachAccount } from "../Backend/accountCalls"
import { getEachLedger } from "../Backend/ledgerCalls"

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
            creditPerson: "",
            lent: false
        }
    }
    async componentDidMount() {
        const url = window.location.href
        var name = url.split("/").pop()
        if (name === "")
            name = "dashboard"
        this.setState({ activeMenu: name })

        axios.get(`${baseUrl}/account/all`).then(result => {
            let accountsOptions = []
            result.data.map(eachAccountData => {
                let eachAccount = {
                    name: `${eachAccountData.bankName} - ${eachAccountData.accountType}`,
                    value: eachAccountData.uid
                }
                accountsOptions.push(eachAccount)
            })
            this.setState({ allAccounts: accountsOptions })
        })

        axios.get(`${baseUrl}/ledger/all`).then(result => {
            let ledgerOptions = []
            result.data.map(eachLedgerData => {
                let eachLedger = {
                    name: eachLedgerData.name,
                    value: eachLedgerData.uid
                }
                ledgerOptions.push(eachLedger)
            })
            this.setState({ allLedgers: ledgerOptions })
        })

        axios.get(`${baseUrl}/shops`).then(result => {
            let shopsOptions = []
            result.data.map(eachShopData => {
                let eachShop = {
                    name: eachShopData.name,
                    value: eachShopData.uid
                }
                shopsOptions.push(eachShop)
            })
            this.setState({ allShops: shopsOptions })
        })

        axios.get(`${baseUrl}/payment`).then(result => {
            let paymentOptions = []
            result.data.map(eachPaymentData => {
                let eachPayment = {
                    name: eachPaymentData.paymentMethodName,
                    value: eachPaymentData.uid
                }
                paymentOptions.push(eachPayment)
            })
            this.setState({ allPayments: paymentOptions })
        })

        getEachAccount(localStorage.getItem("account")).then(result => {
            this.setState({ selectedAccountName: `${result.bankName} - ${result.accountType}` })
        })
        getEachLedger(localStorage.getItem("ledger")).then(result => {
            this.setState ({selectedLedgerName: result.name})
        })

    }
    render() {
        const onChange = (event) => {
            const { name, value } = event.target
            this.setState({ [name]: value })
        }
        const onCreateAccount = () => {
            const data = {
                bankName: this.state.bankName,
                accountType: this.state.accountType
            }
            const success = createNewAccount(data)
            if (success === 200)
                window.location.reload()
        }
        const onLedgerCreate = () => {
            const data = {
                name: this.state.ledgerName,
                purpose: this.state.ledgerPurpose,
                account: this.state.ledgerAccount,
                active: true
            }
            axios.post(`${baseUrl}/ledger`, data).then(() => {
                window.location.reload()
            }).catch((err) => console.log(err.message))
        }
        const onShopCreate = () => {
            const data = {
                name: this.state.shopName,
                city: this.state.shopCity
            }
            axios.post(`${baseUrl}/shops`, data).then(() => {
                window.location.reload()
            }).catch((err) => console.log(err.message))
        }
        const onPaymentCreate = () => {
            const data = {
                paymentMethodName: this.state.paymentName,
                account: this.state.selectedAccount
            }
            axios.post(`${baseUrl}/payment`, data).then(() => {
                window.location.reload()
            }).catch((err) => console.log(err.message))
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
            axios.post(`${baseUrl}/transaction`, data).then(() => {
                window.location.reload()
            }).catch((err) => console.log(err.message))
        }
        return (
            <div>
                <div className="settings-container">
                    <div className="settings-heading">
                        {this.state.activeMenu.toUpperCase()}
                    </div>
                    <div className="settings-panel">
                        <div onClick={() => this.transactionModal.show()} className="settings-add-button">
                            <UilFilePlusAlt />
                        </div>
                        <div onClick={() => this.shopModal.show()} className="settings-add-button">
                            <UilStore />
                        </div>
                        <div onClick={() => this.paymentModal.show()} className="settings-add-button">
                            <UilCreditCardSearch />
                        </div>
                        <div onClick={() => this.ledgerModal.show()} className="settings-add-button">
                            <UilChannelAdd />
                        </div>
                        <div onClick={() => this.accountModal.show()} className="settings-add-button">
                            <UilFolderPlus />
                        </div>
                    </div>
                </div>
                <SkyLight hideOnOverlayClicked ref={ref => this.transactionModal = ref} title="CREATE TRANSACTION">
                    <div className="settings-modify-modal">
                        <div className="settings-input-style">
                            <div className="settings-label">Item Name:</div>
                            <input onChange={onChange} value={this.state.itemName} name="itemName" placeholder="Enter item Name" />
                        </div>
                        <div className="settings-input-style">
                            <div className="settings-label">Shop Name:</div>
                            <SelectSearch onChange={(value) => { this.setState({ shopName: value }) }} search options={this.state.allShops} name="shopName" value={this.state.shopName} placeholder="Select Shop" />
                        </div>
                        <div className="settings-input-style">
                            <div className="settings-label">Date:</div>
                            <input onChange={onChange} value={this.state.date} name="date" placeholder="Enter the date" type="date" />
                        </div>
                    </div>
                    <div className="settings-modify-modal">
                        <div className="settings-input-style">
                            <div className="settings-label">Amount:</div>
                            <input onChange={onChange} value={this.state.amount} name="amount" placeholder="Enter Amount" />
                        </div>
                        <div className="settings-input-style">
                            <div className="settings-label">Payment Method:</div>
                            <SelectSearch onChange={(value) => { this.setState({ paymentMethod: value }) }} search options={this.state.allPayments} value={this.state.paymentMethod} name="paymentMethod" placeholder="Select Payment Method" />
                        </div>
                        <div className="settings-input-style">
                            <div className="settings-label">Category:</div>
                            <SelectSearch onChange={(value) => { this.setState({ category: value }) }} search options={categoryOptions} value={this.state.category} name="category" placeholder="Select Category" />
                        </div>
                    </div>
                    <div className="settings-modify-modal">
                        <div className="settings-input-style">
                            <div className="settings-label">Account:</div>
                            <SelectSearch onChange={(value) => { this.setState({ selectedAccount: value }) }} search options={this.state.allAccounts} value={this.state.selectedAccount} name="selectedAccount" placeholder="Select Account" />
                        </div>
                        <div className="settings-input-style">
                            <div className="settings-label">Ledger:</div>
                            <SelectSearch onChange={(value) => { this.setState({ selectedLedger: value }) }} search options={this.state.allLedgers} value={this.state.selectedLedger} name="selectedLedger" placeholder="Select Ledger" />
                        </div>
                    </div>
                    <div className="settings-modify-modal">
                        <div className="settings-input-style">
                            <div className="settings-label">Credit Transaction?</div>
                            <Switch onChange={(value) => this.setState({ credit: value })} checked={this.state.credit} />
                        </div>
                        <div className="settings-input-style">
                            <div className="settings-label">Money Given on Credit?</div>
                            <Switch onChange={(value) => this.setState({ lent: value })} checked={this.state.lent} />
                        </div>
                        {this.state.lent &&
                            <div className="settings-input-style">
                                <div className="settings-label">Person Name:</div>
                                <input onChange={onChange} value={this.state.creditPerson} name="creditPerson" placeholder="Enter the name of the person" />
                            </div>}
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <button onClick={onTransactionCreate} style={{ marginTop: "0rem" }} className="success-button">
                            CREATE TRANSACTION
                        </button>
                    </div>
                </SkyLight>
                <SkyLight hideOnOverlayClicked ref={ref => this.shopModal = ref} title="CREATE SHOP">
                    <div className="settings-modify-modal">
                        <div className="settings-input-style">
                            <div className="settings-label">Shop Name:</div>
                            <input onChange={onChange} value={this.state.shopName} name="shopName" placeholder="Enter Shop Name" />
                        </div>
                        <div className="settings-input-style">
                            <div className="settings-label">Location:</div>
                            <SelectSearch onChange={(value) => { this.setState({ shopCity: value }) }} search options={shopCityOptions} value={this.state.shopCity} name="shopCity" placeholder="Select Shop Location" />
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <button onClick={onShopCreate} className="success-button">
                            CREATE SHOP
                        </button>
                    </div>
                </SkyLight>
                <SkyLight hideOnOverlayClicked ref={ref => this.paymentModal = ref} title="CREATE PAYMENT METHOD">
                    <div className="settings-modify-modal">
                        <div className="settings-input-style">
                            <div className="settings-label">Payment Method Name:</div>
                            <input onChange={onChange} value={this.state.paymentName} name="paymentName" placeholder="Enter Payment Method Name" />
                        </div>
                        <div className="settings-input-style">
                            <div className="settings-label">Account:</div>
                            <SelectSearch onChange={(value) => { this.setState({ selectedAccount: value }) }} search options={this.state.allAccounts} value={this.state.selectedAccount} name="selectedAccount" placeholder="Select Account" />
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <button onClick={onPaymentCreate} className="success-button">
                            CREATE PAYMENT METHOD
                        </button>
                    </div>
                </SkyLight>
                <SkyLight hideOnOverlayClicked ref={ref => this.ledgerModal = ref} title="CREATE LEDGER">
                    <div className="settings-modify-modal">
                        <div className="settings-input-style">
                            <div className="settings-label">Ledger Name:</div>
                            <input onChange={onChange} value={this.state.ledgerName} name="ledgerName" placeholder="Enter Ledger Name" />
                        </div>
                        <div className="settings-input-style">
                            <div className="settings-label">Purpose:</div>
                            <input onChange={onChange} value={this.state.ledgerPurpose} name="ledgerPurpose" placeholder="Enter Ledger Purpose" />
                        </div>
                        <div className="settings-input-style">
                            <div className="settings-label">Linked Account:</div>
                            <SelectSearch onChange={(value) => { this.setState({ ledgerAccount: value }) }} search options={this.state.allAccounts} value={this.state.ledgerAccount} name="ledgerAccount" placeholder="Select Account" />
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <button onClick={onLedgerCreate} className="success-button">
                            CREATE LEDGER
                        </button>
                    </div>
                </SkyLight>
                <SkyLight hideOnOverlayClicked ref={ref => this.accountModal = ref} title="CREATE ACCOUNT">
                    <div className="settings-modify-modal">
                        <div className="settings-input-style">
                            <div className="settings-label">Bank Name:</div>
                            <input onChange={onChange} value={this.state.bankName} name="bankName" placeholder="Enter Bank Name" />
                        </div>
                        <div className="settings-input-style">
                            <div className="settings-label">Account Type:</div>
                            <SelectSearch onChange={(value) => { this.setState({ accountType: value }) }} value={this.state.accountType} search options={accountTypeOptions} name="accountType" placeholder="Select Account Type" />
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <button onClick={onCreateAccount} className="success-button">
                            CREATE ACCOUNT
                        </button>
                    </div>
                </SkyLight>
            </div>
        )
    }
}

export default SettingsBar