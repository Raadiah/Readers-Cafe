import { Link } from "react-router-dom"
import { ROUTES } from "../../../routes";

const Category = ({category})=>{
    const categoryUrl = category == 'All' ? '' : category

    return(      
        <div 
        className="flex justify-center items-center
        carousel-item w-52 h-44 z-20">
            <Link
            to={`${ROUTES.BOOKS}/${categoryUrl}`}
            className="group card-body
            w-52 h-44 shadow-inner cursor-pointer
            flex justify-center items-center gap-4
            font-bold border border-black rounded-lg
            hover:bg-green-50 hover:scale-95 hover:shadow-xl">
                <h2 className="card-title">{category}</h2>
            </Link>
        </div>
    )
}

export default Category