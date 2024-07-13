import { createContext, useState } from "react";
import { food_list } from "../assets/assets";
import { useEffect } from "react";
export const StoreContext = createContext(null)
import axios from 'axios'
const StoreContextProvider = (props) => {


    const [cartItems, setCartItems] = useState({})
    const [food_list, setFoodList] = useState([])
    const url = "http://localhost:4000"

    const [token, setToken] = useState('')

    useEffect(() => {
        
        async function loadData(){
           
            await fetchFoodList()
            console.log(food_list)
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"))
                await fetchCartItems(localStorage.getItem("token"))
              } 
        }
        loadData()
      
    }, [])

    const fetchCartItems = async (token)=>{

        const response = await axios.post(`${url}/api/cart/get`,{},{headers:{token}})
        setCartItems(response.data.cartData)
        console.log(response.data)
        
    }

    const fetchFoodList = async ()=>{

        const response = await axios.get(`${url}/api/food/list`)
        setFoodList(response.data.data)
    }
    
    const addToCart = async (itemId)=>{

        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }

        if (token) {
            await axios.post(url+'/api/cart/add',{itemId},{headers:{token}})
        }

    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))

        if (token) {
            await axios.post(url+'/api/cart/remove',{itemId},{headers:{token}})
        }
    }

    const getTotalCartAmount =()=>{
        let totalAmount=0;

        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo = food_list.find((product)=> product._id === item);
                totalAmount += itemInfo.price*cartItems[item];
            }
            
        }
        return totalAmount;
    }

    const contextVlaue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,

    }

    return (
        <StoreContext.Provider value={contextVlaue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider
