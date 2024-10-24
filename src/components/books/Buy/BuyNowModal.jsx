import { useContext } from "react"
import { AuthContext } from "../../../provider/AuthProvider"
import { FaCartPlus, FaCross } from "react-icons/fa6";

const BuyNowModal = ({bookName})=>{
    const {user} = useContext(AuthContext);
    const {uid, name, email, address, phone} = user;
    const paymentMethods = ['Cash On Delivery', 'Mobile Wallet', 'Card']

    return(
        <div className="modal-box">
            <h3 className="font-bold text-lg">Please fill up the form to buy {bookName}</h3>
            <div className="my-8">
                <form>
                    <div className='grid grid-cols-3 gap-x-4 gap-y-2'>
                        <span className='col-span-1 font-semibold'>Name</span>
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
                            max={5}></input>
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
                                    paymentMethods.map((paymentMethod)=><option value={paymentMethod}>{paymentMethod}</option>)
                                }
                            </select>
                        </span>
                    </div>
                    <div className="flex gap-2 items-center justify-center my-8">
                        <button 
                        className="btn bg-white border border-teal-600 text-teal-600 
                        hover:bg-teal-600 hover:text-white">
                            <FaCartPlus></FaCartPlus>
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