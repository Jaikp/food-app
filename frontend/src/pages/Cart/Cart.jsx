import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

  const {cartItems,food_list,removeFromCart,getTotalCartAmount,url} = useContext(StoreContext)
  const navigate = useNavigate()
  return (
    <div className='mx-36 mt-24'>
      <div>
        <div className='grid [grid-template-columns:1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-gray-500 text-[max(1vw,12px)]'>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr/>
        {food_list.map((item,index)=>{
          if(cartItems[item._id]>0){
            return (
              <div>
              <div key={index} className='grid [grid-template-columns:1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-[max(1vw,12px)] my-3 text-black'>
                <img className='w-[50px]' src={url+'/images/'+item.image} alt=''></img>
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>${item.price * cartItems[item._id]}</p>
                <p className='cursor-pointer' onClick={()=>{removeFromCart(item._id)}}>X</p>
             </div> 
             <hr className='h-[1px] bg-[#e2e2e2] border-none'/>
             </div>
            )
          }
        })}
      </div>
      <div className='flex mt-20 justify-between gap-[max(12vw,20px)]'>
        <div className='flex-[1] flex flex-col gap-5'>
          <h2>Cart total</h2>
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
              <p>Total</p>
              <p>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</p>
            </div>
            
          </div>
          <button onClick={()=>navigate('/order')} className='border-none bg-red-500 text-white w-[max(15vw,200px)] py-3 cursor-pointer rounded'>PROCEED TO CHECKOUT</button>
          </div>
          <div className='flex-[1]'>
            <div>
              <p>If you have a promo code, Enter it here</p>
              <div className='mt-3 flex justify-between items-center rounded bg-[#eaeaea]'>
                <input className=' bg-transparent border-none outline-none pl-3' type='text' placeholder='promo code'></input>
                <button className='w-[max(10vw,150px)] py-3 px-[5px bg-black border-none text-white rounded]'>Submit</button>
              </div>
            </div>
          </div>
        
      </div>
    </div>
  )
}

export default Cart