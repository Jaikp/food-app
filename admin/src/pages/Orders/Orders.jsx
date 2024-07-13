import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios'
import {toast} from 'react-toastify'
import {assets} from '../../assets/assets'
const Orders = () => {

   const url = 'http://localhost:4000'
  const [orders, setOrders] = useState([]);

  const fetchOrders = async ()=>{
    const response = await axios.get(url+'/api/order/list');
    
    if (response.data.success) {
      setOrders(response.data.data);
    } else {
      toast.error("Error");
    }
  }

  const handleUpdate = async (event,orderId)=>{
    const status = event.target.value;
    const response = await axios.post(url+'/api/order/status',{orderId,status});

    if(response.data.success){
      toast.success("Updated");
    }
    else{
      toast.error("error in updation")
    }
  }

  useEffect(() => {
    fetchOrders()
  
    
  }, [])
  
  return (
    <div className='mx-28 mt-28'>
      <h3 className='text-lg'>Orders Page</h3>
      <div>
        {orders.map((order,index)=>{

          return <div key={index} className='grid [grid-template-columns:0.5fr_2fr_1fr_1fr_1fr] items-start gap-8 border border-solid border-red-500 p-5 my-8 mx-0 text-sm text-[#505050]'>
            <img src={assets.parcel_icon} alt=''/>
            <div>
              <p className=' font-semibold'>
                {order.items.map((item,index)=>{
                  if(index===order.items.length-1){
                    return item.name+" x "+item.quantity
                  }
                  else{
                    return item.name+" x "+item.quantity+", "
                  }
                })}
              </p>
              <p className='font-semibold mt-8 mb-1'>{order.address.firstName+" "+order.address.lastName}</p>
              <div className=' mb-3'>
                <p>{order.address.street+","}</p>
                <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode} </p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>${order.amount}.00</p>
            <select onChange={(event)=>handleUpdate(event,order._id)} className='bg-[#ffe8e4] border border-solid border-red-500 w-[max(10vw,120px)] p-3 outline-none'>
              <option value="Food Processing">Food Processing</option>
              <option value='Out for delivery'>Out for delivery</option>
              <option value='Delivered'>Delivered</option>
            </select>
          </div>
        })}
      </div>
    </div>
  )
}

export default Orders