import React from 'react'
import { useSelector,useDispatch  } from 'react-redux'
import { setIsOverPage } from '../../../features/actions/actionStateSlice'
import { FaTimes} from 'react-icons/fa'
import { selectTransactionById } from '../../../features/transactionSlice.js/transaction'
import { selectCustomerById } from '../../../features/customers/customersSlice'
import { selectAdressAdminById } from '../../../features/addresses/addressSlice'
import { selectAllDishes } from '../../../features/posts/postSlice'
import format from 'date-fns/format'
import { setProductId } from '../../../features/actions/actionStateSlice'
import './viewTransactionModal.css'


const ViewTransactionModal = () => {

    const dispatch = useDispatch()
    const productId=useSelector((state)=>state.promptMessage.productId);
    const transaction = useSelector((state)=>selectTransactionById(state,productId))
    const customerProfile = useSelector((state)=>selectCustomerById(state,transaction?.customerId))
    const address = useSelector((state)=>selectAdressAdminById(state,transaction?.customerId))
    const dishes = useSelector(selectAllDishes)

    console.log(transaction)
    console.log(customerProfile)
    console.log(address)

    // A FUNCTION TO RETURN THE PRODUCT IMAGE TO BE DISPLAYED
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

    const handleActions = async (id) =>{
        dispatch(setIsOverPage({isOverPage:true, operation:"edit-transaction"}))
        dispatch(setProductId(id))
    }

  return (
    <div className='view-transaction-modal'>
       <div className='modal-close-btn' onClick={()=>dispatch(setIsOverPage(false))}><FaTimes/></div>
       <div className="cart-info">
            <div className="cart-info-info">
                <div className="cart-info-no">{`Cart no.${transaction._id}`}</div>
                <div className="cart-info-number-of-items">{`${transaction.cartItems.length} Item${transaction.cartItems.length===1?'':'s'}`}</div>
                <div className="cart-info-date">{`Placed on ${format(new Date(transaction.date),'yyyy-MM-dd')}`}</div>
                <div className="cart-info-price">{`Total Payment: GHS${(transaction.amountPayable).toFixed(2)}`}</div>
            </div>
            <div className="status-and-edit">
                <div className="status">
                    <div className="cart-info-button"  style={{backgroundColor:
                        transaction.purchaseStatus==='Paid'||!transaction.purchaseStatus?'red'
                        :transaction.purchaseStatus==='Confirmed'?'gold'
                        :transaction.purchaseStatus==='Dispatch'?'green'
                        :transaction.purchaseStatus==='Delivered'?'rgb(124, 105, 120)'
                        :'green'}}>
                        {transaction.purchaseStatus?transaction.purchaseStatus:'Paid'}
                    </div>
                    <div className="cart-info-date">{`On ${format(new Date(),'yyyy-MM-dd')}`}</div>
                </div>
                <div className='edit' onClick={()=>handleActions(transaction._id)}><span>Edit Status</span></div>
            </div>
       </div>
       <div className="my-cart-items-container">

            <div className='items-in-cart'>ITEMS IN ORDER</div>
            <div className="my-cart-container">
            {
                transaction?.cartItems.map((item)=>{
                    return(
                        <div key={item._id} className="my-cart-container-item">
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

export default ViewTransactionModal