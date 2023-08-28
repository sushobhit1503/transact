import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Cards.css"
import { Carousel } from 'react-responsive-carousel';
import CardImage from "../Assets/CardImage.gif"

class Cards extends React.Component {
    render() {
        return (
            <div className="col">
                <div className="card-panel">
                    <div className="card-title"> Card Details </div>
                    {this.props.data.length === 0 && <div className="card-heading">No credit card payment methods added</div>}
                    <Carousel style={{ height: "400px" }} interval={10000} autoPlay infiniteLoop showThumbs={false} showIndicators={false} showStatus={false}>
                        {this.props.data.map(eachCard => {
                            return (
                                <div>
                                    <img src={CardImage} style={{ width: "200px" }} />
                                    <div className="card-heading">{eachCard.paymentMethod}</div>
                                    <div className="card-subheading">Total Spent: Rs. {eachCard.totalAmount}</div>
                                </div>
                            )
                        })}
                    </Carousel>
                    NOTE: This is the total expenditure not total unsettled amount.
                </div>
            </div>
        )
    }
}

export default Cards