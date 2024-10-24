import { Link } from "react-router-dom"
import { ROUTES } from "../../../routes";

const Category = ({category})=>{
    return(
        <Link
        to={`${ROUTES.BOOKS}/${category}`}
        className="carousel-item w-52 h-44 z-20 flex justify-center items-center">
            <div className="w-52 h-44 shadow-inner
            flex justify-center items-center
            font-bold border border-black cursor-pointer rounded-lg
            hover:w-48 hover:h-40 hover:bg-green-50">
                {category}
            </div>
        </Link>
    )
}

export default Category