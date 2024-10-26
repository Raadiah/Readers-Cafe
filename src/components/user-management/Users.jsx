import { useLoaderData } from "react-router-dom"
import Title from "../dashboard/Title"
import { FaEdit } from "react-icons/fa";
import { FaShield } from "react-icons/fa6";
import User from "../common/User";
import EditUserModal from "./EditUserModal";
import { useState } from "react";
import baseUrl from "../../routes/sites";
import toast from "react-hot-toast";

const Users = ()=>{
    const [selectedUser, setSelectedUser] = useState(null);
    const users = useLoaderData();
    const tableColumns = ['Name', 'Email', 'Role', 'Action'];
    const tableColumnsClass = ['text-start min-w-72', 'text-start min-w-24', 'min-w-24', ''];

    const handleUserEdit = (id) => {
        const user = users.find(({uid})=>uid==id);
        setSelectedUser(user);
        document.getElementById('edit_user_modal').showModal()
    }

    const handleUserRole = (id) => {
        const user = users.find(({uid})=>uid==id);
        const isAdmin = user.isAdmin ? false : true
        const userInfo = {isAdmin} 

        fetch(`${baseUrl}/user/${id}`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(userInfo)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data?.acknowledged) {
                toast.success("Successfully updated user role")
            } else {
                console.error("DB: Error while updating user role");
            }
        })
    }

    return(<div className="p-8">
        <Title title={'User List'}></Title>
        <div>
            <table className="w-full">
                <thead>
                    <tr>
                    {
                        tableColumns.map((tableColumn, index)=>{
                            return(<th key={index+1} className={`p-2 ${tableColumnsClass[index]}`}>{tableColumn}</th>)
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
                                    <td className="flex justify-center gap-2 my-2">
                                        <button value={uid} 
                                        onClick={(event)=>handleUserEdit(event.target.value)}
                                        className="btn bg-white border border-teal-600 text-teal-600 
                                        hover:bg-teal-600 hover:text-white">
                                            <FaEdit className="pointer-events-none"></FaEdit> Edit
                                        </button>
                                        <button value={uid} className={`btn w-32 p-2 ${isAdmin ? 'bg-lime-50 hover:bg-green-200' : 'bg-pink-50 hover:bg-violet-200'}`} onClick={(event)=>handleUserRole(event.target.value)}>
                                            <FaShield className="pointer-events-none"></FaShield> {isAdmin ? "Make User" : "Make Admin"}
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
            <EditUserModal key={selectedUser?.uid} {...selectedUser}></EditUserModal>
        </dialog>
    </div>)
}

export default Users