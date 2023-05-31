import React from "react";
import"./Cards.css"

class Cards extends React.Component {
    render () {
        return (
            <div className="card-panel">
                <div className="card-title"> Card Details </div>
                Show the outstanding bill balance of all the credit payment methods here here
                If account is only selected show details of those in other tabs. If ledger and account is selected then show the details of ledger, if none is selected show details of all
            </div>
        )
    }
}

export default Cards