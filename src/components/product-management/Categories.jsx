import { useLoaderData } from "react-router-dom";
import Title from "../dashboard/Title"
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { useState } from "react";
import baseUrl from "../../routes/sites";
import toast from "react-hot-toast";
import ErrorMessage from "../common/ErrorMessage";

const Categories = ()=>{
    const [newCategoryError, setNewCategoryError] = useState(false);
    const categories = useLoaderData();
    const tableColumns = ['Category', 'Action'];
    const tableColumnsClass = ['text-start min-w-60', 'min-w-24'];
    const categoryErrorMessage = 'Category already present';

    const checkDuplicateCategory = (newCategory)=>{
        if(categories.find(({category})=>category?.toLowerCase()==newCategory?.toLowerCase().replaceAll(" ", ""))) {
            setNewCategoryError(true)
        } else setNewCategoryError(false);
    }

    const handleNewCategoryInput = (event)=>{
        const { value:category } = event.target;
        checkDuplicateCategory(category)
    }

    const handleNewCategory = async (event)=>{
        event.preventDefault();
        const newCategory = event.target.category.value?.replaceAll(" ", "")
        const category = {
            category: newCategory
        }

        if(!category.category) return;

        if (newCategoryError) {
            toast.error(categoryErrorMessage);
            return;
        };

        const result = await fetch(`${baseUrl}/category`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(category)
        });

        const data = await result.json();
        if (data.acknowledged) {
            toast.success(`${category.category} is added successfully`);
        } else {
            toast.error('Failed to add category.');
        }
    }

    return(
        <div className="p-8">
            <Title title='Book Categories'></Title>
            <form onSubmit={handleNewCategory} className="mb-8">
                <div className="flex gap-2 mb-4">
                    <input 
                    name="category" 
                    className="w-96 border-2 p-2 rounded-lg"
                    onChange={handleNewCategoryInput}></input>
                    <button className="btn" type="submit">
                        Add New
                    </button>
                </div>
                {
                    newCategoryError && <div className="flex w-96 mb-8"><ErrorMessage message={categoryErrorMessage}></ErrorMessage></div> 
                }
            </form>
            <table>
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
                        categories.map(({_id, category})=>{
                            return(
                                <tr key={_id}>
                                    <td>{category}</td>
                                    <td className="flex gap-2">
                                        <button className="btn bg-green-200">
                                            <FaEdit></FaEdit> Edit
                                        </button>
                                        <button className="btn bg-red-700 text-white">
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

export default Categories