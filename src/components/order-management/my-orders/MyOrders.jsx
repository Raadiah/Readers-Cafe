import { useContext, useEffect, useState } from "react"
import baseUrl from "../../../routes/sites";
import { AuthContext } from "../../../provider/AuthProvider";
import Title from "../../dashboard/Title";
import formatDate from "../../../utils/common/dateFormatter";

const MyOrders = ()=>{
    const [orders, setOrders] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const {user} = useContext(AuthContext);
    const uid = user?.uid;
    const tableColumns = ['Book', 'Date', 'Price', 'Quantity', 'Payment Method', 'Action'];
    const tableColumnsClass = ['text-start min-w-72', 'text-start min-w-24', 'min-w-24', 'min-w-24', 'text-start min-w-24'];
    
    const fetchOrders = async()=>{
        const orderJson = await fetch(`${baseUrl}/myOrders/${uid}`)
        const orders = await orderJson.json()
        const totalPrice = orders.map((order=>order.price*order.quantity)).reduce((currentTotal, price)=>Number(currentTotal)+Number(price))
        setOrders(orders)
        setTotalPrice(totalPrice)
    }

    useEffect(()=>{
        fetchOrders()
    }, [])

    return (
        <div className="p-8">
            <Title title='My Orders'></Title>
            <div className="flex justify-end text-lg mb-8">Total Price: ${totalPrice}</div>
            <table className="w-full">
                <thead>
                    <tr>
                    {
                        tableColumns.map((tableColumn, index)=>{
                            return(<th key={index+1} className={`p-2 ${tableColumnsClass[index]}`}>{tableColumn}</th>)
                        })
                    }
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map(({image, bookName, price, quantity, orderDate, paymentMethod})=>{
                            return(
                                <tr>
                                    <td className="flex gap-2 p-2">
                                        <img className="w-8 h-8" src={image}></img>
                                        { bookName }
                                    </td>
                                    <td className="text-center p-2">{ formatDate(orderDate) }</td>
                                    <td className="text-center p-2">${ price }</td>
                                    <td className="text-center p-2">{ quantity }</td>
                                    <td>{ paymentMethod }</td>
                                    <td className="flex justify-center gap-2 p-2">
                                        <button 
                                        className="btn bg-white border border-teal-600 text-teal-600 
                                        hover:bg-teal-600 hover:text-white">
                                            Pay Now
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default MyOrders