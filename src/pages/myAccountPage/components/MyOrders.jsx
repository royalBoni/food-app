import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useGetTransactionByUserIdMutation } from '../../../features/transactionSlice.js/transaction'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { FaShoppingBag } from 'react-icons/fa'
import format from 'date-fns/format'
import './myOrders.css'


const MyOrders = ({toggleActiveNav}) => {
    const [getTransactionByUserId, {data}] = useGetTransactionByUserIdMutation()

    const myId= JSON.parse(localStorage.getItem("myUserId"));

    const fetchCustomerTransaction = async()=>{
        await getTransactionByUserId({customerId:myId.id }).unwrap() 
    }

    /* const prosessedDate = (incomingDate)=>{
        format(new Date(transaction.date),'yyyy-MM-dd')

        const date= new Date()
        
    } */

    useEffect(()=>{
        fetchCustomerTransaction()
    },[])
    console.log(data)

    const pageWidth=useSelector((state)=>state.promptMessage.pageWidth);
  return (
    <div className='my-order'>
        <div className='my-order-title'>{pageWidth<1000?<FaArrowLeft onClick={()=>toggleActiveNav(1)}/>:null} Orders</div>
        <div className="my-order-container">
            <h4>Transactions</h4>

            {
                data?.data.map((transaction)=>{
                    return(
                        <div key={transaction._id} className="my-order-container-item">
                            <div className="transact-icons"><FaShoppingBag className='transact-icons-icon'/></div>
                            <div className="transact-info">
                                <div className="transact-info-items">items</div>
                                <div className="transact-info-button">Checked Out</div>
                                <div className="transact-info-date">{format(new Date(transaction.date),'yyyy-MM-dd')}</div>
                            </div>
                            <div className='see-details'><span>See Details</span></div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default MyOrders