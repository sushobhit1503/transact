import React from "react";
import "./Payment.css"
import SettingsBar from "../Components/SettingsBar";
import StatCards from "../Components/StatCards";
import randomColor from "randomcolor";
import { deletePaymentMethod, getAllPaymentMethods } from "../Backend/paymentCalls";
import { accountWiseColumn, allPaymentColumn, calculatePaymentOverview, getAccountWisePayment } from "../PaymentUtils";
import { getEachAccount } from "../Backend/accountCalls";
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Visibility from '@material-ui/icons/Visibility'
import { getAllTransc } from "../Backend/transactionCalls";

const options = {
    print: false,
    download: false,
    selectableRowsHideCheckboxes: true,
    responsive: "standard",
    filterType: "dropdown",
    viewColumns: false
}

class Payment extends React.Component {
    constructor() {
        super()
        this.state = {
            allPayments: [],
            selectedPaymentOverview: {},
            selectedPayment: {},
            accountWise: [],
            color1: ""
        }
    }
    componentDidMount() {
        getAllPaymentMethods().then(result => {
            this.setState({ allPayments: result })
            this.setState({ accountWise: getAccountWisePayment(result) }, () => {
                this.state.accountWise.map(eachRecord => {
                    getEachAccount(eachRecord.account).then(accountName => {
                        eachRecord["account"] = `${accountName.bankName} - ${accountName.accountType}`
                    })
                })

                const temp = this.state.accountWise
                this.setState ({accountWise: temp})
                console.log(this.state.accountWise);
            })
        })
        this.setState({ color1: randomColor() })
    }
    getMuiTheme = () =>
        createTheme({
            components: {
                MUIDataTable: {
                    styleOverrides: {
                        root: {
                            backgroundColor: '#red',
                        },
                        paper: {
                            boxShadow: 'none',
                        },
                    },
                },
                MuiTableCell: {
                    styleOverrides: {
                        head: {
                            backgroundColor: 'var(--primary-color)',
                            color: "var(--text-color)",
                            fontWeight: "bold"
                        },
                        root: {
                            backgroundColor: 'var(--secondary-color)',
                            color: "var(--text-color)",
                            fontWeight: "bold"
                        }
                    },
                },
                MUIDataTableSelectCell: {
                    styleOverrides: {
                        headerCell: {
                            backgroundColor: 'blue',
                        },
                    },
                }
            }
        });

        
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
                name: "uid",
                label: "View",
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        const itemId = tableMeta.rowData[1]
                        return (
                            <IconButton onClick={() => handleViewClick(itemId)}>
                                <Visibility />
                            </IconButton>
                        )
                    }
                }
            },
            {
                name: "uid",
                label: "Delete",
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        const itemId = tableMeta.rowData[1]
                        return (
                            <IconButton onClick={() => handleDeleteClick(itemId)}>
                                <DeleteIcon />
                            </IconButton>
                        )
                    }
                }
            }
        ];

        const handleDeleteClick = (accountId) => {
            deletePaymentMethod (accountId).then (() => window.location.reload())
        }

        const handleViewClick = (accountId) => {
            getAllTransc ().then (result => {
                this.setState ({selectedPaymentOverview: calculatePaymentOverview (accountId, result)})
            })
        }

        return (
            <div style={{ marginLeft: "20%" }}>
                <SettingsBar />
                <div className="stat-card-panel">
                    <StatCards backgroundColor={this.state.color1} text="TOTAL PAYMENT METHODS" amount={this.state.allPayments.length} />
                    <div className="shop-overview">
                        <div className="card-title"> Payment Overview </div>
                        Show name and the number of transaction and amount of transaction done and the account to which it is linked
                        Rs. {this.state.selectedPaymentOverview.sum} Rs. {this.state.selectedPaymentOverview.count}
                    </div>
                    <div className="shop-city-list">
                        <div className="card-title"> Account-wise Payment Methods </div>
                        <ThemeProvider theme={this.getMuiTheme()}>
                            <MUIDataTable
                                data={this.state.accountWise}
                                columns={accountWiseColumn}
                                options={options}
                            />
                        </ThemeProvider>
                    </div>
                </div>
                <div className="shop-list">
                    <ThemeProvider theme={this.getMuiTheme()}>
                        <MUIDataTable
                            data={this.state.allPayments}
                            columns={allPaymentColumn}
                            options={options}
                            title="All Registered Payment Methods"
                        />
                    </ThemeProvider>
                </div>
            </div>
        )
    }
}

export default Payment