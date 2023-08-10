import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllTransactions } from '../../../features/transactionSlice.js/adminTransactionSlice'
import { selectAllCustomers } from '../../../features/customers/customersSlice'
import { selectAdminAllProfile } from '../../../features/profiles/profileSlice'
import { selectAllDishes } from '../../../features/posts/postSlice'
import { useState } from 'react'
import { FaSearch,FaRegCheckCircle ,FaTrash,FaRegEdit,FaRegEye, FaAngleRight, FaAngleLeft} from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { setIsOverPage, setProductId } from '../../../features/actions/actionStateSlice'
import './transaction.css'
import { useEffect } from 'react'
import { tr } from 'date-fns/locale'

const Transaction = () => {

    const dispatch=useDispatch()

    const transactions = useSelector(selectAllTransactions)

    const transactionStatus=['All','Paid','Confirmed','Dispatched','Delivered']

    const [listLowerLimit, setListLowerLimit]=useState(0)
    const [listUpperLimit, setListUpperLimit]=useState(5)

    const customers=useSelector(selectAllCustomers)
    const profiles=useSelector(selectAdminAllProfile)
    const dishes = useSelector(selectAllDishes)

    const [searchInput, setSearchInput]=useState('')
    const [activeStatus, setActiveStatus]=useState(0)
    const [transactionsState, setTransactionsState]=useState()
    
    useEffect(()=>{
        setTransactionsState(transactions)
    },[transactions])

    const onSearchInputChange = (e) => setSearchInput(e.target.value)

    const handleControls=(operation,method)=>{
        if(method==='arrow'){
            if(operation==='move-up'){
                setListLowerLimit(listUpperLimit)
                setListUpperLimit(listUpperLimit+5)
            }
            else{
                setListUpperLimit(listUpperLimit-5)
                setListLowerLimit(listLowerLimit-5)
            }
        }
        else{
            setListUpperLimit(operation*5)
            setListLowerLimit((operation*5)-5)
        }
        
    }

    const arrayRange = (start, stop, step)=>Array.from(
        {length:(stop-start)/step+1},
        (value,index)=>start+index*step
        );


    const listContainers=Math.ceil(transactionsState?.length/5)

    const searchTransactionsByInput =()=>{
        const searchedItems = transactions.filter((item)=>((item._id).toUpperCase()).includes(searchInput))
        setTransactionsState(searchedItems)
    }

    const searchTransactionsByStatus=(status,id)=>{
        setActiveStatus(id)
        handleControls(1,'item')
        if(status==='All'){
            setTransactionsState(transactions)
        }
        else{
            const searchedItems = transactions.filter((item)=>item.purchaseStatus===status)
            setTransactionsState(searchedItems)
        }
    }

    const customerEmail=(id)=>{
        const findEmail=customers.find((item)=>item._id===id)
        return findEmail.customerEmail
    }

    const customerInfo=(id)=>{
        const findEmail=profiles.find((item)=>item.customerId===id)
        return findEmail
    }

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


    const handleActions = async (type, id) =>{

        if(type==="view-transaction"){
          dispatch(setIsOverPage({isOverPage:true, operation:"view-transaction"}))
          dispatch(setProductId(id))
        }
      
        else if(type === "edit-transaction"){
          dispatch(setIsOverPage({isOverPage:true, operation:"edit-transaction"}))
          dispatch(setProductId(id))
        }
      
        }

  return (
    <div className='admin-transaction'>
        <div className="admin-transaction-item">    
          <div className="status-list">
            {
                transactionStatus.map((key,value)=>{
                    return(
                        <div key={value} className={activeStatus===value?'status-list-item-active':'status-list-item'} onClick={()=>searchTransactionsByStatus(key,value)}>{key}</div>
                    )
                })
            }
          </div>
          <div className="input-search">
             <input type="text" placeholder='Search by id' value={searchInput} onChange={onSearchInputChange} />
             <button onClick={searchTransactionsByInput}><FaSearch/></button>
          </div>
      </div>
      <div className="admin-transaction-item">
        <div className="admin-transaction-item-colored-title"><FaRegCheckCircle/> Transaction Order</div>
        <table>
          <thead>
            <tr>
              <th>#id</th>
              <th>Contact Details</th>
              <th>No. Items</th>
              <th>Items</th>
              <th>Delivery Due</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {
                transactionsState?.length>0?
                <>
                    {
                        transactionsState?.slice(listLowerLimit, listUpperLimit).map((item)=>{
                        return(
                            <tr key={item._id}>
                            <td>{item._id.slice(0,12)}...</td>
                            <td>
                                <ul>
                                    <li>{(customerInfo(item.customerId)).firstName}</li>
                                    <li>{customerEmail(item.customerId)}</li>
                                    <li>{(customerInfo(item.customerId)).country}</li>
                                    <li>{(customerInfo(item.customerId)).phoneNumber}</li>
                                </ul>
                            </td>
                            <td>{item.cartItems.length}</td>
                            <td>{returnItemsInCart(item.cartItems)}</td>
                            <td>Next day</td>
                            <td 
                            style={{color:
                            item.purchaseStatus==='Paid'||!item.purchaseStatus?'red'
                            :item.purchaseStatus==='Confirmed'?'gold'
                            :item.purchaseStatus==='Dispatch'?'green'
                            :item.purchaseStatus==='Delivered'?'rgb(124, 105, 120)'
                            :'green'}}>
                                    {item.purchaseStatus?item.purchaseStatus:'Paid'}
                            </td>
                            <td>
                                <div className="action-box">
                                    <FaRegEye className='td-icon' onClick={()=>handleActions("view-transaction",item._id)} />
                                    <FaRegEdit className='td-icon' onClick={()=>handleActions("edit-transaction",item._id)}/>
                                    <FaTrash className='td-icon'  onClick={()=>handleActions("delete",item._id)} />
                                    {/* {
                                    isLoading && dishToDeleteId===item._id?
                                    <FaSpinner className='loading-animation'/>:
                                    <FaTrash className='td-icon' onClick={()=>handleActions("delete",item._id)}/>
                                    } */}
                                </div>
                            </td>
                            </tr>
                                )
                        })
                    }
                </>:
                
                <div className='no-items'>No Transaction</div>
            }
          </tbody>
        </table>
        {
            transactionsState?.length>0&&
            <div className="control-box">
                <button disabled={listLowerLimit<1} onClick={()=>handleControls('move-down','arrow')}><FaAngleLeft /></button>
                <div className="control-box-box">
                {
                    arrayRange(1,listContainers,1).map((item)=>{
                        return(
                            <div key={item} className={item===listUpperLimit/5?'active-control-box-item':'control-box-item'} onClick={()=>handleControls(item,'item')}>{item}</div>
                        )
                    })
                }
                </div>
                <button disabled={listUpperLimit/5>=listContainers} onClick={()=>handleControls('move-up','arrow')}><FaAngleRight /></button>
            </div>
        }
      </div>
    </div>
  )
}

export default Transaction