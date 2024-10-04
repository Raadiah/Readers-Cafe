import { useLocation } from 'react-router-dom';
import Rating from "../common/Rating"
import { FaCartPlus, FaHeart } from 'react-icons/fa';
import Toast from '../common/Toast';
import { useState } from 'react';

const BookDetails = ()=>{
    const [ toastMessage, setToastMessage ] = useState('');
    const { state } = useLocation();
    const { bookId, review, totalPages, publisher, yearOfPublishing, bookName, author, image, tags, category, rating } = state.book;
    window.scrollTo(0,0);

    function handleReadToast() {
        setToastMessage(`${bookId}${bookName} has been successfully added to the Wishlist`);
        showToastMessage();
    }

    function handleCartToast() {
        setToastMessage(`${bookId}${bookName} has been successfully added to the Cart`);
        showToastMessage();
    }

    function showToastMessage() {
        document.getElementById('toast').showModal()
    }
    
    return (
        <div className="hero min-w-fit max-h-screen">
            <dialog id="toast" className="modal">
                <Toast message={toastMessage}></Toast>
            </dialog>
            <div className="hero-content mt-16 md:mt-24 md:mb-16 mx-auto bg-white rounded-md min-h-2/3 lg:w-3/4 flex-col lg:flex-row">
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