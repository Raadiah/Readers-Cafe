import { useEffect, useState } from "react"
import baseUrl from "../../../routes/sites";
import SectionHeader from "../../common/SectionHeader";
import Category from "./Category";

const Categories = ()=>{
    const [categories, setCategories] = useState([]);
    
    const fetchCategories = async()=>{
        const categoryJson = await fetch(`${baseUrl}/categories`)
        const categories = await categoryJson.json()
        setCategories(categories)
    }

    useEffect(()=>{
        fetchCategories()
    }, [])

    return(
        <div className="p-4">
            <SectionHeader headerText="Find books by categories (Slide for more)"></SectionHeader>
            <div className="carousel rounded-box gap-4 max-w-full overflow-scroll p-4 z-40">
                <Category category="All"></Category>
                {
                    categories?.map((category)=><Category key={category._id}  {...category}></Category>)
                }
            </div>
        </div>
    )
}

export default Categories