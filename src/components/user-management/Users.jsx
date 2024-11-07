import { useLoaderData } from "react-router-dom"
import Title from "../dashboard/Title"
import { FaEdit } from "react-icons/fa";
import { FaShield } from "react-icons/fa6";
import User from "../common/User";
import EditUserModal from "./EditUserModal";
import { useContext, useEffect, useState } from "react";
import baseUrl from "../../routes/sites";
import toast from "react-hot-toast";
import { AuthContext } from "../../provider/AuthProvider";
import { Helmet } from "react-helmet-async";

const Users = ()=>{
    const [selectedUser, setSelectedUser] = useState(null);
    const {user, reloadUser} = useContext(AuthContext);
    const [users, setUser] = useState([]);
    const loggedInUser_uid = user.uid;
    const tableColumns = ['Name', 'Email', 'Role', 'Action'];
    const tableColumnsClass = ['text-start min-w-24', 'text-start min-w-24', 'min-w-24', ''];

    const fetchUsers = async()=>{
        const usersJson = await fetch(`${baseUrl}/users`)
        const users = await usersJson.json()
        setUser(users)
    }

    const handleUserEdit = (id) => {
        const user = users.find(({uid})=>uid==id);
        setSelectedUser(user);
        document.getElementById('edit_user_modal').showModal()
    }

    const handleUserRole = (id) => {
        if(id==loggedInUser_uid) {
            toast.error('Cannot change your own role');
            return;
        }
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
                reloadUser(id)
            } else {
                console.error("DB: Error while updating user role");
            }
        })
    }

    useEffect(()=>{
        fetchUsers()
    }, [])

    return(
        <>
            <Helmet>
                <title>User List</title>
            </Helmet>
            <div className="p-8">
                <Title title={'User List'}></Title>
                <div>
                    <table className="w-full">
                        <thead>
                            <tr className="hidden lg:table-row">
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
                                        <tr key={_id} className="flex flex-col lg:table-row max-w-full">
                                            <td className="text-ellipsis p-2">
                                                <div className="flex items-center mr-2 gap-2">
                                                    <img className="w-32 h-32 lg:w-8 lg:h-8 rounded-full" title={name} src={photoURL} alt="" />
                                                    <span className="text-2xl lg:text-sm">{name}</span>
                                                </div>
                                            </td>
                                            <td className="w-24 text-ellipsis p-2 space-x-2">
                                                <label className="font-semibold lg:hidden">Email:</label>
                                                <span className="italic">{email}</span>
                                            </td>
                                            <td className="flex items-center lg:table-cell lg:w-24 text-ellipsis p-2 lg:text-center space-x-2">
                                                <label className="lg:hidden font-semibold">Role:</label>
                                                <div 
                                                className={`${(isAdmin ? "bg-pink-50" : "bg-lime-50")} lg:text-xs text-center rounded-2xl w-24 border px-2 py-1 overflow-hidden text-ellipsis cursor-default`}>
                                                    {isAdmin ? 'Admin' : 'User'}
                                                </div>
                                            </td>
                                            <td className="flex lg:justify-center gap-2 my-2 border-b lg:border-none pb-4 lg:pb-0">
                                                <button value={uid} 
                                                onClick={(event)=>handleUserEdit(event.target.value)}
                                                className="button-primary-rc">
                                                    <FaEdit className="pointer-events-none"></FaEdit> Edit
                                                </button>
                                                {
                                                    loggedInUser_uid == uid ?
                                                    <>
                                                        <button value={uid} className="btn cursor-auto w-32 p-2">
                                                            <FaShield className="pointer-events-none"></FaShield> {isAdmin ? "Make User" : "Make Admin"}
                                                        </button>
                                                    </>
                                                    :
                                                    <button value={uid} className={`btn w-32 p-2 ${isAdmin ? 'bg-lime-50 hover:bg-green-200' : 'bg-pink-50 hover:bg-violet-200'}`} onClick={(event)=>handleUserRole(event.target.value)}>
                                                        <FaShield className="pointer-events-none"></FaShield> {isAdmin ? "Make User" : "Make Admin"}
                                                    </button>
                                                }
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <dialog id="edit_user_modal" className="modal">
                    <EditUserModal 
                    key={selectedUser?.uid} 
                    {...selectedUser}
                    fetchUsers={fetchUsers}></EditUserModal>
                </dialog>
            </div>
        </>
    )
}

export default Users