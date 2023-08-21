import React from "react";
import "./StatCards.css"

class StatCards extends React.Component {
    render() {
        return (
            <div className="col">
                <div className="wave-card">
                    <div style={{ backgroundColor: `${this.props.backgroundColor}` }} className="wave-card-shape"></div>
                    <div style={{ backgroundColor: `${this.props.backgroundColor}` }} className="wave-card-shape"></div>
                    <div style={{ backgroundColor: `${this.props.backgroundColor}` }} className="wave-card-shape"></div>
                    <div className="wave-card-title">{this.props.amount}</div>
                    <small className="wave-card-subtitle">{this.props.text}</small>
                </div>
            </div>
        )
    }
}

export default StatCards