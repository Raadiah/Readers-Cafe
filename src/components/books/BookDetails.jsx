import { useLoaderData } from 'react-router-dom';
import Rating from "../common/Rating"
import { FaCartPlus, FaHeart, FaDollarSign } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useState } from 'react';

const BookDetails = ()=>{
    const [ toastMessage, setToastMessage ] = useState('');
    const { bookId, review, totalPages, publisher, yearOfPublishing, bookName, author, image, tags, category, rating, price } = useLoaderData();
    window.scrollTo(0,0);

    function handleReadToast() {
        toast.success(`${bookName} has been successfully added to the Wishlist`);
    }

    function handleCartToast() {
        toast.success(`${bookName} has been successfully added to the Cart`);
    }
    
    return (
        <div className="hero min-w-fit max-h-screen">
            <div className="border-2 border-black hero-content mt-16 md:mt-24 md:mb-16 mx-auto bg-white rounded-md min-h-2/3 lg:w-3/4 flex-col lg:flex-row">
                <img
                src={image}
                className="max-w-sm rounded-lg shadow-2xl" />
                <div className='space-y-4'>
                    <h1 className="text-3xl font-bold">{bookName}</h1>
                    <h3 className="card-title">
                    {author}
                    </h3>
                    <div className="card-actions">  
                        <Rating ratingValue={rating}></Rating> 
                    </div>
                    <p className='italic'>
                        "{review}"
                    </p>
                    <div className='grid grid-cols-3 gap-x-4'>
                        <span className='col-span-1 font-semibold'>Category</span>
                        <span className='col-span-2'>{category}</span>
                        <span className='col-span-1 font-semibold'>Tags</span>
                        <span className='col-span-2'>{tags.join(', ')}</span>
                        <span className='col-span-1 font-semibold'>Total Pages</span>
                        <span className='col-span-2'>{totalPages}</span>
                        <span className='col-span-1 font-semibold'>Publisher</span>
                        <span className='col-span-2'>{publisher}</span>
                        <span className='col-span-1 font-semibold'>Year of Publishing</span>
                        <span className='col-span-2'>{yearOfPublishing}</span>
                        <span className='col-span-1 font-semibold'>Price</span>
                        <span className='col-span-2 font-semibold'>{price}</span>
                    </div>
                    <div className='flex justify-center gap-4'>
                        <button onClick={handleReadToast} className="btn btn-outline">
                            <FaHeart></FaHeart>
                            Wish to Read
                        </button>
                        <button 
                        onClick={handleCartToast} 
                        className="btn bg-white border border-teal-600 text-teal-600 
                        hover:bg-teal-600 hover:text-white">
                            <FaCartPlus></FaCartPlus>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookDetails