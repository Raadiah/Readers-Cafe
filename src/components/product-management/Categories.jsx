import { useLoaderData } from "react-router-dom";
import Title from "../dashboard/Title"
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { useState } from "react";
import baseUrl from "../../routes/sites";
import toast from "react-hot-toast";
import ErrorMessage from "../common/ErrorMessage";
import { Helmet } from "react-helmet-async";

const Categories = ()=>{
    const [newCategoryError, setNewCategoryError] = useState(false);
    const categories = useLoaderData();
    const tableColumns = ['Category'];
    const tableColumnsClass = ['text-start min-w-60'];
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
        <>
            <Helmet>
                <title>Categories</title>
            </Helmet>
            <div className="p-8">
                <Title title='Book Categories'></Title>
                <form onSubmit={handleNewCategory} className="mb-8">
                    <div className="flex flex-wrap gap-2 mb-4">
                        <input 
                        name="category" 
                        className="w-96 border-2 p-2 rounded-lg"
                        onChange={handleNewCategoryInput}></input>
                        <button className="button-primary-rc" type="submit">
                            Add New
                        </button>
                    </div>
                    {
                        newCategoryError && <div className="flex w-full mb-8"><ErrorMessage message={categoryErrorMessage}></ErrorMessage></div> 
                    }
                </form>
                <table className="w-full">
                    <thead>
                        <tr className="hidden md:table-row">
                        {
                            tableColumns.map((tableColumn, index)=>{
                                return(<th key={index+1} className={`p-2 border-b border-double ${tableColumnsClass[index]}`}>{tableColumn}</th>)
                            })
                        }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories.map(({_id, category})=>{
                                return(
                                    <tr className="flex flex-col md:table-row" key={_id}>
                                        <td className="p-2 h-14 md:border-b">{category}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Categories