import { Link } from "react-router-dom"
import Rating from "../common/Rating"
import { ROUTES } from "../../routes"
import { Helmet } from "react-helmet-async"

const Book = (book)=>{
    const {_id, bookName, author, image, tags, category, rating, price} = book

    return (
        <>
            <div className="card bg-base-100 max-w-72 shrink h-full shadow-xl">
                <figure className="h-32 bg-base-300">
                    <img
                    src={image}
                    alt={bookName} />
                </figure>
                <div className="card-body">
                    <div className="md:flex items-center justify-between">
                        <div className="font-bold text-xl text-ellipsis line-clamp-1 overflow-hidden mr-2">{ bookName }</div>
                        <Link 
                        to={`${ROUTES.BOOKS}/${category}`}
                        className="badge bg-pink-300 text-ellipsis line-clamp-1 cursor-pointer">{category}</Link>
                    </div>
                    <h3 className="card">
                    {author}
                    </h3>
                    <div className="flex flex-wrap justify-between">
                        <div className="card-actions">  
                            <Rating ratingValue={rating}></Rating> 
                        </div>
                        <div className="card-actions flex items-center text-lg font-semibold">  
                            ${price}
                        </div>
                    </div>
                    <div className="card-actions">  
                        <p className="justify-end flex flex-wrap gap-2">
                            {
                                tags?.length?
                                tags.map(
                                    (tag, index)=><span key={index+1} className="text-xs italic">#{tag}</span>
                                )
                                :
                                <span className="text-xs italic">No tag given</span>
                            }
                        </p> 
                    </div>
                    <div className="flex justify-center mt-auto mb-2">
                        <Link 
                        className="btn min-w-fit w-4/5 bg-white border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white"
                        state={{book: book}} 
                        to={`${ROUTES.BOOK_DETAIL}/${_id}`}>Book Details</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Book