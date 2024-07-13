import React from 'react'

const Header = () => {
  return (
    <div>
        <div className='bg-hero w-5/6 h-[40rem] bg-center bg-auto  mx-32 rounded-3xl my-5'>
            <div className='text-white text-7xl ml-32 absolute mt-56 w-[38rem] leading-tight font-semibold'>
                Order your
                favourite food here
            </div>
            <div className='text-white absolute ml-32 mt-[26rem] w-[42rem]'>
                Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
            </div>
            <div className='absolute ml-32 mt-[32rem] bg-white p-5 rounded-full text-gray-500 cursor-pointer'>
                View Menu
            </div>
        </div>
    </div>
  )
}

export default Header