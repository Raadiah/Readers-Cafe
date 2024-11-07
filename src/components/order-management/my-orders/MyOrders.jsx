import { useContext, useEffect, useState } from "react"
import baseUrl from "../../../routes/sites";
import { AuthContext } from "../../../provider/AuthProvider";
import Title from "../../dashboard/Title";
import formatDate from "../../../utils/common/dateFormatter";
import { Helmet } from "react-helmet-async";
import { ROUTES } from "../../../routes";
import { Link } from "react-router-dom";

const MyOrders = ()=>{
    const [orders, setOrders] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const {user} = useContext(AuthContext);
    const uid = user?.uid;
    const tableColumns = ['Book', 'Price', 'Quantity', 'Payment Method', 'Date', 'Action'];
    const tableColumnsClass = ['text-start min-w-24', 'min-w-24', 'min-w-24', 'text-start min-w-24', 'text-start min-w-24'];
    
    const fetchOrders = async()=>{
        const orderJson = await fetch(`${baseUrl}/myOrders/${uid}`)
        const orders = await orderJson.json()
        const totalPrice = orders.map((order=>order.price*order.quantity)).reduce((currentTotal, price)=>Number(currentTotal)+Number(price))
        setOrders(orders)
        setTotalPrice(totalPrice)
    }

    useEffect(()=>{
        fetchOrders()
    }, [user])

    return (
        <>
            <Helmet>
                <title>My Orders</title>
            </Helmet>
            <div className="p-8">
                <Title title='My Orders'></Title>
                <div className="flex font-semibold justify-end text-lg mb-8">Total Price: ${totalPrice}</div>
                <table className="w-full">
                    <thead>
                        <tr className="hidden lg:table-row">
                        {
                            tableColumns.map((tableColumn, index)=>{
                                return(<th key={index+1} className={`p-2 ${tableColumnsClass[index]}`}>{tableColumn}</th>)
                            })
                        }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders?.length?
                            (
                                orders.map(({_id, image, bookName, price, quantity, orderDate, paymentMethod})=>{
                                    return(
                                        <tr key={_id} className="flex flex-col lg:table-row space-y-2">
                                            <td className="gap-2 pt-2">
                                                <span className="flex items-center gap-2">
                                                    <img className="w-24 h-24 lg:w-8 lg:h-8" src={image}></img>
                                                    <span className="text-2xl font-semibold lg:text-base lg:font-normal">{ bookName }</span>
                                                </span>
                                            </td>
                                            <td className="lg:text-center">
                                                <label className="lg:hidden font-semibold">Price: </label>
                                                <span>${ price }</span>
                                            </td>
                                            <td className="lg:text-center">
                                                <label className="lg:hidden font-semibold">Quantity: </label>
                                                <span>{ quantity }</span>
                                            </td>
                                            <td>
                                                <label className="lg:hidden font-semibold">Payment Method: </label>
                                                <span>{ paymentMethod }</span>
                                            </td>
                                            <td className="lg:text-center">
                                                <label className="lg:hidden font-semibold">Date of Purchase: </label>
                                                <span>{ formatDate(orderDate) }</span>
                                            </td>
                                            <td className="flex lg:justify-center gap-2 p-4 lg:p-2 border-b">
                                                <button 
                                                className="button-primary-rc">
                                                    Pay Now
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            )
                            :
                            (
                                <tr>
                                    <td
                                    className="text-center text-lg my-8 p-4 italic"
                                    colSpan={tableColumns.length}>
                                        No Order Yet. Check out our latest books <Link className="cursor-pointer text-cyan-600" to={ROUTES.BOOKS}>here</Link>.
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default MyOrders