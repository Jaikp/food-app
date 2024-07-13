import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets';
const MyOrders = () => {

    const {url,token} = useContext(StoreContext);
    const [data, setData] = useState([])

    const fetchOrders = async (req,res)=>{

        const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}});
        setData(response.data.data);
        console.log(response.data.data);
    }

    useEffect(() => {
      
        if (token) {
            fetchOrders();
        }
    }, [token])
    

  return (
    <div className='mx-36 my-[50px] flex flex-col gap-5 mt-8'>
        <h2>My Orders</h2>
        <div className='flex flex-col gap-5 mt-8'>
            {data.map((order,index)=>{
                return (
                    <div key={index} className='grid [grid-template-columns:0.5fr_2fr_1fr_1fr_2fr_1fr] items-center gap-8 text-sm py-3 px-5 text-[#454545] border border-solid border-red-500'>
                        <img className=' w-12' src={assets.parcel_icon} alt=''/>
                        <p>{order.items.map((item,index)=>{
                            if(index === order.items.length-1){
                                return item.name+" x "+item.quantity
                            }else{
                                return item.name+" x "+item.quantity+","
                            }
                        })}</p>
                        <p>${order.amount}.00</p>
                        <p>Items: {order.items.length}</p>
                        <p><span className='text-red-500'>&#x25cf;</span> <b className='font-medium text-[#454545]'>{order.status}</b></p>
                        <button onClick={fetchOrders} className=' py-3 rounded px-0 bg-[#ffe1e1] cursor-pointer text-[#454545]'>Track Order</button>

                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default MyOrders