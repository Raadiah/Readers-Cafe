import Book from "./Book";
import { useLoaderData } from "react-router-dom";

const Books = ()=>{
    const books = useLoaderData();
    window.scrollTo(0,0);

    return (
        <div id='bookList' className="flex flex-col items-center mx-auto my-20 w-fit p-8 bg-white z-10 border rounded-2xl">
            <h1 className="text-center text-xl font-bold mb-8">Check out our latest books!</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-fit gap-6">
            {
                books?.map((book)=>(<Book key={book.id} {...book}></Book>))
            }
            </div>
        </div>
    )
}

export default Books