import React from 'react'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = () => {

    const url = 'http://localhost:4000'
    const [image, setImage] = useState(false)

    const [data, setData] = useState({
        name : "",
        description: "",
        price: "",
        category: "Salad"
    })

    const handleChange = (event)=>{
        const name = event.target.name;
        const value= event.target.value;
        setData({...data,[name]:value});
    }

    const OnSubmitHandler = async (event)=>{
        event.preventDefault();
        const formData = new FormData();
        formData.append('name',data.name);
        formData.append('description',data.description);
        formData.append('category',data.category);
        formData.append('price',data.price);
        formData.append('image',image);

        const response = await axios.post(`${url}/api/food/add`,formData);

        if (response.data.success) {
            setData({
                name : "",
                description: "",
                price: "",
                category: "Salad"
            });
            setImage(false);
            toast.success(response.data.message)
        } else {
            toast.error(response.data.message)
        }
    }

    useEffect(() => {
        console.log(data);
    }, [data]);

  return (
    <div>
        <form className=' mx-28 mt-28 text-[#6d6d6d]' onSubmit={OnSubmitHandler}>
            <div>
                <p className='mb-2'>Upload Image</p>
                <label htmlFor='image'>
                    <img className='w-40 h-24' src={image?URL.createObjectURL(image):assets.upload_area} alt=''></img>
                </label>
                <input onChange={(e)=>{setImage(e.target.files[0])}} type='file' id='image' hidden required></input>
            </div>
            <div>
                <p className='mt-6 mb-2'>Product name</p>
                <input onChange={handleChange} className='p-4 border w-96 border-[#6d6d6d]' type='text' name='name' placeholder='Type here'></input>
            </div>
            <div>
                <p className='mt-6 mb-2'>Product description</p>
                <textarea onChange={handleChange} className='p-4 border w-96 border-[#6d6d6d]' name='description' rows='6' placeholder='write content here'></textarea>
            </div>
            <div className='flex justify-between mt-6 '>
                <div>
                    <p className='mb-2'>Product category</p>
                    <select onChange={handleChange} className='border w-40 h-12 pl-4 pr-2 border-[#6d6d6d]' name='category'>
                        <option value='Salad'>Salad</option>
                        <option value='Rolls'>Rolls</option>
                        <option value='Deserts'>Deserts</option>
                        <option value='Sandwich'>Sandwich</option>
                        <option value='Cake'>Cake</option>
                        <option value='Pure veg'>Pure veg</option>
                        <option value='Pasta'>Pasta</option>
                        <option value='Noodles'>Noodles</option>
                    </select>
                </div>
                <div>
                    <p className='mb-2'>Product price</p>
                    <input onChange={handleChange} className='border-[#6d6d6d] border h-12 pl-4' type='Number' name='price' placeholder='$20'></input>
                </div>
                
            </div>
            <button className='border bg-black text-white w-40 p-4 mt-4' type='submit'>Add</button>
        </form>
    </div>
  )
}

export default Add