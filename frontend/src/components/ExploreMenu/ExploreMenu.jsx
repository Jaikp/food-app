import React from 'react'
import { menu_list } from '../../assets/assets'
const ExploreMenu = ({category, setCategory}) => {
  return (
    <div>
        <div className='mx-32 mt-12'>
        <h1 className='text-4xl font-bold mb-4'>Explore our menu</h1>
        <p className='py-2 w-[50rem] mt-2'>Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
        <div className='flex py-8'>
            {menu_list.map((item,index)=>{

                return(
                    <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='mr-12'>
                        <img className={category===item.menu_name?'border-4 p-2 rounded-full border-red-400':""} src={item.menu_image} alt=''></img>
                        <p className='text-center my-2 font-semibold'>{item.menu_name}</p>
                    </div>

                )
            })}
        </div>
        <hr className='mb-5 border border-gray-400'/>
        </div>
    </div>
  )
}

export default ExploreMenu