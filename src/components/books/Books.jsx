import Book from "./Book";
import { useLoaderData } from "react-router-dom";

const Books = ()=>{
    const books = useLoaderData();
    window.scrollTo(0,0);

    return (
        <div id='bookList' className="lg:m-20 my-10 p-4 bg-white z-10 border ">
            <h1 className="text-center text-2xl font-bold p-8 mb-8">Check out our latest books!</h1>
            <div className="flex flex-wrap justify-around gap-6">
            {
                books?.map((book)=>(<Book key={book.id} {...book}></Book>))
            }
            </div>
        </div>
    )
}

export default Books