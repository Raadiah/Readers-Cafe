const User = ({displayName, photoURL, showNameOnSmallDevice})=>{
    const displayPhotoUrl = photoURL || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png";
    return (
        <div className="flex items-center mr-2 gap-2">
            <img className="w-8 rounded-full" title={displayName} src={displayPhotoUrl} alt="" />
            {
                showNameOnSmallDevice ? 
                <span className="text-sm">{displayName}</span>
                :
                <span className="text-sm hidden lg:flex">{displayName}</span>
            }
        </div>
    )
}

export default User