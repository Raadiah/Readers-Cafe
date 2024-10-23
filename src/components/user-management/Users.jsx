import { useLoaderData } from "react-router-dom"
import Title from "../dashboard/Title"
import { FaEdit } from "react-icons/fa";
import { FaShield } from "react-icons/fa6";
import User from "../common/User";

const Users = ()=>{
    const users = useLoaderData();
    const tableColumns = ['Name', 'Email', 'Role', 'Action'];
    const tableColumnsClass = ['text-start min-w-72', 'text-start min-w-24', 'min-w-24', ''];

    const handleUserEdit = (id) => {
        alert(_id);
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
                        users.map(({_id, email, name, isAdmin, photoURL})=>{
                            return(
                                <tr className="max-w-full">
                                    <td className="w-72 text-ellipsis p-2">
                                        <User key={email} displayName={name} photoURL={photoURL} showNameOnSmallDevice={true}></User>
                                    </td>
                                    <td className="w-24 text-ellipsis p-2">{email}</td>
                                    <td className="w-24 text-ellipsis p-2 text-center">
                                        <span className={`${(isAdmin ? "bg-pink-50" : "bg-lime-50")} p-2 text-xs rounded-3xl w-20`}>
                                            {isAdmin ? 'Admin' : 'User'}
                                        </span>
                                    </td>
                                    <td className="flex gap-2 p-2">
                                        <button className="btn" onClick={(id=_id)=>handleUserEdit(id)}>
                                            <FaEdit></FaEdit> Edit
                                        </button>
                                        <button className="btn" onClick={(id=_id)=>handleUserRole(id)}>
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
    </div>)
}

export default Users