import React from "react"
import "./Sidebar.css"
import Logo from "../Assets/logo.png"
import { UilCreateDashboard } from '@iconscout/react-unicons'
import { UilUniversity } from '@iconscout/react-unicons'
import { UilChannel } from '@iconscout/react-unicons'
import { UilExchange } from '@iconscout/react-unicons'
import { UilStore } from '@iconscout/react-unicons'
import { UilCreditCardSearch } from '@iconscout/react-unicons'

class Sidebar extends React.Component {
    constructor () {
        super ()
        this.state = {
            activeMenu: ""
        }
    }
    componentDidMount () {
        const url = window.location.href
        this.setState({activeMenu: url.split("/").pop()})
    }
    render () {
        return (
            <div className="sidebar-panel">
                <img alt="/logo" src={Logo} className="sidebar-logo" />
                <div className="sidebar-menu">
                    <div className={`sidebar-menu-item ${this.state.activeMenu === "" ? "sidebar-menu-item-active" : ""}`}>
                        <a style={{display:"flex"}} className="sidebar-menu-item" href="/"> <UilCreateDashboard style={{marginRight:"0.5rem"}} />Dashboard</a>
                    </div>
                    <div className={`sidebar-menu-item ${this.state.activeMenu === "transaction" ? "sidebar-menu-item-active" : ""}`}>
                        <a style={{display:"flex"}} className="sidebar-menu-item" href="/transaction"> <UilExchange style={{marginRight:"0.5rem"}} /> Transactions </a>
                    </div>
                    <div className={`sidebar-menu-item ${this.state.activeMenu === "account" ? "sidebar-menu-item-active" : ""}`}>
                        <a style={{display:"flex"}} className="sidebar-menu-item" href="/account"><UilUniversity style={{marginRight:"0.5rem"}} /> Accounts </a>
                    </div>
                    <div className={`sidebar-menu-item ${this.state.activeMenu === "ledger" ? "sidebar-menu-item-active" : ""}`}>
                        <a style={{display:"flex"}} className="sidebar-menu-item" href="/ledger"><UilChannel style={{marginRight:"0.5rem"}} /> Ledgers </a>
                    </div>
                    <div className={`sidebar-menu-item ${this.state.activeMenu === "shop" ? "sidebar-menu-item-active" : ""}`}>
                        <a style={{display:"flex"}} className="sidebar-menu-item" href="/shop"><UilStore style={{marginRight:"0.5rem"}} /> Shops </a>
                    </div>
                    <div className={`sidebar-menu-item ${this.state.activeMenu === "payment" ? "sidebar-menu-item-active" : ""}`}>
                        <a style={{display:"flex"}} className="sidebar-menu-item" href="/payment"><UilCreditCardSearch style={{marginRight:"0.5rem"}} /> Payment Methods </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Sidebar