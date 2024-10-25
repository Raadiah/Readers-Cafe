import { useLoaderData } from "react-router-dom"
import Title from "../dashboard/Title"
import { FaEdit } from "react-icons/fa";
import { FaShield } from "react-icons/fa6";
import User from "../common/User";
import EditUserModal from "./EditUserModal";
import { useState } from "react";

const Users = ()=>{
    const [selectedUser, setSelectedUser] = useState(null);
    const users = useLoaderData();
    const tableColumns = ['Name', 'Email', 'Role', 'Action'];
    const tableColumnsClass = ['text-start min-w-72', 'text-start min-w-24', 'min-w-24', ''];

    const handleUserEdit = (uid) => {
        setSelectedUser(uid);
        document.getElementById('edit_user_modal').showModal()
    }

    const handleUserRole = (id) => {
        alert(_id);
    }

    return(<div className="p-8">
        <Title title={'User List'}></Title>
        <div>
            <table>
                <thead>
                    <tr>
                    {
                        tableColumns.map((tableColumn, index)=>{
                            return(<th className={`p-2 ${tableColumnsClass[index]}`}>{tableColumn}</th>)
                        })
                    }
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(({_id, email, name, isAdmin, photoURL, uid})=>{
                            return(
                                <tr className="max-w-full">
                                    <td className="w-72 text-ellipsis p-2">
                                        <User key={_id} name={name} photoURL={photoURL} showNameOnSmallDevice={true}></User>
                                    </td>
                                    <td className="w-24 text-ellipsis p-2">{email}</td>
                                    <td className="w-24 text-ellipsis p-2 text-center">
                                        <div 
                                        className={`${(isAdmin ? "bg-pink-50" : "bg-lime-50")} text-xs rounded-2xl w-24 border px-2 py-1 overflow-hidden text-ellipsis cursor-default`}>
                                            {isAdmin ? 'Admin' : 'User'}
                                        </div>
                                    </td>
                                    <td className="flex gap-2">
                                        <button value={uid} className="btn" onClick={(event)=>handleUserEdit(event.target.value)}>
                                            <FaEdit></FaEdit> Edit
                                        </button>
                                        <button value={uid} className="btn" onClick={(event)=>handleUserRole(event.target.value)}>
                                            <FaShield></FaShield> Make Admin
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
        <dialog id="edit_user_modal" className="modal">
            <EditUserModal uid={selectedUser}></EditUserModal>
        </dialog>
    </div>)
}

export default Users