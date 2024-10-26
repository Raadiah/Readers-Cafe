import { useContext, useEffect, useRef, useState } from "react"
import baseUrl from "../../routes/sites";
import toast from "react-hot-toast";
import { AuthContext } from "../../provider/AuthProvider";

const EditUserModal = (user)=>{
    const {reloadUser} = useContext(AuthContext);
    const closeButtonRef = useRef(null)
    const {uid, email, name, phone, address, isAdmin, photoURL} = user;

    const handleSaveUser = async(event)=>{
        event.preventDefault()

        const name = event.target.name.value
        const phone = event.target.phone.value
        const address = event.target.address.value

        const userInfo = {name, phone, address}
        
        fetch(`${baseUrl}/user/${uid}`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(userInfo)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data?.acknowledged) {
                closeButtonRef.current?.click()
                toast.success("Successfully updated user")
                reloadUser(uid)
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
                            <img src={photoURL} className="h-24 rounded-full"></img>
                        </span>
                        <span className='col-span-2 space-y-1'>
                            <p className="font-semibold">{name}</p>
                            <p className="italic">{email}</p>
                            <p>Role: {isAdmin?"Admin":"User"}</p>
                        </span>
                    </div>
                    <div className="divider"></div>
                    <div className='grid grid-cols-3 gap-x-4 gap-y-2'>
                        <span className='col-span-1 font-semibold'>Name</span>
                        <span className='col-span-2 flex'>
                            <input 
                            name="name" 
                            className="flex-1 border rounded-md h-8 p-1"
                            defaultValue={name}></input>
                        </span>
                        <span className='col-span-1 font-semibold'>Phone</span>
                        <span className='col-span-2 flex'>
                            <input 
                            name="phone" 
                            className="flex-1 border rounded-md h-8 p-1"
                            defaultValue={phone}></input>
                        </span>
                        <span className='col-span-1 font-semibold'>Address</span>
                        <span className='col-span-2 flex'>
                            <textarea 
                            name="address" 
                            defaultValue={address}
                            className="border border-black p-2 outline-none rounded-md flex-1 h-24"></textarea>
                        </span>
                    </div>
                    <div className="flex gap-2 items-center justify-center mt-8">
                        <button 
                        type="submit"
                        className="btn bg-white border border-teal-600 text-teal-600 
                        hover:bg-teal-600 hover:text-white">
                            Update
                        </button>
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