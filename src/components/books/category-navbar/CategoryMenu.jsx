import { useEffect, useState } from "react";
import baseUrl from "../../../routes/sites";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../routes";

const CategoryMenu = ({selectedCategory})=>{
    const [categories, setCategories] = useState([]);
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
        <div className="carousel gap-2 flex-wrap justify-center">
            <Link
            to={`${ROUTES.BOOKS}`}
            className={`${allCategorySelectedStr}
                min-w-fit line-clamp-1 p-2 rounded-lg border hover:bg-lime-50`}>
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
                            className={`${selectedCategoryStr}
                                min-w-fit line-clamp-1 p-2 rounded-lg border hover:bg-lime-50`}>
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