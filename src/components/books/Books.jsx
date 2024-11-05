import { Helmet } from "react-helmet-async";
import Book from "./Book";
import { useLoaderData, useParams } from "react-router-dom";
import CategoryMenu from "./category-navbar/categoryMenu";

const Books = ()=>{
    const books = useLoaderData();
    const { category } = useParams();
    window.scrollTo(0,0);

    return (
        <>
            <Helmet>
                <title>
                    {
                        category ? `${category} - Books` : "All Books"
                    }
                </title>
            </Helmet>
            <div className="p-4 py-10 md:px-20 flex justify-center">
                <CategoryMenu selectedCategory={category}></CategoryMenu>
            </div>
            <div id='bookList' className="flex flex-col items-center mx-auto mb-16 w-fit rounded-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-fit gap-6">
                {
                    books?.map((book)=>(<Book key={book._id} {...book}></Book>))
                }
                </div>
            </div>
        </>
    )
}

export default Books