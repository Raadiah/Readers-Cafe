import { useLoaderData } from 'react-router-dom';
import Rating from "../common/Rating"
import { FaCartPlus, FaHeart, FaDollarSign } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useContext, useState } from 'react';
import BuyNowModal from './Buy/BuyNowModal';
import { AuthContext } from '../../provider/AuthProvider';
import baseUrl from '../../routes/sites';
import { Helmet } from 'react-helmet-async';

const BookDetails = ()=>{
    const {user} = useContext(AuthContext)
    const bookDetails = useLoaderData()
    const { _id, review, totalPages, publisher, yearOfPublishing, bookName, author, image, tags, category, rating, price } = bookDetails;
    const {uid, email} = user;
    window.scrollTo(0,0);

    const handleWishlist = async ()=> {
        const wishlistInfo = {
            user_uid: uid,
            email,
            bookId: _id,
            bookName,
            author,
            image,
            price
        }

        try{
            const result = await fetch(`${baseUrl}/wishlist`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(wishlistInfo)
            })
    
            const data = await result.json();
            if (data.acknowledged) {
                toast.success(`${bookName} has been successfully added to the Wishlist`);
            } else {
                toast.error('An error occurred while adding the book to the wishlist.');
            }
        } catch(error) {
            console.error('Failed to add product to wishlist:', error);
            toast.error('An error occurred while adding the book to the wishlist.');
        }
    }

    function handleBuyNow(){
        document.getElementById('buy_now_modal').showModal()
    }
    
    return (<>
        <Helmet>
            <title>{bookName}</title>
        </Helmet>
        <div className="hero max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl m-auto">
            <div className="border hero-content md:mt-24 md:mb-16 mx-auto bg-white rounded-md min-h-2/3 flex-col lg:flex-row shadow-lg">
                <img
                src={image}
                className="rounded-lg shadow-2xl max-h-96 max-w-72 md:max-w-96" />
                <div className='space-y-4'>
                    <h1 className="text-3xl font-bold">{bookName}</h1>
                    <h3 className="card-title">
                    {author}
                    </h3>
                    <div className="card-actions">  
                        <Rating ratingValue={rating}></Rating> 
                    </div>
                    {/* <p className='italic'>
                        "{review}"
                    </p> */}
                    <div className='grid grid-cols-3 gap-x-4'>
                        <span className='col-span-1 font-semibold'>Price</span>
                        <span className='col-span-2 font-semibold'>{price}</span>
                        <span className='col-span-1 font-semibold'>Category</span>
                        <span className='col-span-2'>{category}</span>
                        <span className='col-span-1 font-semibold'>Tags</span>
                        <span className='col-span-2'>{tags?.length ? tags.join(', ') : 'No tag given'}</span>
                        <span className='col-span-1 font-semibold'>Total Pages</span>
                        <span className='col-span-2'>{totalPages}</span>
                        <span className='col-span-1 font-semibold'>Publisher</span>
                        <span className='col-span-2'>{publisher}</span>
                        <span className='col-span-1 font-semibold'>Year of Publishing</span>
                        <span className='col-span-2'>{yearOfPublishing}</span>
                    </div>
                    <div className='flex justify-start'>
                        {/* <button onClick={handleWishlist} className="btn btn-outline">
                            <FaHeart></FaHeart>
                            Wish to Read
                        </button> */}
                        <button 
                        onClick={handleBuyNow} 
                        className="button-primary-rc">
                            <FaCartPlus></FaCartPlus>
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <dialog id="buy_now_modal" className="modal">
            <BuyNowModal {...bookDetails}></BuyNowModal>
        </dialog>
    </>)
}

export default BookDetails