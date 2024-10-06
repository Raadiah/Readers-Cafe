const User = ({displayName, photoURL})=>{
    return (
        <div className="flex items-center mr-4 gap-2">
            <img className="w-10 rounded-full" src={photoURL} alt="" />
            <span className="text-sm">{displayName}</span>
        </div>
    )
}

export default User