import { useLoaderData } from "react-router-dom"
import Title from "../dashboard/Title";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

const Products = ()=>{
    const products = useLoaderData();
    const tableColumns = ['Name', 'Author', 'Category', 'Price', 'Action'];
    const tableColumnsClass = ['text-start min-w-60', 'text-start min-w-60', 'min-w-24', 'min-w-24'];

    return(
        <div className="p-8">
            <Title title="All Books"></Title>
            <table className="w-full">
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
                        products.map(({image, bookName, author, category, price})=>{
                            return(
                                <tr className="max-w-full">
                                    <td className="flex items-center gap-2">
                                        <img className="w-8 h-8" src={image}></img>
                                        { bookName }
                                    </td>
                                    <td>{ author }</td>
                                    <td className="text-center">
                                        <div 
                                        className="text-xs rounded-2xl w-24 border p-2 overflow-hidden text-ellipsis bg-pink-50 cursor-default"
                                        title={category}>
                                        { category }
                                        </div>
                                    </td>
                                    <td className="text-center">${ price }</td>
                                    <td className="justify-center flex gap-2 p-2">
                                        <button className="btn bg-white border border-teal-600 text-teal-600 
                                        hover:bg-teal-600 hover:text-white">
                                            <FaEdit></FaEdit> Edit
                                        </button>
                                        <button className="btn bg-white border border-red-200 text-red-700 
                                        hover:bg-red-700 hover:text-white">
                                            <FaTrashCan></FaTrashCan> Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Products