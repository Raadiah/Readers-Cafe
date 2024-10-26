import { useContext } from "react"
import { AuthContext } from "../provider/AuthProvider"
import PageNotFound from "../pages/PageNotFound";

const AdminRoute = ({children})=>{
    const {user} = useContext(AuthContext);
    const {isAdmin} = user

    if(isAdmin) return children;
    return <PageNotFound></PageNotFound>
}

export default AdminRoute