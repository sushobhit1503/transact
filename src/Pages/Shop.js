import React from "react";
import "./Shop.css"
import SettingsBar from "../Components/SettingsBar";
import StatCards from "../Components/StatCards";
import randomColor from "randomcolor";
import axios from "axios";
import { baseUrl } from "../index";

class Shop extends React.Component {
    constructor() {
        super()
        this.state = {
            totalShops: 0,
            color1: ""
        }
    }
    componentDidMount() {
        axios.get(`${baseUrl}/shops`).then(result => {
            this.setState({ totalShops: result.data.length })
        })
        this.setState({ color1: randomColor() })
    }
    render() {
        return (
            <div style={{ marginLeft: "20%" }}>
                <SettingsBar />
                <div className="stat-card-panel">
                    <StatCards backgroundColor={this.state.color1} text="TOTAL SHOPS" amount={this.state.totalShops} />
                    <div className="shop-overview">
                        <div className="card-title"> Shop Overview </div>
                        Show name and the number of transaction and amount of transaction done
                    </div>
                    <div className="shop-city-list">
                        <div className="card-title"> City-wise Shops </div>
                        Show the list of all shop as per the city
                    </div>
                </div>
                <div className="shop-list">
                    <div className="card-title"> All Registered Shops </div>
                    Show the list of all shop along with edit, view and delete button
                </div>
            </div>
        )
    }
}

export default Shop