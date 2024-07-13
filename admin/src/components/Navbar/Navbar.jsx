import React from 'react'
import {assets} from '../../assets/assets'
const Navbar = () => {
  return (
    <div className='flex justify-between items-center py-2 px-[4%] '>
        <img className='w-[max(10%,80px)' src={assets.logo} alt=''></img>
        <img className='w-[40px]' src={assets.profile_image} alt=''></img>
    </div>
  )
} 

export default Navbar