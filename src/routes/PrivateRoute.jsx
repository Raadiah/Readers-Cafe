import { useContext } from "react"
import { AuthContext } from "../provider/AuthProvider"
import { Navigate } from "react-router-dom";
import { ROUTES } from ".";

const PrivateRoute = ({children})=>{
    const {user} = useContext(AuthContext);

    if(user) return children;

    return <Navigate to={ROUTES.LOGIN}></Navigate>
}

export default PrivateRoute