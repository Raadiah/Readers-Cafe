import { useContext } from "react"
import { AuthContext } from "../../../provider/AuthProvider"
import { FaCartPlus, FaCross } from "react-icons/fa6";
import baseUrl from "../../../routes/sites";
import toast from "react-hot-toast";

const BuyNowModal = ({_id, bookName, author, image, price})=>{
    const {user} = useContext(AuthContext);
    const {uid, name, email, address, phone} = user;
    const paymentMethods = ['Cash On Delivery', 'Mobile Wallet', 'Card']

    const handleBuyNow = async (event)=>{
        event.preventDefault()
        const deliveryAddress = event.target.deliveryAddress.value;
        const quantity = event.target.quantity.value;
        const paymentMethod = paymentMethods[event.target.paymentMethod.value]

        const orderInfo = {
            user_uid: uid,
            customerName: name,
            email: email,
            deliveryAddress,
            quantity,
            paymentMethod,
            bookId: _id,
            bookName,
            author,
            image,
            price,
            orderDate: new Date()
        }

        try{
            const result = await fetch(`${baseUrl}/order`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(orderInfo)
            })
    
            const data = await result.json();
            if (data.acknowledged) {
                toast.success(`Succesfully ordered ${bookName}`);
            } else {
                toast.error('Failed to buy product.');
            }
        } catch(error) {
            console.error('Failed to order product:', error);
            toast.error('An error occurred while adding the product.');
        }
    }

    return(
        <div className="modal-box">
            <h3 className="font-bold text-lg">Buy - {bookName}</h3>
            <div className="my-8">
                <form onSubmit={handleBuyNow}>
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
                        <span className='col-span-1 font-semibold'>Customer Name</span>
                        <span className='col-span-2 font-semibold'>{name}</span>
                        <span className='col-span-1 font-semibold'>Phone</span>
                        <span className='col-span-2'>{phone}</span>
                        <span className='col-span-1 font-semibold'>Email</span>
                        <span className='col-span-2'>{email}</span>
                        <span className='col-span-1 font-semibold'>Quantity</span>
                        <span className='col-span-2 flex'>
                            <input 
                            name="quantity" 
                            className="flex-1 border rounded-md h-8 p-1" 
                            type="number"
                            min={1}
                            max={10}></input>
                        </span>
                        <span className='col-span-1 font-semibold'>Delivery Address</span>
                        <span className='col-span-2 flex'>
                            <textarea name="deliveryAddress" className="border border-black p-2 outline-none rounded-md flex-1 h-24"></textarea>
                        </span>
                        <span className='col-span-1 font-semibold'>Payment Method</span>
                        <span className='col-span-2 flex'>
                            <select name="paymentMethod" className="flex-1 border rounded-md h-8 p-1">
                                <option className="text-gray-700" disabled>Select One</option>
                                {
                                    paymentMethods.map((paymentMethod, index)=><option value={index}>{paymentMethod}</option>)
                                }
                            </select>
                        </span>
                    </div>
                    <div className="flex gap-2 items-center justify-center mt-8">
                        <button 
                        type="submit"
                        className="btn bg-white border border-teal-600 text-teal-600 
                        hover:bg-teal-600 hover:text-white">
                            <FaCartPlus className="pointer-events-none"></FaCartPlus>
                            Buy Now
                        </button>
                        <form method="dialog">
                            <button className="btn btn-outline w-24">Close</button>
                        </form>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default BuyNowModal