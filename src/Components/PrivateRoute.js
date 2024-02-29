import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
    const auth = JSON.parse(localStorage.getItem("adminAccess"));
    let isValid = false
    if (auth) {
        isValid = Math.abs(new Date() - new Date(auth.valid)) / 60000 < 60 && auth.access === true
    }
    return isValid ? <>{children}</> : <Navigate to="/login" />;
}

export default PrivateRoute