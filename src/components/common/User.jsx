const User = ({name, photoURL, showNameOnSmallDevice})=>{
    const displayPhotoUrl = photoURL || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png";
    return (
        <div className="flex items-center mr-2 gap-2">
            <img className="w-8 h-8 rounded-full" title={name} src={displayPhotoUrl} alt="" />
            {
                showNameOnSmallDevice ? 
                <span className="text-sm">{name}</span>
                :
                <span className="text-sm hidden lg:flex">{name}</span>
            }
        </div>
    )
}

export default User