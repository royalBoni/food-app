import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { FaShoppingBag } from 'react-icons/fa'
import format from 'date-fns/format'
import { selectAllDishes } from '../../../features/posts/postSlice'
import './myOrders.css'
import MyCartItems from './MyCartItems'
import { selectAllTransactionsByUser } from '../../../features/transactionSlice.js/transaction'


const MyOrders = ({toggleActiveNav,customerAddress}) => {

    //DECLARATION AND ASSIGNMENTS
    const [transaction, setTransaction]=useState(null)
    const dishes= useSelector(selectAllDishes)
    const myTransactions= useSelector(selectAllTransactionsByUser)


    // A FUNCTION TO DISPLAY THE ITEMS IN THE CART OF THE TRANSACTION MADE
    //THESE CARTS ARE PASSED INTO THE FUNCTION FROM THE MAP OF THE USER TRANSACTION
    const returnItemsInCart=(cartItems)=>{
        // A CREATED ARRAY CONTAINER TO HOLD ALL NAMES OF THE ITEMS IN THE CART
        let itemArray =[]
        cartItems.map((item)=>{  //MAP THROUGH THE CART ITEMS BEEN PASSED INTP THE FUNCTION
            dishes.map((dish)=>{  //ALSO MAPS THROUGH ALL THE DISHES ON SALES
                if(item.dishId===dish._id){
                    // ONLY DISH NAME IS PUSHED INTO THE NEWLY CREATED ITEMSARRAY WHEN DISH ID IS THE SAME AS 
                    //CART ITEM ID
                    itemArray.push(dish.dishName)
                }

                return null //NULL IS RETURNED WHEN THERE IS NO ID MATCH
            })
            return null
        })

        // A REDUCER FUNCTION TO PUT ALL DISH NAMES IN THE ITEM ARRAY IN INTO ONE STRING TO BE DISPLAYED
       const reducedResult =itemArray?.reduce((accumulator,value)=>{
            return accumulator +', '+value
        }) 

        return reducedResult  //STRING CREATED BY THE REDUCER FUNCTION IS RETURNED
    }

    const pageWidth=useSelector((state)=>state.promptMessage.pageWidth);

    
    
  return (
    <div className='my-order'>
        {
            transaction?<MyCartItems 
            transaction={transaction}
            setTransaction={setTransaction}
            toggleActiveNav={toggleActiveNav}
            address={customerAddress}
            />:
            <>
                <div className='my-order-title'>{pageWidth<1000?<FaArrowLeft onClick={()=>toggleActiveNav(1)}/>:null} Orders</div>
                <div className="my-order-container">
                    <h4>Carts</h4>

                    {
                        myTransactions?.map((transaction)=>{
                            return(
                                <div key={transaction._id} className="my-order-container-item">
                                    <div className="cart-icons"><FaShoppingBag className='cart-icons-icon'/></div>
                                    <div className="cart-info">
                                        <div className="cart-info-items">{returnItemsInCart(transaction.cartItems)}</div>
                                        <div className="cart-info-number">{`Order: ${transaction._id.slice(0,10)}`}</div>
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
            </>
        }
    </div>
  )
}

export default MyOrders