import { useContext } from "react"
import ImageSection from "./ImageSection"
import ProfileDetails from "./ProfileDetails"
import { AuthContext } from "../../provider/AuthProvider"
import { useLoaderData } from "react-router-dom"

const Profile = ()=>{
    const {user} = useContext(AuthContext);
    const {profileDetails} = useLoaderData()
    console.log(user)
    return (
        <div>
            <div>
                <ImageSection {...user}></ImageSection>
            </div>
            <div>
                <ProfileDetails></ProfileDetails>
            </div>
        </div>
    )
}

export default Profile