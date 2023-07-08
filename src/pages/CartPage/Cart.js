import React from 'react'
import './cart.css'
import { useAddReactionMutation } from '../../features/cart/cartSlice'
import { FaCaretUp,FaCaretDown,FaTimes,FaSpinner } from 'react-icons/fa'
import { useDeleteCartMutation} from '../../features/cart/cartSlice'
import { selectAllDishes } from '../../features/posts/postSlice'
import { selectAllCarts } from '../../features/cart/cartSlice'
import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { setIsPromptMessage,setPromptMessage } from '../../features/actions/actionStateSlice'


const Cart = () => {
    const myCart= useSelector(selectAllCarts); 
    const myId= JSON.parse(localStorage.getItem("myUserId"))
    const [addReaction]=useAddReactionMutation()
    const [deleteCart, {isLoading,isError,error,isSuccess}] = useDeleteCartMutation()
    const allDishes = useSelector(selectAllDishes)
    const dispatch = useDispatch()

    const productImage=(id)=>{
        const findDish = allDishes.find((dish)=>dish._id===id)
        return findDish?.dish_image_url
    }

    if(isError){
        dispatch(setPromptMessage(error))
        dispatch(setIsPromptMessage(true)) 
        setTimeout(() => {
            dispatch(setIsPromptMessage(false))
        }, 8000);
    }
    else if(isSuccess){
        dispatch(setPromptMessage(`order successfully removed`))
        dispatch(setIsPromptMessage(true)) 
        setTimeout(() => {
            dispatch(setIsPromptMessage(false))
        }, 8000);
    }

    const onDeletePostClicked = async(item) => {
        if(window.navigator.onLine){
            try {
                await deleteCart({orderId:item, userId:myId.id}).unwrap()
                
            } catch (err) {
                console.error('Failed to delete the post', err)
            } 
        }
        else{
            dispatch(setPromptMessage(`check your internet connectivity`))
            dispatch(setIsPromptMessage(true)) 
            setTimeout(() => {
                dispatch(setIsPromptMessage(false))
            }, 8000);
        } 
       
    }

    const increaseOrReduceQuantity = (itemId,itemQuantity) =>{
        addReaction({orderId:itemId, quantity:itemQuantity})
    }

    let total=0

    myCart.map((item)=>{
      total+=(item.price-((item.discount/100)*item.price))*item.quantity
      return total
    })
  return (
    <div className='cart'>
        {isLoading&&
            <div className="animation-container">
                <FaSpinner className='loading-animation'/>
            </div>
        }
        <div className="cart-divisions">
            <h1>Shoping Bag</h1>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>PRODUCT</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>QTY</th>
                        <th>TOTAL</th>
                    </tr>
                </thead>
                
                <tbody>
                    {
                        myCart.map((item)=>{
                            return(
                                <tr key={item._id}>
                                    <td><FaTimes className='remove' onClick={()=>{onDeletePostClicked(item._id)}} /></td>
                                    <td>
                                        <div className="td-image">
                                            <img src={productImage(item.dishId)} alt="" />
                                        </div>
                                    </td>
                                    <td>{item.dishName}</td>
                                    <td>
                                        {`${(item.price-((item.discount/100)*item.price)).toFixed(2)}`}
                                        {
                                        item.discount>0 &&
                                        <p><strike>{`${item.price}`}</strike></p>
                                        }
                                    </td>
                                    <td>
                                        <div className="quantity-input">
                                            {item.quantity}
                                            <div className="quantity-input-controls">
                                                <FaCaretUp className="quantity-input-controls-icon" onClick={()=>{increaseOrReduceQuantity(item._id, item.quantity+1)}}/>
                                                <FaCaretDown className="quantity-input-controls-icon" onClick={()=>{increaseOrReduceQuantity(item._id, item.quantity-1)}}/>
                                            </div>
                                        </div>  
                                    </td>

                                    <td>{`${((item.price-((item.discount/100)*item.price))*item.quantity).toFixed(2)}`}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
        <div className="cart-divisions">
            <h1>Cart Total</h1>
            <table>
                <tbody>
                    <tr>
                        <td>GROSSTOTAL</td>
                        <td>{`GHS${total.toFixed(2)}`}</td>
                    </tr>
                    <tr>
                        <td>VAT</td>
                        <td>+0</td>
                    </tr>
                    <tr>
                        <td>COUPON</td>
                        <td>-0</td>
                    </tr>

                    <tr>
                        <th>AMOUNT PAYABLE</th>
                        <th>{`GHS${total.toFixed(2)}`}</th>
                    </tr>
                    
                </tbody>

            </table>
            <Link to={`/checkout`}><button className='check-out'>PROCEED TO CHECKOUT</button></Link>
        </div>
    </div>
  )
}

export default Cart