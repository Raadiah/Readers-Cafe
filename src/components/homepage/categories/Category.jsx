const Category = ({category})=>{
    return(
        <div className="carousel-item z-20">
            <div className="w-52 h-44 
            flex justify-center items-center 
            font-bold border shadow-md cursor-pointer rounded-md">
                {category}
            </div>
        </div>
    )
}

export default Category