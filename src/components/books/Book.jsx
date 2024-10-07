import { Link } from "react-router-dom"
import Rating from "../common/Rating"

const Book = (book)=>{
    const {bookId, bookName, author, image, tags, category, rating} = book

    return (
        <div className="card bg-base-100 w-80 h-96 shadow-xl">
            <figure className="h-3/5 bg-base-300">
                <img
                src={image}
                alt={bookName} />
            </figure>
            <div className="card-body">
                <div className="flex items-center justify-between">
                    <div className="font-bold text-xl text-ellipsis line-clamp-1 overflow-hidden mr-2">{ bookName }</div>
                    <div className="badge bg-pink-300 min-w-content overflow-hidden">{category}</div>
                </div>
                <h3 className="card">
                {author}
                </h3>
                <div className="card-actions">  
                    <Rating ratingValue={rating}></Rating> 
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
                <div className="flex justify-center">
                    <Link 
                    className="btn btn-wide bg-white border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white"
                    state={{book: book}} 
                    to={`/products/${bookId}`}>Book Details</Link>
                </div>
            </div>
        </div>
    )
}

export default Book