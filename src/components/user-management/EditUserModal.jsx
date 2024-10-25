import { useEffect, useState } from "react"
import baseUrl from "../../routes/sites";

const EditUserModal = ({uid})=>{
    const [user, setUser] = useState({
        _id: null,
        email: '',
        name: '',
        phone: '',
        address: '',
        isAdmin: false,
        photoURL: ''
    })

    const {_id, email, name, phone, address, isAdmin, photoURL} = user;
    const fetchUser = async()=>{
        try {
            const res = await fetch(
                `${baseUrl}/user/${uid}`
            );
            if (!res.ok) {
                throw new Error("Failed to fetch user data.");
            }
            const data = await res.json();
            setUser(data);
        } catch (error) {
            console.error("Error fetching user data:", error.message);
        }
    }

    const handleSaveUser = async()=>{

    }

    useEffect(()=>{
        fetchUser()
    }, [uid] )
    
    return(
        <div className="modal-box w-full h-full">
            <h3 className="font-bold text-lg">Edit user - {name}</h3>
            <div className="my-8">
                <form onSubmit={handleSaveUser}>
                    <div className='grid grid-cols-3 gap-x-4 gap-y-2'>
                        <span className='col-span-1 font-semibold'>
                            <img src={photoURL} className="h-24"></img>
                        </span>
                        <span className='col-span-2 space-y-1'>
                            <p className="font-semibold">{name}</p>
                            <p className="italic">{email}</p>
                            <p>Role: {isAdmin?"Admin":"User"}</p>
                        </span>
                    </div>
                    <div className="divider"></div>
                    <div className='grid grid-cols-3 gap-x-4 gap-y-2'>
                        <span className='col-span-1 font-semibold'>Phone</span>
                        <span className='col-span-2'>
                            <input 
                            name="phone" 
                            className="flex-1 border rounded-md h-8 p-1"
                            defaultValue={phone}></input>
                        </span>
                        <span className='col-span-1 font-semibold'>Address</span>
                        <span className='col-span-2 flex'>
                            <textarea 
                            name="deliveryAddress" 
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
                            <button className="btn btn-outline w-24">Close</button>
                        </form>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditUserModal