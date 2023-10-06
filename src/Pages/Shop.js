import React from "react";
import "./Shop.css"
import SettingsBar from "../Components/SettingsBar";
import StatCards from "../Components/StatCards";
import randomColor from "randomcolor";
import Table from "../Components/Table";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Visibility from '@material-ui/icons/Visibility'
import {deleteShop, getAllShops, getEachShop} from "../Backend/shopCalls"
import { calculateShopOverview, cityWiseColumn, getCityWiseShop } from "../ShopUtils";
import { getAllTransc } from "../Backend/transactionCalls";

class Shop extends React.Component {
    constructor() {
        super()
        this.state = {
            totalShops: 0,
            allShops: [],
            cityWiseShops: [],
            selectedShop: {},
            selectedShopOverview: {},
            color1: ""
        }
    }
    componentDidMount() {
        getAllShops.then(result => {
            this.setState({ totalShops: result.data.length, allShops: result.data, cityWiseShops: getCityWiseShop(result.data) })
        })
        this.setState({ color1: randomColor() })
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
                name: "_id",
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
                name: "_id",
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
        const handleDeleteClick = (accountId) => {
            deleteShop (accountId).then (() => window.location.reload())
        }

        const handleViewClick = (accountId) => {
            getEachShop (accountId).then(result => {
                this.setState({ selectedShop: result })
            })
            getAllTransc().then(result => {
                this.setState({ selectedShopOverview: calculateShopOverview(accountId, result) })
            })
        }

        return (
            <div>
                <SettingsBar />
                <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4">
                    <StatCards backgroundColor={this.state.color1} text="TOTAL SHOPS" amount={this.state.totalShops} />
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
                        <div className="payment-overview-container">
                            {!this.state.selectedShop.name && 
                            <div className="payment-overview-empty">
                                Please select any shop to view its overview
                            </div>}
                            {this.state.selectedShop.name && <div className="payment-overview-stats">
                                Rs. {this.state.selectedShopOverview.sum}
                                <div className="payment-overview-stats-heading">TOTAL TRANSC. AMOUNT</div>
                            </div>}
                            {this.state.selectedShop.name && <div className="payment-overview-stats">
                                {this.state.selectedShopOverview.count}
                                <div className="payment-overview-stats-heading">TOTAL TRANSACTIONS</div>
                            </div>}
                        </div>
                    </div>
                    <div className="shop-city-list">
                        <div className="card-title"> City-wise Shops </div>
                        <Table columns={cityWiseColumn} data={this.state.cityWiseShops} title="" />
                    </div>
                </div>
                <div className="shop-list">
                    <Table columns={allShopColumn} data={this.state.allShops} title="All Registered Shops" />
                </div>
            </div>
        )
    }
}

export default Shop