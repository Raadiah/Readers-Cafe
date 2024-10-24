import { useContext, useEffect, useState } from "react"
import baseUrl from "../../../routes/sites";
import { AuthContext } from "../../../provider/AuthProvider";
import Title from "../../dashboard/Title";
import formatDate from "../../../utils/common/dateFormatter";

const MyOrders = ()=>{
    const [orders, setOrders] = useState([]);
    const {user} = useContext(AuthContext);
    const uid = user?.uid;
    const tableColumns = ['Book', 'Date', 'Price', 'Payment Method', 'Action'];
    const tableColumnsClass = ['text-start min-w-72', 'text-start min-w-24', 'min-w-24', 'min-w-24'];
    
    const fetchOrders = async()=>{
        const orderJson = await fetch(`${baseUrl}/myOrders/${uid}`)
        const orders = await orderJson.json()
        setOrders(orders)
    }

    useEffect(()=>{
        fetchOrders()
    }, [])

    return (
        <div className="p-8">
            <Title title='My Orders'></Title>
            <table>
            <thead>
                <tr>
                {
                    tableColumns.map((tableColumn, index)=>{
                        return(<th className={`p-2 ${tableColumnsClass[index]}`}>{tableColumn}</th>)
                    })
                }
                </tr>
            </thead>
            <tbody>
                {
                    orders.map(({image, bookName, price, orderDate, paymentMethod})=>{
                        return(
                            <tr>
                                <td className="flex gap-2">
                                    <img className="w-8 h-8" src={image}></img>
                                    { bookName }
                                </td>
                                <td className="text-center">{ formatDate(orderDate) }</td>
                                <td className="text-center">${ price }</td>
                                <td>{ paymentMethod }</td>
                                <td className="flex gap-2">
                                    <button className="btn bg-green-200">
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