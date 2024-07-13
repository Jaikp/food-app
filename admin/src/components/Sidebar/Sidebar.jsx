import React from 'react'
import { assets } from '../../assets/assets'
import {NavLink} from 'react-router-dom'
const Sidebar = () => {
  return (

    <div className='w-[18%] min-h-screen border border-solid border-[#a9a9a9] text-[max(1vw,10px)]'>
        <div className='pt-[50px] pl-[20%] flex flex-col gap-5'>
            <NavLink to={'/add'} className='flex items-center gap-3 border border-solid border-[#a9a9a9] py-2 px-3 cursor-pointer'>
                <img className='' src={assets.add_icon} alt=''></img>
                <p className='max-[900px]:hidden'>Add Items</p>
            </NavLink>
            <NavLink to={'/list'} className='flex items-center gap-3 border border-solid border-[#a9a9a9] py-2 px-3 cursor-pointer'>
                <img className='' src={assets.order_icon} alt=''></img>
                <p className='max-[900px]:hidden'>List Items</p>
            </NavLink>
            <NavLink to={'/orders'} className='flex items-center gap-3 border border-solid border-[#a9a9a9] py-2 px-3 cursor-pointer'>
                <img className='' src={assets.order_icon} alt=''></img>
                <p className='max-[900px]:hidden'>Orders</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar