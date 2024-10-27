import { useLoaderData } from "react-router-dom"
import Title from "../dashboard/Title";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import EditProductModal from "./EditProductModal";
import { useState } from "react";
import baseUrl from "../../routes/sites";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const Products = ()=>{
    const [selectedProduct, setSelectedProduct] = useState(null)
    const products = useLoaderData();
    const tableColumns = ['Name', 'Author', 'Category', 'Price', 'Action'];
    const tableColumnsClass = ['text-start min-w-24', 'text-start min-w-30', 'min-w-24', 'min-w-24'];

    const handleEditProduct = (id)=>{
        const product = products.find(({_id})=>_id==id)
        setSelectedProduct(product)
        document.getElementById('edit_product_modal').showModal()
    }

    const handleDeleteProduct = async (id)=>{
        const available = false;
        const product = {available}

        const result = await fetch(`${baseUrl}/product/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(product)
        });

        const data = await result.json();
        if (data.acknowledged) {
            toast.success(`Product deleted successfully`);
        } else {
            toast.error('Failed to delete product.');
        }
    }

    return(
        <>
            <Helmet>
                <title>Product List</title>
            </Helmet>
            <div className="p-8">
                <Title title="All Books"></Title>
                <table className="w-full">
                    <thead>
                        <tr className="hidden lg:table-row">
                        {
                            tableColumns.map((tableColumn, index)=>{
                                return(<th key={index+1} className={`${tableColumnsClass[index]}`}>{tableColumn}</th>)
                            })
                        }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map(({_id, image, bookName, author, category, price})=>{
                                return(
                                    <tr key={_id} className="flex flex-col flex-none lg:table-row w-full gap-y-2 md:gap-y-4 lg:gap-y-2 divider-y">
                                        <td>
                                            <span className="flex items-center lg:w-60 gap-2">
                                                <img className="w-40 h-40 lg:w-8 lg:h-8" src={image}></img>
                                                <span className="text-2xl font-semibold lg:text-base lg:font-normal">{ bookName }</span>
                                            </span>
                                        </td>
                                        <td>
                                            <label className="text-lg lg:hidden font-semibold">Author: </label>
                                            <span className="text-lg lg:text-base">{author}</span>
                                        </td>
                                        <td className="lg:text-center">
                                            <label className="text-lg lg:hidden font-semibold">Category: </label>
                                            <span className="text-lg lg:hidden">{category}</span>
                                            <span 
                                            className="hidden lg:block text-xs rounded-2xl w-24 border p-2 overflow-hidden text-ellipsis bg-pink-50 cursor-default"
                                            title={category}>
                                            { category }
                                            </span>
                                        </td>
                                        <td className="lg:text-center">
                                            <label className="text-lg lg:hidden font-semibold">Price: </label>
                                            <span className="text-lg lg:text-base">${ price }</span>
                                        </td>
                                        <td className="flex lg:justify-center gap-2 mt-2 mb-4 border-b lg:border-none pb-2">
                                            <button 
                                            value={_id}
                                            onClick={(event)=>handleEditProduct(event.target.value)}
                                            className="btn bg-white border border-teal-600 text-teal-600 
                                            hover:bg-teal-600 hover:text-white">
                                                <FaEdit className="pointer-events-none"></FaEdit> Edit
                                            </button>
                                            <button 
                                            value={_id}
                                            onClick={(event)=>handleDeleteProduct(event.target.value)}
                                            className="btn bg-white border border-red-200 text-red-700 
                                            hover:bg-red-700 hover:text-white">
                                                <FaTrashCan className="pointer-events-none"></FaTrashCan> Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <dialog id="edit_product_modal" className="modal">
                    <EditProductModal key={selectedProduct?._id} {...selectedProduct}></EditProductModal>
                </dialog>
            </div>
        </>
    )
}

export default Products