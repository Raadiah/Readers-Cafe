import { useState, useEffect, useRef } from "react";
import baseUrl, { SITES } from "../../routes/sites";
import toast from "react-hot-toast";
import Loader from "../../pages/Loader";
import { FaCamera } from "react-icons/fa";

const EditProductModal = ({_id, bookName, author, totalPages, publisher, category, tags, image, yearOfPublishing, price, fetchProducts} )=>{
    const [categories, setCategories] = useState([]);
    const [showLoading, setShowLoading] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(category)
    const [newPicFile, setNewPicFile] = useState(null)
    const [newPicFileURL, setNewPicFileURL] = useState(image)
    const closeButtonRef = useRef(null)
    const cameraInputRef = useRef(null)
    const tagString = tags?.join()

    const upload = ()=>{
        cameraInputRef.current?.click()
    }

    const handleFileChange = (e)=>{
        const newPicFile = e.target.files[0]
        const newPicFileURL = URL.createObjectURL(newPicFile)
        setNewPicFile(newPicFile)
        setNewPicFileURL(newPicFileURL)
    }

    const handleSaveImage = async()=>{
        if(!newPicFile) return image;

        const imageHostKey = import.meta.env.VITE_APP_IMGBB_KEY;
        const imageUploadUrl = `${SITES.IMAGE_BB_SITE}?key=${imageHostKey}`;

        const imageData = new FormData(); 

        imageData.append('image', newPicFile);

        const imageUploadOnServer = await fetch(imageUploadUrl, {
            method: 'POST',
            body: imageData
        });
        
        const imgData = await imageUploadOnServer.json();

        if(imgData.success) {
            return imgData.data.url
        } else {
            toast.error('A problem occurred while trying to upload file. Updating remaining information...')
            return image
        }
    }

    const handleUpdateProduct = async(event)=>{
        event.preventDefault();
        setShowLoading(true)

        const bookName = event.target.bookName.value;
        const author = event.target.author.value;
        const totalPages = event.target.totalPages.value;
        const category = selectedCategory;
        const tags = event.target.tags.value;
        const publisher = event.target.publisher.value;
        const yearOfPublishing = event.target.yearOfPublishing.value;
        const price = event.target.price.value;

        const serverFileURL = await handleSaveImage()

        const product = {
            bookName,
            author,
            totalPages,
            category,
            tags: tags?.length ? tags?.split(',').slice(0, 3) : [],
            publisher: publisher,
            yearOfPublishing: yearOfPublishing,
            price: price,
            image: serverFileURL
        };

        const result = await fetch(`${baseUrl}/product/${_id}`, { 
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(product)
        });

        const data = await result.json();
        if (data.modifiedCount===1) {
            toast.success(`${bookName} is updated successfully`);
            setShowLoading(false)
            closeButtonRef.current?.click()
            fetchProducts()
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
            <>
            <div className="flex flex-col items-center space-y-8">
                <Loader></Loader>
                <form method="dialog">
                    <button ref={closeButtonRef} className="btn btn-outline w-24">Close</button>
                </form>
            </div>
            </>
            :
            <>
            <h3 className="font-bold text-lg">Edit book - {bookName}</h3>
            <div className="my-8">
                <form onSubmit={handleUpdateProduct}>
                    <div className='grid grid-cols-3 gap-x-4 gap-y-2'>
                        <span className='col-span-1 font-semibold'>
                            <img src={newPicFileURL} className="h-24"></img>
                            <div className="flex justify-center">
                                <span 
                                className="
                                -mt-8 z-40 cursor-pointer
                                w-8 h-8 p-1 bg-white hover:bg-base-300 rounded-full shadow-sm border
                                tooltip tooltip-right" 
                                data-tip="Upload Photo">
                                    <button 
                                    type="button"
                                    className="" onClick={upload}><FaCamera></FaCamera></button>
                                    <input 
                                    ref={cameraInputRef} 
                                    onChange={handleFileChange}
                                    type="file"
                                    className="hidden"></input>
                                </span>
                            </div>
                        </span>
                        <span className='col-span-2'>
                            <p className="font-semibold">{bookName}</p>
                            <p>By {author}</p>
                            <p>Price: ${price}</p>
                        </span>
                    </div>
                    <div className="divider"></div>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2'>
                        <span className='col-span-1 font-semibold'>Name</span>
                        <span className='col-span-1 md:col-span-2 flex'>
                            <input 
                            name="bookName"
                            defaultValue={bookName}
                            className="flex-1 p-1 border rounded-md"></input>
                        </span>
                        <span className='col-span-1 font-semibold'>Author</span>
                        <span className='col-span-1 md:col-span-2 flex'>
                            <input 
                            name="author"
                            defaultValue={author}
                            className="flex-1 p-1 border rounded-md"></input>
                        </span>
                        <span className='col-span-1 font-semibold'>Total Pages</span>
                        <span className='col-span-1 md:col-span-2 flex'>
                            <input 
                            name="totalPages"
                            defaultValue={totalPages}
                            className="flex-1 p-1 border rounded-md"></input>
                        </span>
                        <span className='col-span-1 font-semibold'>Category</span>
                        <span className='col-span-1 md:col-span-2 flex'>
                            <select 
                            name="category" 
                            value={selectedCategory}
                            onChange={(event)=>setSelectedCategory(event.target.value)}
                            className="flex-1 border p-1 outline-none rounded-md" required>
                                {categories.map(({category, _id})=>{
                                    return <option key={_id} label={category} value={category}>{category}</option>
                                })}
                            </select>
                        </span>
                        <span 
                            className='col-span-1 font-semibold'>
                            Tags   <br />
                            <span className="text-xs font-light">(Maximum 3, seperated by commas)</span>
                        </span>
                        <span className='col-span-1 md:col-span-2 flex'>
                            <input 
                            name="tags" 
                            className="flex-1 border rounded-md h-8 p-1" 
                            type="text"
                            defaultValue={tagString}
                            ></input>
                        </span>
                        <span className='col-span-1 font-semibold'>Publisher</span>
                        <span className='col-span-1 md:col-span-2 flex'>
                            <input 
                            name="publisher"
                            defaultValue={publisher}
                            className="flex-1 p-1 border rounded-md"></input>
                        </span>
                        <span className='col-span-1 font-semibold'>Year of Publishing</span>
                        <span className='col-span-1 md:col-span-2 flex'>
                            <input 
                            name="yearOfPublishing"
                            defaultValue={yearOfPublishing}
                            className="flex-1 p-1 border rounded-md"></input>
                        </span>
                        <span className='col-span-1 font-semibold'>Price</span>
                        <span className='col-span-1 md:col-span-2 flex'>
                            <input 
                            name="price"
                            defaultValue={price}
                            className="flex-1 p-1 border rounded-md"></input>
                        </span>
                    </div>
                    <div className="flex gap-2 items-center justify-center mt-8">
                        <button 
                        type="submit"
                        className="button-primary-rc">
                            Update
                        </button>
                        <form method="dialog">
                            <button ref={closeButtonRef} className="btn btn-outline w-24">Close</button>
                        </form>
                    </div>
                </form>
            </div>
            </>
        }
    </div>)
}

export default EditProductModal