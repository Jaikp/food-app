import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {

  const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext)

  const [data, setData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  })

  const onChangeHandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const placeOrder = async (event)=>{

    event.preventDefault();
    let orderItems= [];

    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo["quantity"]= cartItems[item._id]
        orderItems.push(itemInfo);
      }
    })
    let orderData = {
      address:data,
      items: orderItems,
      amount:getTotalCartAmount()+2
    }
    let response = await axios.post(url+'/api/order/place',orderData,{headers:{token}})
    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);
    }else{
      alert('error')
    }
  }
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if(getTotalCartAmount() === 0) {
      navigate('/cart');
    }

  }, [])
  

  

  return (
    <form onSubmit={placeOrder} className='mx-36 flex items-start justify-between gap-12 mt-24'>
      <div className='w-full max-w-[max(30%,500px)]'>
        <p className='text-3xl mb-12 font-semibold'>Delivery Information</p>
        <div className='flex gap-3'>
          <input onChange={onChangeHandler} name='firstName' value={data.firstName} className='mb-[15px] w-full p-3 border rounded outline-red-500 border-solid ' type='text' placeholder='First name'></input>
          <input onChange={onChangeHandler} name='lastName' value={data.lastName} className='mb-[15px] w-full p-3 border rounded outline-red-500 border-solid ' type='text' placeholder='Last name'></input>
        </div>
        <input onChange={onChangeHandler} name='email' value={data.email} className='mb-[15px] w-full p-3 border rounded outline-red-500 border-solid ' type='email' placeholder='Email address'></input>
        <input onChange={onChangeHandler} name='street' value={data.street} className='mb-[15px] w-full p-3 border rounded outline-red-500 border-solid ' type='text' placeholder='street'></input>
        <div className='flex gap-3'>
          <input onChange={onChangeHandler} name='city' value={data.city} className='mb-[15px] w-full p-3 border rounded outline-red-500 border-solid ' type='text' placeholder='City'></input>
          <input onChange={onChangeHandler} name='state' value={data.state} className='mb-[15px] w-full p-3 border rounded outline-red-500 border-solid ' type='text' placeholder='State'></input>
        </div>
        <div className='flex gap-3'>
          <input onChange={onChangeHandler} name='zipcode' value={data.zipcode} className='mb-[15px] w-full p-3 border rounded outline-red-500 border-solid ' type='text' placeholder='Zip code'></input>
          <input onChange={onChangeHandler} name='country' value={data.country} className='mb-[15px] w-full p-3 border rounded outline-red-500 border-solid ' type='text' placeholder='Country'></input>
        </div>
        <input onChange={onChangeHandler} name='phone' value={data.phone} className='mb-[15px] w-full p-3 border rounded outline-red-500 border-solid' type='text' placeholder='Phone'></input>
      </div>
      <div className='w-full max-w-[max(40%,500px)]'>
      <div className='flex-[1] flex flex-col gap-5'>
          <h2 className='font-bold text-2xl'>Cart total</h2>
          <div>
            <div className='flex justify-between text-[#555]'>
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr className='my-3'/>
            <div className='flex justify-between text-[#555]'>
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr className='my-3'/>
            <div className='flex justify-between text-[#555]'>
              <p className='font-semibold'>Total</p>
              <p>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</p>
            </div>
            
          </div>
          <button type='submit' className='border-none mt-8 bg-red-500 text-white w-[max(15vw,200px)] py-3 cursor-pointer rounded'>PROCEED TO PAYMENT</button>
          </div>
      </div>
    </form>
  )
}

export default PlaceOrder