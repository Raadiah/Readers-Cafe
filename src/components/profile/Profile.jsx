import { useContext } from "react"
import ImageSection from "./ImageSection"
import ProfileDetails from "./ProfileDetails"
import { AuthContext } from "../../provider/AuthProvider"

const Profile = ()=>{
    const {user} = useContext(AuthContext);
    
    return (
        <div>
            <div>
                <ImageSection {...user}></ImageSection>
            </div>
            <div className="p-4">
                <ProfileDetails {...user}></ProfileDetails>
            </div>
        </div>
    )
}

export default Profile