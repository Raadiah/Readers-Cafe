import { Link } from "react-router-dom"
import Rating from "../common/Rating"
import { FaDollarSign } from "react-icons/fa"

const Book = (book)=>{
    const {_id, bookName, author, image, tags, category, rating, price} = book

    return (
        <div className="card bg-base-100 max-w-72 shrink h-full shadow-xl">
            <figure className="h-32 bg-base-300">
                <img
                src={image}
                alt={bookName} />
            </figure>
            <div className="card-body">
                <div className="md:flex items-center justify-between">
                    <div className="font-bold text-xl text-ellipsis line-clamp-1 overflow-hidden mr-2">{ bookName }</div>
                    <div className="badge bg-pink-300 min-w-content text-ellipsis line-clamp-1">{category}</div>
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
                            tags.map(
                                (tag)=><span className="text-xs italic">#{tag}</span>
                            )
                        }
                    </p> 
                </div>
                <div className="flex justify-center mt-auto mb-2">
                    <Link 
                    className="btn min-w-fit w-4/5 bg-white border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white"
                    state={{book: book}} 
                    to={`/products/${_id}`}>Book Details</Link>
                </div>
            </div>
        </div>
    )
}

export default Book