import { useContext } from "react"
import ImageSection from "./ImageSection"
import ProfileDetails from "./ProfileDetails"
import { AuthContext } from "../../provider/AuthProvider"
import { Helmet } from "react-helmet-async"

const Profile = ()=>{
    const {user} = useContext(AuthContext);
    const {name} = user
    
    return (
        <>
            <Helmet>
                <title>{name}</title>
            </Helmet>
            <div>
                <div>
                    <ImageSection {...user}></ImageSection>
                </div>
                <div className="p-4">
                    <ProfileDetails {...user}></ProfileDetails>
                </div>
            </div>
        </>
    )
}

export default Profile