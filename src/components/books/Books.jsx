import { useState } from "react";
import apiCall from "../../utils/common/apiCall"
import Book from "./Book";
import { useEffect } from "react";

const Books = ()=>{
    const bookJsonUrl = '/books.json';
    const [books, setBooks] = useState([]);
    
    const getBookList = async () => {
        const books = await apiCall(bookJsonUrl);
        setBooks(books);
    };

    useEffect(() => {
        getBookList();
    }, []);

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