import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Cards.css"
import { Carousel } from 'react-responsive-carousel';
import AccountImage from "../Assets/bank.gif"

class AccountCards extends React.Component {
    render() {
        return (
            <div className="col">
                <div className="card-panel">
                    <div className="card-title"> Account Details </div>
                    {this.props.data.length === 0 && <div className="card-heading">No account added</div>}
                    <Carousel style={{ height: "400px" }} interval={10000} autoPlay infiniteLoop showThumbs={false} showIndicators={false} showStatus={false}>
                        {this.props.data.map(eachCard => {
                            return (
                                <div className="d-flex justify-content-around">
                                    <div>
                                        <img src={AccountImage} style={{ width: "325px" }} />
                                        <div className="card-heading">{eachCard.bankName} - {eachCard.accountType}</div>
                                    </div>
                                    <div>
                                        <div className="card-subheading">Total Balance: Rs. {eachCard.balance}</div>
                                        <div className="card-subheading">Total Debit: Rs. {eachCard.debit}</div>
                                        <div className="card-subheading">Total Credit: Rs. {eachCard.credit}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </Carousel>
                </div>
            </div>
        )
    }
}

export default AccountCards