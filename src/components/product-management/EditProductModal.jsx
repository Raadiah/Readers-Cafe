import { useState, useEffect } from "react";
import baseUrl from "../../routes/sites";
import toast from "react-hot-toast";
import Loader from "../../pages/Loader";

const EditProductModal = ({_id, bookName, author, totalPages, publisher, category, tags, image, yearOfPublishing, price})=>{
    const [categories, setCategories] = useState([]);
    const [showLoading, setShowLoading] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(category)

    const tagString = tags?.join()

    const handleUpdateProduct = async(event)=>{
        event.preventDefault();

        const bookName = event.target.bookName.value;
        const author = event.target.author.value;
        const totalPages = event.target.totalPages.value;
        const category = selectedCategory;
        const tags = event.target.tags.value;
        const publisher = event.target.publisher.value;
        const yearOfPublishing = event.target.yearOfPublishing.value;
        const price = event.target.price.value;

        const product = {
            bookName,
            author,
            totalPages,
            category,
            tags: tags?.split(',').slice(0, 3),
            publisher: publisher,
            yearOfPublishing: yearOfPublishing,
            price: price,
        };

        setShowLoading(true)

        const result = await fetch(`${baseUrl}/product/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(product)
        });

        const data = await result.json();
        if (data.acknowledged) {
            toast.success(`${bookName} is updated successfully`);
            setShowLoading(false)
        } else {
            toast.error('Failed to update product.');
            setShowLoading(false)
        }
    }

    useEffect(() => {
        setShowLoading(true);
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${baseUrl}/categories`);
                const data = await res.json();
                setCategories(data);
                setShowLoading(false)
            } catch (error) {
                setShowLoading(false)
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, [])

    useEffect(()=>{
        setSelectedCategory(category)
    }, [category])

    return(<div className="modal-box">
        {
            showLoading ?
            <><Loader></Loader></>
            :
            <>
            <h3 className="font-bold text-lg">Edit book - {bookName}</h3>
            <div className="my-8">
                <form onSubmit={handleUpdateProduct}>
                    <div className='grid grid-cols-3 gap-x-4 gap-y-2'>
                        <span className='col-span-1 font-semibold'>
                            <img src={image} className="h-24"></img>
                        </span>
                        <span className='col-span-2'>
                            <p className="font-semibold">{bookName}</p>
                            <p>By {author}</p>
                            <p>Price: ${price}</p>
                        </span>
                    </div>
                    <div className="divider"></div>
                    <div className='grid grid-cols-3 gap-x-4 gap-y-2'>
                        <span className='col-span-1 font-semibold'>Name</span>
                        <span className='col-span-2 flex'>
                            <input 
                            name="bookName"
                            defaultValue={bookName}
                            className="grow p-1 border rounded-md"></input>
                        </span>
                        <span className='col-span-1 font-semibold'>Author</span>
                        <span className='col-span-2 flex'>
                            <input 
                            name="author"
                            defaultValue={author}
                            className="grow p-1 border rounded-md"></input>
                        </span>
                        <span className='col-span-1 font-semibold'>Total Pages</span>
                        <span className='col-span-2 flex'>
                            <input 
                            name="totalPages"
                            defaultValue={totalPages}
                            className="grow p-1 border rounded-md"></input>
                        </span>
                        <span className='col-span-1 font-semibold'>Category</span>
                        <span className='col-span-2 flex'>
                            <select 
                            name="category" 
                            value={selectedCategory}
                            onChange={(event)=>setSelectedCategory(event.target.value)}
                            className="grow border p-1 outline-none rounded-md" required>
                                {categories.map(({category, _id})=>{
                                    return <option key={_id} label={category} value={category}>{category}</option>
                                })}
                            </select>
                        </span>
                        <span 
                            className='col-span-1 font-semibold'>
                            Tags   <br />
                            <span className="text-xs font-light">(Maximum 3, seperate by commas)</span>
                        </span>
                        <span className='col-span-2 flex'>
                            <input 
                            name="tags" 
                            className="flex-1 border rounded-md h-8 p-1" 
                            type="text"
                            defaultValue={tagString}
                            ></input>
                        </span>
                        <span className='col-span-1 font-semibold'>Publisher</span>
                        <span className='col-span-2 flex'>
                            <input 
                            name="publisher"
                            defaultValue={publisher}
                            className="grow p-1 border rounded-md"></input>
                        </span>
                        <span className='col-span-1 font-semibold'>Year of Publishing</span>
                        <span className='col-span-2 flex'>
                            <input 
                            name="yearOfPublishing"
                            defaultValue={yearOfPublishing}
                            className="grow p-1 border rounded-md"></input>
                        </span>
                        <span className='col-span-1 font-semibold'>Price</span>
                        <span className='col-span-2 flex'>
                            <input 
                            name="price"
                            defaultValue={price}
                            className="grow p-1 border rounded-md"></input>
                        </span>
                    </div>
                    <div className="flex gap-2 items-center justify-center mt-8">
                        <button 
                        type="submit"
                        className="btn bg-white border border-teal-600 text-teal-600 
                        hover:bg-teal-600 hover:text-white">
                            Update
                        </button>
                        <form method="dialog">
                            <button className="btn btn-outline w-24">Close</button>
                        </form>
                    </div>
                </form>
            </div>
            </>
        }
    </div>)
}

export default EditProductModal