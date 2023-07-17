import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import './myCartItem.css'
import { useGetTransactionByUserIdMutation } from '../../../features/transactionSlice.js/transaction'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { FaShoppingBag } from 'react-icons/fa'
import format from 'date-fns/format'
import { selectAllDishes } from '../../../features/posts/postSlice'

const MyCartItems = ({transaction,setTransaction,toggleActiveNav}) => {
   /*  console.log(transaction)
  return (
    <div className='my-cart-items'>
        <div className='my-cart-items-title'><FaArrowLeft onClick={()=>setTransaction(null)}/> Cart Items</div>
        <div className="my-cart-items-container">
            {JSON.stringify(transaction)}
        </div>
    </div>
  ) */
    const dishes= useSelector(selectAllDishes)

    const [getTransactionByUserId, {data}] = useGetTransactionByUserIdMutation()

    const myId= JSON.parse(localStorage.getItem("myUserId"));

    const fetchCustomerTransaction = async()=>{
        await getTransactionByUserId({customerId:myId.id }).unwrap() 
    }


    useEffect(()=>{
        fetchCustomerTransaction()
    },[])

    const returnItemsInCart=(cartItems)=>{
        let itemArray =[]
        cartItems.map((item)=>{
            dishes.map((dish)=>{
                if(item.dishId===dish._id){
                    itemArray.push(dish.dishName)
                }
                return null
            })
            return null
        })

       const reducedResult =itemArray?.reduce((accumulator,value)=>{
            return accumulator +', '+value
        }) 

        return reducedResult
    }

    const pageWidth=useSelector((state)=>state.promptMessage.pageWidth);

    
    
  return (
    <div className='my-order'>
        {
            transaction?<MyCartItems 
            transaction={transaction}
            setTransaction={setTransaction}
            />:
            null
        }
        <div className='my-order-title'>{pageWidth<1000?<FaArrowLeft onClick={()=>toggleActiveNav(1)}/>:null} Orders</div>
        <div className="my-order-container">
            <h4>Carts</h4>

            {
                data?.data.map((transaction)=>{
                    return(
                        <div key={transaction._id} className="my-order-container-item">
                            <div className="cart-icons"><FaShoppingBag className='cart-icons-icon'/></div>
                            <div className="cart-info">
                                <div className="cart-info-items">{returnItemsInCart(transaction.cartItems)}</div>
                                <div className="cart-info-button">Checked Out</div>
                                <div className="cart-info-date">{`On ${format(new Date(transaction.date),'yyyy-MM-dd')}`}</div>
                                <div className="cart-info-price">{`Payed GHS${(transaction.amountPayable).toFixed(2)}`}</div>
                            </div>
                            <div className='see-details' onClick={()=>setTransaction(transaction)}><span>See Details</span></div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default MyCartItems



