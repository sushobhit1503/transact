import React from "react";
import "./Accounts.css"
import SettingsBar from "../Components/SettingsBar";
import StatCards from "../Components/StatCards";
import randomColor from "randomcolor";
import axios from "axios";
import { baseUrl } from "../index";
import { calculateCurrentAccounts, calculateSavingAccounts, calculateTotalBanks, calculateAccountOverview, calculateAccountLedgers, calculateLedgerAccountOverview } from "../AccountUtils";
import Table from "../Components/Table";
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility'
import { getAllTransc, getTranscByAccount } from "../Backend/transactionCalls";
import { getEachAccount } from "../Backend/accountCalls";
import { getAllLedgers, getLedgersByAccount } from "../Backend/ledgerCalls";

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
            color1: "",
            color2: "",
            color3: "",
            color4: "",
            history: "Payment Method"
        }
    }
    componentDidMount() {
        axios.get(`${baseUrl}/account/all`).then(result => {
            const totalCurrent = calculateCurrentAccounts(result.data)
            const totalSaving = calculateSavingAccounts(result.data)
            const totalBanks = calculateTotalBanks(result.data)
            getAllTransc().then(allTransc => {
                const allAccounts = calculateAccountOverview(result.data, allTransc)
                this.setState({ totalBanks, totalCurrent, totalSaving, allAccounts })
            })
        })
        this.setState({ color1: randomColor(), color2: randomColor(), color3: randomColor(), color4: randomColor() })
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
                console.log(selectedAccountOverview);
                this.setState({ selectedAccountOverview })
            })
        }

        return (
            <div style={{ marginLeft: "20%" }}>
                <SettingsBar />
                <div className="stat-card-panel">
                    <StatCards backgroundColor={this.state.color1} text="TOTAL ACCOUNTS" amount={this.state.totalSaving + this.state.totalCurrent} />
                    <StatCards backgroundColor={this.state.color2} text="TOTAL SAVING ACCOUNTS" amount={this.state.totalSaving} />
                    <StatCards backgroundColor={this.state.color3} text="TOTAL CURRENT ACCOUNTS" amount={this.state.totalCurrent} />
                    <StatCards backgroundColor={this.state.color4} text="TOTAL BANKS" amount={this.state.totalBanks} />
                </div>
                <div className="graph-panel">
                    <div className="account-overview">
                        <Table columns={allAccountColumn} data={this.state.allAccounts} title="All Accounts" />
                    </div>
                    <div className="account-overview">
                        <div className="card-title"> Account Overview
                            <div className="payment-subheading">
                                <div>
                                    {this.state.selectedAccount?.bankName} - {this.state.selectedAccount.accountType}
                                </div>
                            </div>
                        </div>
                        <div className="account-overview-container">
                            {!this.state.selectedLedger[0] &&
                                <div className="payment-overview-empty">
                                    Please select any account to view its overview
                                </div>}
                            {this.state.selectedLedger[0] && <div className="payment-overview-stats">
                                {this.state.selectedAccountOverview.total}
                                <div className="payment-overview-stats-heading">TOTAL LEDGERS</div>
                            </div>}
                            {this.state.selectedLedger[0] && <div className="payment-overview-stats">
                                {this.state.selectedAccountOverview.totalActive}
                                <div className="payment-overview-stats-heading">ACTIVE</div>
                            </div>}
                            {this.state.selectedLedger[0] && <div className="payment-overview-stats">
                                {this.state.selectedAccountOverview.totalDeactive}
                                <div className="payment-overview-stats-heading">DE-ACTIVE</div>
                            </div>}
                        </div>
                        {this.state.selectedLedger[0] && <Table columns={allLedgerColumn} data={this.state.selectedLedger} title="All Ledgers" />}
                    </div>
                </div>
                <div className="graph-panel">
                    <div className="account-details">
                    </div>
                </div>
            </div>
        )
    }
}

export default Accounts