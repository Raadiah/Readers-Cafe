import { useEffect, useState } from "react";
import baseUrl from "../../../routes/sites";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../routes";

const CategoryMenu = ({selectedCategory})=>{
    const [categories, setCategories] = useState([]);
    const classNameStr = `w-fit min-w-20 h-8 p-1 px-2 overflow-hidden text-ellipsis cursor-pointer
        border border-green-600 rounded-lg text-xs flex items-center justify-center
        hover:bg-green-50 hover:scale-95`;

    const allCategorySelectedStr = selectedCategory ? '' : 'bg-green-100'
    
    const fetchCategories = async()=>{
        const categoryJson = await fetch(`${baseUrl}/categories`)
        const categories = await categoryJson.json()
        setCategories(categories)
    }

    useEffect(()=>{
        fetchCategories()
    }, [])

    return(<>
        <div className="flex flex-wrap items-center justify-center gap-2">
            <Link
            to={`${ROUTES.BOOKS}`}
            className={`${classNameStr} ${allCategorySelectedStr}`}>
                All
            </Link>
            {
                categories?.map(({category})=>{
                    const categoryUrl = category == 'All' ? '' : category;
                    const selectedCategoryStr = selectedCategory == category ? 'bg-green-100' : ''

                    return (
                        <>
                            <Link
                            to={`${ROUTES.BOOKS}/${categoryUrl}`}
                            className={`${classNameStr} ${selectedCategoryStr}`}>
                                {category}
                            </Link>
                        </>
                    )
                })
            }
        </div>
    </>)
}

export default CategoryMenu