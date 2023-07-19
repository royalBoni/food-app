import React from 'react'
import { FaArrowLeft, FaSpinner } from 'react-icons/fa'
import './myCartItem.css'
import { useSelector } from 'react-redux'
import format from 'date-fns/format'
import { selectAllDishes } from '../../../features/posts/postSlice'
import { useAddNewCartMutation } from '../../../features/cart/cartSlice'
import { setPromptMessage, setIsPromptMessage } from '../../../features/actions/actionStateSlice'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

const MyCartItems = ({transaction,setTransaction,address}) => {
    const dispatch = useDispatch()
    const [orderedDishName,setOrderedDishName]=useState('')
    const [activeItemLoading,setActiveItemLoading]=useState(null)

    const [addNewCart,{isSuccess, isError, error,isLoading}]=useAddNewCartMutation()

    if(isSuccess){
        dispatch(setPromptMessage(`"${orderedDishName}" have successfully been added`))
        dispatch(setIsPromptMessage(true)) 
        setTimeout(() => {
            dispatch(setIsPromptMessage(false))
        }, 8000);
    }

    if(isError){
        console.log(error)
    }

    const dishes = useSelector(selectAllDishes)
    const returnProductImage = (id)=>{
        const findImage=dishes.find((item)=>item._id===id)
        return findImage.dish_image_url
    }

    // ADDING THE ITEM BACK TO THE CART TO BE PURCHASED AGAIN

    const ClickOnAddToCart =async(item)=>{
        const isOnline=window.navigator.onLine
        if(isOnline){
            setOrderedDishName(item.dishName)
            setActiveItemLoading(item._id)
            await addNewCart({dishName:item.dishName,dishId:item.dishId,price:item.price,discount:item.discount,quantity:item.quantity,customerId:item.customerId,date:new Date()})
        }
       else{
           dispatch(setPromptMessage('please check your internet connection'))
            dispatch(setIsPromptMessage(true)) 
            setTimeout(() => {
                dispatch(setIsPromptMessage(false))
            }, 8000);
        }
         
    }

    // FUNCTION TO DISPLAY THE DELIVERY STATUS HISTORY

    const handleDeliveryStatusHistory =()=>{
        dispatch(setPromptMessage('component under construction'))
        dispatch(setIsPromptMessage(true)) 
        setTimeout(() => {
            dispatch(setIsPromptMessage(false))
        }, 8000);
    }

    /* COMPUTING THE GENERAL TOTAL AMOUNT PAYABLE */
    let total=0

    transaction?.cartItems?.map((item)=>{
      total+=(item.price-((item.discount/100)*item.price))*item.quantity
      return total
    })

   console.log(transaction)
  return (
    <div className='my-cart-items'>
        <div className='my-cart-items-title'><FaArrowLeft onClick={()=>setTransaction(null)}/>Order Details</div>
        <div className="cart-info">
            <div className="cart-info-no">{`Cart no.${transaction._id}`}</div>
            <div className="cart-info-number-of-items">{`${transaction.cartItems.length} Item${transaction.cartItems.length===1?'':'s'}`}</div>
            <div className="cart-info-date">{`Placed on ${format(new Date(transaction.date),'yyyy-MM-dd')}`}</div>
            <div className="cart-info-price">{`Total Payment: GHS${(transaction.amountPayable).toFixed(2)}`}</div>
        </div>
        <div className="my-cart-items-container">

            <div className='items-in-cart'>ITEMS IN ORDER</div>
            <div className="my-cart-container">
            {
                transaction?.cartItems.map((item)=>{
                    return(
                        <div key={item._id} className="my-cart-container-item">
                            <div className="my-cart-container-item-item">
                                <div className="status">
                                    <div className="cart-info-button">Confirmed</div>
                                    <div className="cart-info-date">{`On ${format(new Date(),'yyyy-MM-dd')}`}</div>
                                </div>
                                <button onClick={()=>ClickOnAddToCart(item)}>{isLoading&&activeItemLoading===item._id?<FaSpinner className='loading-animation'/>:'Buy Again'}</button>
                            </div>

                            <div className="my-cart-container-item-item">
                                <div className="cart-icons">
                                    <img src={returnProductImage(item?.dishId)} alt="" className='cart-icons-icon'/>
                                </div>
                                <div className="carts-info">
                                    <div className="cart-info-items">{item.dishName}</div>
                                    <div className="cart-info-quantity">{`Quantity: ${item.quantity}`}</div>
                                    <div className="cart-info-price">{`Unit Price: GHS${item.price}`}</div>
                                    <div className="cart-info-total-price">{`Total Price: GHS${item.price*item.quantity}`}</div>
                                    {
                                        !item.discount || item.discount===0?null:<div className='discounted-banner'>{`${item.discount}% OFF`}</div>
                                    }
                                    <div className="cart-info-total-price">{`Dsct.Price: GHS${(item.price*item.quantity-((item.discount/100)*(item.price*item.quantity))).toFixed(2)}`}</div>
                                </div>
                                <div className='see-details' onClick={handleDeliveryStatusHistory}><span>See Status History</span></div>
                            </div>
                        </div>
                    )
                })
            }
            </div>
        </div>
        <div className="payment-and-delivery-information">
            <div className="payment-and-delivery-information-item">
                <div className="payment-and-delivery-information-item-title">Payment Information</div>
                <div className="payment-and-delivery-information-item-content">
                    <div className="information-item">
                        <div className="information-item-title">Payment Method</div>
                        <div className="information-item-content">{transaction.modeOfPayment}</div>
                    </div>

                    <div className="information-item">
                        <div className="information-item-title">Payment Details</div>
                        <div className="information-item-content">{`Items Total: GHS${total}`}</div>
                        <div className="information-item-content">{`Coupon Rate: -GHS${transaction.couponRate?((transaction.couponRate/100)*transaction.amountPayable).toFixed(2):0}`}</div>
                        <div className="information-item-content">{`Delivery Fees: +GHS0`}</div>
                        <div className="information-item-total">{`Total Payment: GHS${(transaction.amountPayable).toFixed(2)}`}</div>
                    </div>
                </div>
            </div>

            <div className="payment-and-delivery-information-item">
                <div className="payment-and-delivery-information-item-title">Delivery Information</div>
                <div className="payment-and-delivery-information-item-content">
                    <div className="information-item">
                        <div className="information-item-title">Method Method</div>
                        <div className="information-item-content">To Delivery Address</div>
                    </div>

                    <div className="information-item">
                        <div className="information-item-title">Address Details</div>
                        <div className="information-item-content">{`${address.firstName} ${address.lastName}`}</div>
                        <div className="information-item-content">{`${address.city}, ${address.region}`}</div>
                        <div className="information-item-content">{address.address}</div>
                        <div className="information-item-content">{`${address.phoneNumber}, ${address.additionalPhoneNumber}`}</div>

                    </div>
                </div>
            </div>
        </div>
    </div>
  )
   
}

export default MyCartItems



