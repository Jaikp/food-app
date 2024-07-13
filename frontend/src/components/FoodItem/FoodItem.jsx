import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({id,name,price,description,image}) => {

    const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext)
  return (
    <div className='rounded-2xl shadow-md'>
        <div className=''>
            {!cartItems[id] ? <img className='absolute mt-52 ml-[17.5rem] cursor-pointer' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt=''/> :
                        <div className='bg-white flex gap-4 rounded-full p-2 absolute items-center mt-52 ml-52 cursor-pointer'>
                            <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt=''/>
                            {cartItems[id]}
                            <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt=''/>
                        </div>
            }
            <img className='rounded-t-2xl' src={url+'/images/'+image} alt=''></img>
        </div>
        <div className='mx-4 my-4'>
            <div className='flex justify-between'>
                <p className='text-xl font-semibold mb-2'>{name}</p>
                <img src={assets.rating_starts} alt=''></img>
                    
            </div>
            <p className='mb-2 text-slate-600'>{description}</p>
            <p className='text-lg text-red-500'>${price}</p>
        </div>
    </div>
  )
}

export default FoodItem