import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Cards.css"
import { Carousel } from 'react-responsive-carousel';
import CardImage from "../Assets/CardImage.gif"
import cardDetails from "../Utils/cardDetails.json"

class Cards extends React.Component {
    render() {
        return (
            <div className="col">
                <div className="card-panel">
                    <div className="card-title"> Card Details </div>
                    {cardDetails.length === 0 && <div className="card-heading">No credit card payment methods added</div>}
                    <Carousel style={{ height: "400px" }} interval={10000} infiniteLoop showThumbs={false} showIndicators={false} showStatus={false}>
                        {cardDetails.map(eachCard => {
                            return (
                                <div>
                                    <img src={CardImage} style={{ width: "200px" }} />
                                    <div className="card-heading">{eachCard.name}</div>
                                    <div className="card-subheading">{eachCard.number}</div>
                                    <div className="card-subheading">{eachCard.nameOnCard}</div>
                                    <div className="card-subheading">Expires on {eachCard.expiryDate}</div>
                                    <div className="card-subheading">{eachCard.cvv}</div>
                                </div>
                            )
                        })}
                    </Carousel>
                    {/* NOTE: This is the total expenditure not total unsettled amount. */}
                </div>
            </div>
        )
    }
}

export default Cards