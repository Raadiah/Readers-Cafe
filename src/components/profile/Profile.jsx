import { useContext } from "react"
import ImageSection from "./ImageSection"
import ProfileDetails from "./ProfileDetails"
import { AuthContext } from "../../provider/AuthProvider"
import { useLoaderData } from "react-router-dom"

const Profile = ()=>{
    const {user} = useContext(AuthContext);
    
    return (
        <div>
            <div>
                <ImageSection {...user}></ImageSection>
            </div>
            <div>
                <ProfileDetails {...user}></ProfileDetails>
            </div>
        </div>
    )
}

export default Profile