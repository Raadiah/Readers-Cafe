import { FaEdit } from "react-icons/fa"
import EditUserModal from "../user-management/EditUserModal"

const ProfileDetails = (user)=>{
    const {uid, phone, address} = user

    const handleUserEdit = () => {
        document.getElementById('edit_user_modal').showModal()
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row m-4 space-y-4 gap-4 md:w-1/2 md:m-auto p-4 border rounded-md shadow-md">
                <div className="flex-1 grid grid-cols-3 gap-y-2">
                    <span className="col-span-1 font-semibold">Phone</span>
                    <span className="col-span-2">{phone}</span>
                    <span className="col-span-1 font-semibold">Address</span>
                    <span className="col-span-2">{address}</span>
                </div>
                <div className="flex justify-center">
                    <button 
                    value={uid} 
                    className="btn w-60 md:w-32 bg-white text-teal-600 
                    hover:bg-teal-600 hover:text-white"
                    onClick={(event)=>handleUserEdit(event.target.value)}>
                        <FaEdit></FaEdit> Edit
                    </button>
                </div>
            </div>
            <dialog id="edit_user_modal" className="modal">
                <EditUserModal key={user?.uid} {...user}></EditUserModal>
            </dialog>
        </div>
    )
}

export default ProfileDetails