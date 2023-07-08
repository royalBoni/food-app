import React from 'react'
import { setCartMini, setIsAccountNav} from '../features/actions/actionStateSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { FaShoppingBag } from 'react-icons/fa';
import { selectAllCarts } from '../features/cart/cartSlice';
import './cartSymbol.css'

const CartSymbol = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const myId= JSON.parse(localStorage.getItem("myUserId"));
    const userId =myId?.id
    const cartItems = useSelector(selectAllCarts)
    const customerCreatedCart = cartItems?.filter((cart)=>cart?.customerId===userId)
    const mouseOverCartButton=()=>{
      dispatch(setCartMini(true))
      dispatch(setIsAccountNav(false))
    }

    const mouseOutCartButton =()=>{dispatch(setCartMini(false))}

    const  onClickCartButton= ()=>{
      userId?navigate('/cart'):navigate('/login')
        
      dispatch(setCartMini(false))
    }
  return (
    <div className="carton" onMouseOver={userId?mouseOverCartButton:null}  onMouseOut={mouseOutCartButton} onClick={onClickCartButton}>
        {userId?<div className='basket'><FaShoppingBag/>{customerCreatedCart.length}</div>:<FaShoppingBag/>}
    </div>
  )
}

export default CartSymbol