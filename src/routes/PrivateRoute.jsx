import { useContext } from "react"
import { AuthContext } from "../provider/AuthProvider"
import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from ".";

const PrivateRoute = ({children})=>{
    const {user} = useContext(AuthContext);
    const location = useLocation();

    if(user) return children;
    
    return <Navigate state={location?.pathname} to={ROUTES.LOGIN}></Navigate>
}

export default PrivateRoute