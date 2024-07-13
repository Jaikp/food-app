import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
const Loginpopup = ({setShowLogin}) => {

    const [currState, setCurrState] = useState('Login')

    const {url,token,setToken} = useContext(StoreContext)

    const [data, setData] = useState({
        name : "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event)=>{

        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onLogin = async (event)=>{
        event.preventDefault()
        let newUrl = url

        if (currState==='Login') {
            newUrl+= '/api/user/login'
        }else{
            newUrl+= '/api/user/register'
        }
        const response = await axios.post(newUrl,data)

        if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem("token",response.data.token)
            setShowLogin(false)
        }else{
            alert(response.data.message)
        }
    }

  return (
    <div className='w-full h-full absolute z-10 grid bg-[#00000090]'>
        <form onSubmit={onLogin} className='place-self-center bg-white flex flex-col gap-[25px] max-w-[330px] px-6 py-8 text-sm'>
            <div className='flex justify-between items-center'>
                <h1 className='font-bold text-2xl'>{currState}</h1>
                <img className='w-[15px] cursor-pointer' onClick={()=>{setShowLogin(false)}} src={assets.cross_icon} alt=''></img>
            </div>
            <div className='flex flex-col gap-5 '>
                {currState==="Login"?<></>:<input onChange={onChangeHandler} name='name' value={data.name} className='border border-solid p-3 rounded' type='text' placeholder='Your name' required></input>}
                <input onChange={onChangeHandler} name='email' value={data.email} className='border outline-none border-solid p-3 rounded' type='email' placeholder='Your email' required></input>
                <input onChange={onChangeHandler} name='password' value={data.password}  className='border border-solid p-3 rounded' type='password' placeholder='Password' required></input>
            </div>
            <button className='border-none rounded p-2 bg-red-500 text-[15px] text-white'>{currState==="Sign Up"?"Create account":"Login"}</button>
            <div className='flex items-start gap-2 -mt-4'>
                <input className='mt-1' type='checkbox' required/>
                <p>By continuing, i agree to the terms of use and privacy policy</p>
            </div>
            {currState==="Login"?<p>Create a new account? <span className='text-red-500 font-medium cursor-pointer' onClick={()=>setCurrState("Sign Up")}>Click here</span></p>:<p>Already have an account? <span className='text-red-500 font-medium cursor-pointer' onClick={()=>setCurrState("Login")}>Login here</span></p>}
        </form>
    </div>
  )
}

export default Loginpopup