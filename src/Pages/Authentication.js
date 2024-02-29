import React from "react";

class Authentication extends React.Component {
    constructor() {
        super()
        this.state = {
            userId: "TransactPortal",
            password: "transact@0310",
            enteredUserId: "",
            enteredPassword: ""
        }
    }
    render() {
        const onSubmit = () => {
            const {userId, password, enteredPassword, enteredUserId} = this.state
            if (userId === enteredUserId && password === enteredPassword) {
                const object = {
                    access: true,
                    valid: new Date()
                }
                localStorage.setItem("adminAccess", JSON.stringify(object))
                window.location.href = "/"
            }
        }
        const onChange = (e) => {
            const {name, value} = e.target
            this.setState ({[name]: value})
        }
        return (
            <div className="px-xl-5 px-3 py-3 col-xl-4 col-12 m-auto">
                <div className="h1 card-title">Security Page</div>
                <div className="mb-3">
                    <div className="text-color mb-1">Enter Username</div>
                    <input placeholder="Enter username" onChange={onChange} value={this.state.enteredUserId} name="enteredUserId" />
                </div>
                <div className="mb-3">
                    <div className="text-color mb-1">Enter Password</div>
                    <input placeholder="Enter password" onChange={onChange} value={this.state.enteredPassword} name="enteredPassword" type="password" />
                </div>
                <button onClick={onSubmit} className="success-button">
                    Log in
                </button>
            </div>
        )
    }
}

export default Authentication