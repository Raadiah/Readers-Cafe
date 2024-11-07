import { useContext, useEffect, useRef, useState } from "react"
import baseUrl, { SITES } from "../../routes/sites";
import toast from "react-hot-toast";
import { AuthContext } from "../../provider/AuthProvider";
import { FaCamera } from "react-icons/fa";
import Loader from "../../pages/Loader";

const EditUserModal = ({uid, email, name, phone, address, isAdmin, photoURL, fetchUsers})=>{
    const [showLoading, setShowLoading] = useState(false)
    const [newPicFile, setNewPicFile] = useState(null)
    const [newPicFileURL, setNewPicFileURL] = useState(photoURL)
    const {reloadUser} = useContext(AuthContext);
    const closeButtonRef = useRef(null)
    const cameraInputRef = useRef(null)

    const upload = ()=>{
        cameraInputRef.current?.click()
    }

    const handleFileChange = (e)=>{
        const newPicFile = e.target.files[0]
        const newPicFileURL = URL.createObjectURL(newPicFile)
        setNewPicFile(newPicFile)
        setNewPicFileURL(newPicFileURL)
    }

    const handleSaveImage = async()=>{
        if(!newPicFile) return photoURL;

        const imageHostKey = import.meta.env.VITE_APP_IMGBB_KEY;
        const imageUploadUrl = `${SITES.IMAGE_BB_SITE}?key=${imageHostKey}`;

        const imageData = new FormData(); 

        imageData.append('image', newPicFile);

        const imageUploadOnServer = await fetch(imageUploadUrl, {
            method: 'POST',
            body: imageData
        });
        
        const imgData = await imageUploadOnServer.json();

        if(imgData.success) {
            return imgData.data.url
        } else {
            toast.error('A problem occurred while trying to upload file. Updating remaining information...')
            return photoURL
        }
    }

    const handleSaveUser = async(event)=>{
        event.preventDefault()
        setShowLoading(true)

        const name = event.target.name.value
        const phone = event.target.phone.value
        const address = event.target.address.value
        const serverFileURL = await handleSaveImage()
        const userInfo = {name, phone, address, photoURL: serverFileURL}

        fetch(`${baseUrl}/user/${uid}`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(userInfo)
        })
        .then(res=>res.json())
        .then(data=>{
            setShowLoading(false)
            if(data?.acknowledged) {
                closeButtonRef.current?.click()
                toast.success("Succesfully updated user information")
                reloadUser(uid)
                if(fetchUsers) fetchUsers()
            } else {
                console.error("DB: Error while updating user");
            }
        })
    }
    
    return(
        <div className="modal-box w-full h-full">
            <h3 className="font-bold text-lg">Edit user - {name}</h3>
            <div className="my-8">
                <form onSubmit={handleSaveUser}>
                    <div className='grid grid-cols-3 gap-x-4 gap-y-2'>
                        <span className='col-span-1 font-semibold'>
                            <img src={newPicFileURL} className="h-24 w-24 rounded-full"></img>
                            <div className="flex justify-center">
                                <span 
                                className="
                                -mt-8 z-40 cursor-pointer
                                w-8 h-8 p-1 bg-white rounded-full shadow-sm border
                                tooltip tooltip-right" 
                                data-tip="Upload Photo">
                                    <button 
                                    type="button"
                                    className="" onClick={upload}><FaCamera></FaCamera></button>
                                    <input 
                                    ref={cameraInputRef} 
                                    onChange={handleFileChange}
                                    type="file"
                                    className="hidden"></input>
                                </span>
                            </div>
                        </span>
                        <span className='col-span-2 space-y-1'>
                            <p className="font-semibold">{name}</p>
                            <p className="italic">{email}</p>
                            <p>Role: {isAdmin?"Admin":"User"}</p>
                        </span>
                    </div>
                    <div className="divider"></div>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2'>
                        <span className='col-span-1 font-semibold'>Name</span>
                        <span className='col-span-1 md:col-span-2 flex'>
                            <input 
                            name="name" 
                            className="flex-1 border rounded-md h-8 p-1"
                            defaultValue={name}></input>
                        </span>
                        <span className='col-span-1 font-semibold'>Phone</span>
                        <span className='col-span-1 md:col-span-2 flex'>
                            <input 
                            name="phone" 
                            className="flex-1 border rounded-md h-8 p-1"
                            defaultValue={phone}></input>
                        </span>
                        <span className='col-span-1 font-semibold'>Address</span>
                        <span className='col-span-1 md:col-span-2 flex'>
                            <textarea 
                            name="address" 
                            defaultValue={address}
                            className="border border-black p-2 outline-none rounded-md flex-1 h-24"></textarea>
                        </span>
                    </div>
                    <div className="flex gap-2 items-center justify-center mt-8">
                        {
                            showLoading ? 
                            <Loader></Loader>
                            :
                            <>
                                <button 
                                type="submit"
                                className="button-primary-rc">
                                    Update
                                </button>
                            </>
                        }
                        <form method="dialog">
                            <button ref={closeButtonRef} className="btn btn-outline w-24">Close</button>
                        </form>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditUserModal