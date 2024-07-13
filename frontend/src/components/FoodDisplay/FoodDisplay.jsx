import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category}) => {

    const {food_list} = useContext(StoreContext)
  console.log(food_list);
  return (
    <div className='mx-32'>
        <h1 className='text-3xl font-semibold mb-5'>Top dishes near you</h1>
        <div className='grid grid-cols-4 gap-6'>
          {food_list.map((item,index)=>{

            if(category==="All" || category===item.category){
              return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
            }
            
          })}
        </div>
    </div>
  )
}

export default FoodDisplay