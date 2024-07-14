import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'

const List = () => {

    const url = 'https://food-app-1-4mwu.onrender.com'
    const [list, setList] = useState([])

    const fetchList= async ()=>{
        const response = await axios.get(`${url}/api/food/list`);
        if (response.data.success) {
            setList(response.data.data)
        } else {
            toast.error('error')
        }
    }

    useEffect(() => {
      fetchList();
    }, [])

    const handleRemove = async (id)=>{

        const response= await axios.post(`${url}/api/food/remove`,{id:id})
        if (response.data.success) {
            toast.success(response.data.message);
            fetchList();
        } else {
            toast.error("Error")
        }   
    }
    

  return (
    <div className=' mx-28 mt-28 text-[#6d6d6d]'>
        <p>All Foods List</p>
        <div>
            <div className=' grid [grid-template-columns:0.5fr_2fr_1fr_1fr_0.5fr] items-center gap-32 py-3 px-4 border border-[#cacaca] border-solid text-xl bg-[#f9f9f9]'>
                <b>Image</b>
                <b>Name</b>
                <b>Catgeory</b>
                <b>Price</b>
                <b>Action</b>
            </div>
            {list.map((item,index)=>{
                return(
                    <div key={index} className='grid [grid-template-columns:0.5fr_2fr_1fr_1fr_0.5fr] items-center gap-32 py-3 px-4 border border-[#cacaca] border-solid text-xl'>
                        <img className=' w-[250px]' src={`${url}/images/`+item.image} alt=''></img>
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>${item.price}</p>
                        <p  onClick={()=>handleRemove(item._id)} className=' cursor-pointer'>X</p>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default List