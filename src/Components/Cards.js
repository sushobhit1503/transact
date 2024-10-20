import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Cards.css"
import { Carousel } from 'react-responsive-carousel';
import CardImage from "../Assets/CardImage.gif"
import { allCardDetails } from "../Backend/paymentCalls";

class Cards extends React.Component {
    constructor () {
        super ()
        this.state = {
            allCards: []
        }
    }
    componentDidMount () {
        allCardDetails ().then (result => {
            this.setState ({allCards: result})
        })
    }
    render() {
        return (
            <div className="col">
                <div className="card-panel">
                    <div className="card-title"> Card Details </div>
                    {this.state.allCards.length === 0 && <div className="card-heading">No credit card payment methods added</div>}
                    <Carousel style={{ height: "400px" }} interval={10000} infiniteLoop showThumbs={false} showIndicators={false} showStatus={false}>
                        {this.state.allCards.map(eachCard => {
                            return (
                                <div>
                                    <img src={CardImage} alt="card" style={{ width: "200px" }} />
                                    <div className="card-heading">{eachCard.cardName}</div>
                                    <div className="card-subheading">{eachCard.cardNumber}</div>
                                    <div className="card-subheading">{eachCard.userName}</div>
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
