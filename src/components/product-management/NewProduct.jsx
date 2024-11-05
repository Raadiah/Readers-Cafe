import { useEffect, useState, useReducer } from "react";
import Title from "../dashboard/Title"
import toast from "react-hot-toast";
import baseUrl, { SITES } from "../../routes/sites";
import { FaSave } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import Loader from "../../pages/Loader";

const NewProduct = ()=>{
    const [categories, setCategories] = useState([]);
    const [loader, setLoader] = useState(false);
    const [formKey, updateForm] = useReducer(formKey=>formKey+1, 0)

    const [formData, setFormData] = useState({
        bookName: '',
        author: '',
        image: null,
        totalPages: '',
        category: '',
        tags: '',
        publisher: '',
        yearOfPublishing: null,
        price: null
    });

    const handleNewBook = async(event)=>{
        event.preventDefault();
        const image = formData.image;
        const imageHostKey = import.meta.env.VITE_APP_IMGBB_KEY;
        const imageUploadUrl = `${SITES.IMAGE_BB_SITE}?key=${imageHostKey}`;
        const imageData = new FormData();
        imageData.append('image', image);

        try {
            setLoader(true)
            const res = await fetch(imageUploadUrl, {
                method: 'POST',
                body: imageData
            });
            const imgData = await res.json();

            if (imgData.success) {
                const product = {
                    bookName: formData.bookName,
                    author: formData.author,
                    image: imgData.data.url,
                    totalPages: formData.totalPages,
                    category: formData.category,
                    tags: formData.tags?.length ? formData.tags?.split(',').slice(0, 3) : [],
                    publisher: formData.publisher,
                    yearOfPublishing: formData.yearOfPublishing,
                    price: formData.price,
                    postingTime: new Date(),
                    available: true
                };

                //Save product information to the database
                const result = await fetch(`${baseUrl}/product`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(product)
                });

                const data = await result.json();
                if (data.acknowledged) {
                    toast.success(`${formData.bookName} is added successfully`);
                    setLoader(false)
                    updateForm()
                    document.querySelector("#new-product-form").scrollIntoView( { behavior: 'smooth', block: 'start' } );;
                } else {
                    toast.error('Failed to add product.');
                    setLoader(false)
                }
            } else {
                toast.error('Image upload failed. Please try again.');
                setLoader(false)
            }
        } catch (error) {
            console.error('Failed to add product:', error);
            toast.error('An error occurred while adding the product.');
            setLoader(false)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${baseUrl}/categories`);
                const data = await res.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, [])

    return(
        <>
            <Helmet>
                <title>New Product</title>
            </Helmet>
            <div id="new-product-form" className="p-8">
                <Title title={'Add New Book'}></Title>
                <div>
                    <form key={formKey} className="p-8 rounded-lg border shadow-md" onSubmit={handleNewBook}>
                        <span className="text-base label-text">Book Name</span>
                        <label className="border p-2 rounded-lg flex items-center gap-2 my-2 ">
                            <input name="bookName" type="text" className="grow outline-none" onChange={handleInputChange} required/>
                        </label>
                        <span className="text-base label-text">Author</span>
                        <label className="border p-2 rounded-lg flex items-center gap-2 my-2 ">
                            <input name="author" type="text" className="grow outline-none" onChange={handleInputChange} required/>
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                            <div>
                                <span className="text-base label-text">Category</span>
                                <label className="border p-2 rounded-lg flex items-center gap-2 my-2 ">
                                    <select name="category" className="grow outline-none" onChange={handleInputChange} required>
                                        {categories.map(({_id, category})=>{
                                            return <option key={_id} value={category}>{category}</option>
                                        })}
                                    </select>
                                </label>
                            </div>
                            <div>
                                <span className="text-base label-text">Tags <span className="text-sm ml-2">(Maximum three, separated by comma)</span></span>
                                <label className="border p-2 rounded-lg flex items-center gap-2 my-2 ">
                                    <input name="tags" type="text" className="grow outline-none" onChange={handleInputChange} />
                            </label>
                            </div>
                            <div>
                                <span className="text-base label-text">Price</span>
                                <label className="border p-2 rounded-lg flex items-center gap-2 my-2 ">
                                    <input name="price" type="number" className="grow outline-none" onChange={handleInputChange} required/>
                                </label>
                            </div>
                            <div>
                                <span className="text-base label-text">Total Pages</span>
                                <label className="border p-2 rounded-lg flex items-center gap-2 my-2 ">
                                    <input name="totalPages" type="text" className="grow outline-none" onChange={handleInputChange} required/>
                                </label> 
                            </div>
                            <div>
                                <span className="text-base label-text">Publisher</span>
                                <label className="border p-2 rounded-lg flex items-center gap-2 my-2 ">
                                    <input name="publisher" type="text" className="grow outline-none" onChange={handleInputChange} required/>
                                </label>
                            </div>
                            <div>
                                <span className="text-base label-text">Year of Publishing</span>
                                <label className="border p-2 rounded-lg flex items-center gap-2 my-2 ">
                                    <input name="yearOfPublishing" type="number" min={1000} max={2024} className="grow outline-none" onChange={handleInputChange} required/>
                                </label>                        
                            </div>
                        </div>
                        <div>
                            <span className="text-base label-text">Image</span>
                            <label className="border p-2 rounded-lg flex items-center gap-2 my-2 ">
                                <input
                                onChange={handleFileChange}
                                type="file" className="grow outline-none" required/>
                            </label>
                        </div>
                        <div className="flex justify-center my-10">
                            {
                                loader ?
                                <Loader></Loader>
                                :
                                <button 
                                type="submit" 
                                className="btn bg-white border border-teal-600 text-teal-600 
                                hover:bg-teal-600 hover:text-white">
                                    <FaSave></FaSave>
                                    Save Product
                                </button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default NewProduct