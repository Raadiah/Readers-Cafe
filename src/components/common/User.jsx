const User = ({displayName, photoURL})=>{
    return (
        <div className="flex items-center mr-2 gap-2">
            <img className="w-8 rounded-full" src={photoURL} alt="" />
            <span className="text-sm">{displayName}</span>
        </div>
    )
}

export default User