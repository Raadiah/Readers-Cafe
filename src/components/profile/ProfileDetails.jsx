const ProfileDetails = ({phone, address})=>{
    return (
        <div className="grid grid-cols-3 p-8 gap-y-2 w-1/2 border m-auto shadow-md">
            <span className="col-span-1">Phone</span>
            <span className="col-span-2">{phone}</span>
            <span className="col-span-1">Address</span>
            <span className="col-span-2">{address}</span>
        </div>
    )
}

export default ProfileDetails