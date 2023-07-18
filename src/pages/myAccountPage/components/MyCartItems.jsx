import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import './myCartItem.css'
import { useSelector } from 'react-redux'
import format from 'date-fns/format'
import { selectAllDishes } from '../../../features/posts/postSlice'

const MyCartItems = ({transaction,setTransaction,address}) => {
    console.log(address)

    const dishes = useSelector(selectAllDishes)
    const returnProductImage = (id)=>{
        const findImage=dishes.find((item)=>item._id===id)
        return findImage.dish_image_url
    }

    /* COMPUTING THE GENERAL TOTAL AMOUNT PAYABLE */
    let total=0

    transaction?.cartItems?.map((item)=>{
      total+=(item.price-((item.discount/100)*item.price))*item.quantity
      return total
    })

   console.log(transaction)
  return (
    <div className='my-order-items'>
        <div className='my-order-items-title'><FaArrowLeft onClick={()=>setTransaction(null)}/>Order Details</div>
        <div className="cart-info">
            <div className="cart-info-no">{`Order no.${transaction._id}`}</div>
            <div className="cart-info-number-of-items">{`${transaction.cartItems.length} Item${transaction.cartItems.length===1?'':'s'}`}</div>
            <div className="cart-info-date">{`Placed on ${format(new Date(transaction.date),'yyyy-MM-dd')}`}</div>
            <div className="cart-info-price">{`Total Payment: GHS${(transaction.amountPayable).toFixed(2)}`}</div>
        </div>
        <div className="my-order-items-container">

            <div className='items-in-order'>ITEMS IN ORDER</div>
            <div className="my-order-container">
            {
                transaction?.cartItems.map((item)=>{
                    return(
                        <div key={item._id} className="my-order-container-item">
                            <div className="order-icons"><img src={returnProductImage(item?.dishId)} alt="" className='order-icons-icon'/></div>
                            <div className="order-info">
                                <div className="order-info-items">{item.dishName}</div>
                                <div className="order-info-quantity">{`Quantity: ${item.quantity}`}</div>
                                <div className="order-info-price">{`Unit Price: ${item.price}`}</div>
                                <div className="order-info-total-price">{`Total Price: ${item.price*item.quantity}`}</div>
                                <div className="order-info-total-price">{`Discounted Price: ${(item.price*item.quantity-((item.discount/100)*(item.price*item.quantity))).toFixed(2)}`}</div>
                                {/* <div className="order-info-button">Confirmed</div>
                                <div className="order-info-date">{`On ${format(new Date(),'yyyy-MM-dd')}`}</div> */}
                            </div>
                            <div className='see-details'><span>See Details</span></div>
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



