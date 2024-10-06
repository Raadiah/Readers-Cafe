const User = ({displayName, photoURL})=>{
    const userPhotoURL = photoURL || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png";

    return (
        <div className="flex items-center mr-4 gap-2">
            <img className="w-10 rounded-full" src={userPhotoURL} alt="" />
            <span className="text-sm">{displayName}</span>
        </div>
    )
}

export default User