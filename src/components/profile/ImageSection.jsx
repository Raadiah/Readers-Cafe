const ImageSection = ({name, photoURL, email})=>{
    return (
        <div>
            <div className="bg-blue-100 h-40 w-full shadow-sm"></div>
            <div className="flex justify-center">
                <img src={photoURL} className="-mt-24 w-44 h-44 rounded-full border z-30 bg-base-200"></img>
            </div>
            <div className="flex flex-col items-center gap-2 my-4">
                <span className="text-2xl">{name}</span>
                <span>{email}</span>
            </div>
        </div>
    )
}

export default ImageSection