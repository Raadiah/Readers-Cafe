import { FaEdit } from "react-icons/fa"
import EditUserModal from "../user-management/EditUserModal"

const ProfileDetails = ({uid, phone, address})=>{
    const handleUserEdit = () => {
        document.getElementById('edit_user_modal').showModal()
    }

    return (
        <div>
            <div className="grid grid-cols-3 p-4 gap-y-2 w-1/2 border m-auto shadow-md">
                <span className="col-span-3 flex justify-end">
                    <button 
                    value={uid} 
                    className="btn bg-white text-teal-600 
                        hover:bg-teal-600 hover:text-white"
                    onClick={(event)=>handleUserEdit(event.target.value)}>
                        <FaEdit></FaEdit> Edit
                    </button>
                </span>
                <span className="col-span-1">Phone</span>
                <span className="col-span-2">{phone}</span>
                <span className="col-span-1">Address</span>
                <span className="col-span-2">{address}</span>
            </div>
            <dialog id="edit_user_modal" className="modal">
                <EditUserModal uid={uid}></EditUserModal>
            </dialog>
        </div>
    )
}

export default ProfileDetails