import { useState } from "react";
import Title from "../dashboard/Title"
import toast from "react-hot-toast";
import baseUrl from "../../routes/sites";

const NewProduct = ()=>{
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
        const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        const imageData = new FormData();
        imageData.append('image', image);

        try {
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
                    tags: formData.tags?.split(',').slice(0, 3),
                    publisher: formData.publisher,
                    yearOfPublishing: formData.yearOfPublishing,
                    price: formData.price,
                    postingTime: new Date(),
                    available: true
                };

                console.log(product);

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
                } else {
                    toast.error('Failed to add product.');
                }
            } else {
                toast.error('Image upload failed. Please try again.');
            }
        } catch (error) {
            console.error('Failed to add product:', error);
            toast.error('An error occurred while adding the product.');
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    return(<div className="p-8">
        <Title title={'Add New Book'}></Title>
        <div>
            <form className="p-8 rounded-lg border shadow-sm" onSubmit={handleNewBook}>
                <span className="text-lg label-text">Book Name</span>
                <label className="input input-bordered flex items-center gap-2 my-2 ">
                    <input name="bookName" type="text" className="grow" onChange={handleInputChange} />
                </label>
                <span className="text-lg label-text">Author</span>
                <label className="input input-bordered flex items-center gap-2 my-2 ">
                    <input name="author" type="text" className="grow" onChange={handleInputChange} />
                </label>
                <span className="text-lg label-text">Category</span>
                <label className="input input-bordered flex items-center gap-2 my-2 ">
                    <input name="category" type="text" className="grow" onChange={handleInputChange} />
                </label>
                <span className="text-lg label-text">Tags <span className="text-sm ml-2">(Maximum three, separated by comma)</span></span>
                <label className="input input-bordered flex items-center gap-2 my-2 ">
                    <input name="tags" type="text" className="grow" onChange={handleInputChange} />
                </label>
                <span className="text-lg label-text">Price</span>
                <label className="input input-bordered flex items-center gap-2 my-2 ">
                    <input name="price" type="number" className="grow" onChange={handleInputChange} />
                </label>
                <span className="text-lg label-text">Total Pages</span>
                <label className="input input-bordered flex items-center gap-2 my-2 ">
                    <input name="totalPages" type="text" className="grow" onChange={handleInputChange} />
                </label>
                <span className="text-lg label-text">Publisher</span>
                <label className="input input-bordered flex items-center gap-2 my-2 ">
                    <input name="publisher" type="text" className="grow" onChange={handleInputChange} />
                </label>
                <span className="text-lg label-text">Year of Publishing</span>
                <label className="input input-bordered flex items-center gap-2 my-2 ">
                    <input name="yearOfPublishing" type="number" min={1000} max={2024} className="grow" onChange={handleInputChange} />
                </label>
                <span className="text-lg label-text">Image</span>
                <label className="input input-bordered flex items-center gap-2 my-2 ">
                    <input
                    onChange={handleFileChange}
                    type="file" className="grow" />
                </label>
                <div className="flex justify-center">
                    <input type="submit" className="btn btn-wide" value='Save Product'></input>
                </div>
            </form>
        </div>
    </div>)
}

export default NewProduct