import React, { useContext, useState } from 'react'
import {assets} from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';


const Navbar = ({setShowLogin}) => {


    const [menu, setmenu] = useState("home");
    const {getTotalCartAmount,token,setToken} = useContext(StoreContext)
    const navigate = useNavigate()
    const logout = ()=>{
        localStorage.removeItem("token")
        setToken("")
        navigate('/')
    }

  return (
    <div className='flex flex-row w-full justify-between px-36 py-4'>
        <div className='basis-1/4'>
        <Link to='/'><img src={assets.logo} alt='Tomato' className=''></img></Link>
        </div>
        <div className='flex flex-row basis-1/2 justify-between px-28 py-2'>
            <Link to='/'><div onClick={()=>{setmenu("home")}} className={menu=="home" ? "underline underline-offset-8 cursor-pointer" : "hover:underline underline-offset-4 cursor-pointer" }>Home</div></Link>
            <Link to='/'><div onClick={()=>{setmenu("menu")}} className={menu=="menu" ? "underline underline-offset-8 cursor-pointer" : "hover:underline underline-offset-4 cursor-pointer" }>menu</div></Link>
            <Link to='/'><div onClick={()=>{setmenu("about us")}} className={menu=="about us" ? "underline underline-offset-8 cursor-pointer" : "hover:underline underline-offset-4 cursor-pointer" }>about us</div></Link>
            <Link to='/'><div onClick={()=>{setmenu("mobile app")}} className={menu=="mobile app" ? "underline underline-offset-8 cursor-pointer" : "hover:underline underline-offset-4 cursor-pointer" }>mobile app</div></Link>
        </div>
        <div className='flex flex-row basis-1/4 justify-between px-14'>
            <div>
                <img src={assets.search_icon} alt='' className='py-2'></img>
            </div>
            <div>
                {getTotalCartAmount()>0?<div className='w-2 h-2 bg-red-400 rounded-full absolute ml-5'></div>:<></>}
                <Link to="/cart"><img src={assets.basket_icon} alt='' className='py-2 relative'></img></Link>
            </div>
            {!token?<div onClick={()=>setShowLogin(true)} className='border border-red-400 rounded-full px-6 py-2 hover:bg-red-400'>sign in</div>
            :<div className="mt-2 relative group">
                <img className='' src={assets.profile_icon} alt='Profile Icon'/>
                    <ul className='absolute z-10 hidden right-0 group-hover:w-36 group-hover:cursor-pointer group-hover:flex group-hover:flex-col group-hover:gap-[10px] group-hover:bg-[#fff2ef] group-hover:rounded group-hover:py-3 group-hover:px-6 group-hover:border group-hover:border-solid group-hover:border-red-500 group-hover:outline-2 group-hover:outline group-hover:list-none'>
                        <li onClick={()=>{navigate('/myorders')}} className='flex items-center gap-2'>
                            <img src={assets.bag_icon} alt='Bag Icon'/><p>Orders</p>
                        </li>
                        <hr className='my-1'/>
                        <li onClick={logout} className='flex items-center gap-2'>
                            <img src={assets.logout_icon} alt='Logout Icon'/><p>Logout</p>
                        </li>
                    </ul>
            </div>}
            
            
        </div>
    </div>
  )
}

export default Navbar