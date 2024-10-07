import Book from "./Book";
import { useLoaderData } from "react-router-dom";

const Books = ()=>{
    const books = useLoaderData();

    return (
        <div id='bookList' className="pt-16">
            <h1 className="text-center text-xl font-semibold p-8">Check out our latest books!</h1>
            <div className="m-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {
                books?.map((book)=>(<Book key={book.id} {...book}></Book>))
            }
            </div>
        </div>
    )
}

export default Books