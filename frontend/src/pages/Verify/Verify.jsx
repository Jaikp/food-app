import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const Verify = () => {

    const [searchParams,setSearchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const {url} = useContext(StoreContext);
    const navigate = useNavigate();
    
    const verifyPayment = async (req,res)=>{
        const response = await axios.post(url+'/api/order/verify',{success,orderId})
        if (response.data.success) {
            navigate("/myorders");
        } else {
            navigate("/")
        }
    }
    

    useEffect(() => {
      
        verifyPayment();
    }, [])
    



  return (
    <div className='verify grid min-h-[60vh] w-[100px] h-[100px] place-self-center border-2 border-solid border-[#bdbdbd] rounded-[50%] animate-spin'>
        <div className='spinner w-[100px] h-[100px] place-self-center border-2 border-solid border-[#bdbdbd] rounded-[50%] animate-spin'>

        </div>
    </div>
  )
}

export default Verify