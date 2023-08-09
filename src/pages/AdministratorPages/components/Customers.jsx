import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllCustomers } from '../../../features/customers/customersSlice'
import { selectAdminAllProfile } from '../../../features/profiles/profileSlice'
import { FaSortNumericUp,FaSortNumericDown,FaSearch,FaArrowDown,FaArrowUp,FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa'
import { selectAllTransactions } from '../../../features/transactionSlice.js/transaction'
import { useState } from 'react'
import format from 'date-fns/format'
import './customer.css'

const Customers = () => {
  const customers=useSelector(selectAllCustomers)
  const profiles=useSelector(selectAdminAllProfile)
  const transactions=useSelector(selectAllTransactions)

  const [sortId,setSortId] = useState(null)
  const [customersState, setCustomerState]=useState(profiles)
  const [searchInput, setSearchInput]=useState('')

  const onSearchInputChange = (e) => setSearchInput(e.target.value)

  const NavBoard =({sortBy})=>{
    return(
      <ul className="nav-board">
        <li onClick={()=>sortOrder(sortBy,'ascending')}><FaArrowDown/>Ascending</li>
        <li onClick={()=>sortOrder(sortBy,'descending')}><FaArrowUp/>Descending</li>
      </ul>
    )
  }

  const onClickOutsideListener = () => {
    setSortId(null)
    document.removeEventListener("click", onClickOutsideListener)
  }


  const onClickOutsideAction = () => {
    document.addEventListener("click", onClickOutsideListener)
    
  }

  const searchCustomersByInput =()=>{
    const searchedItems = profiles.filter((item)=>((item.firstName).toUpperCase()).includes(searchInput.toUpperCase()))
    setCustomerState(searchedItems)
  }

  const sortOrder = (sortBy,order) =>{
    const sortedItems = profiles.sort((a,b)=>{
     if(sortBy==="transaction"&&order==="ascending"){
        return (customerTransactions(a.customerId)).length - (customerTransactions(b.customerId)).length
      }

      else if(sortBy==="transaction"&&order==="descending"){
        return (customerTransactions(b.customerId)).length - (customerTransactions(a.customerId)).length
      } 

      if(sortBy==="items-bought"&&order==="ascending"){
        return (customerNumberOfItemsBought(a.customerId)) - (customerNumberOfItemsBought(b.customerId))
      }

      else if(sortBy==="items-bought"&&order==="descending"){
        return (customerNumberOfItemsBought(b.customerId)) - (customerNumberOfItemsBought(a.customerId))
      } 

      else if(sortBy==="name"&&order==="ascending"){
        const nameA = a.firstName.toUpperCase(); // ignore upper and lowercase
        const nameB = b.firstName.toUpperCase(); // ignore upper and lowercase
        if (nameA > nameB) {
          return 1;
        }
        if (nameA < nameB) {
          return -1;
        }

        // names must be equal
        return 0;
      }

      else if(sortBy==="name"&&order==="descending"){
        const nameA = a.firstName.toUpperCase(); // ignore upper and lowercase
        const nameB = b.firstName.toUpperCase(); // ignore upper and lowercase
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      }

      else if(sortBy==="gender"&&order==="ascending"){
        const nameA = a.gender; // ignore upper and lowercase
        const nameB = b.gender; // ignore upper and lowercase
        if (nameA > nameB) {
          return 1;
        }
        if (nameA < nameB) {
          return -1;
        }

        // names must be equal
        return 0;
      }

      else if(sortBy==="gender"&&order==="descending"){
        const nameA = a.gender; // ignore upper and lowercase
        const nameB = b.gender; // ignore upper and lowercase
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      } 


      else if(sortBy==="country"&&order==="ascending"){
        const nameA = a.country; // ignore upper and lowercase
        const nameB = b.country; // ignore upper and lowercase
        if (nameA > nameB) {
          return 1;
        }
        if (nameA < nameB) {
          return -1;
        }

        // names must be equal
        return 0;
      }

      else if(sortBy==="country"&&order==="descending"){
        const nameA = a.country; // ignore upper and lowercase
        const nameB = b.country; // ignore upper and lowercase
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      }

      
    }) 

    setCustomerState(sortedItems)
  } 

  const customerTransactions=(id)=>{
    const findTransactions=transactions.filter((item)=>item.customerId===id)
    return findTransactions
  }

  const customerEmail=(id)=>{
    const findEmail=customers.find((item)=>item._id===id)
    return findEmail.customerEmail
  }

  const customerNumberOfItemsBought=(id)=>{
    const itemsBought=[]
    customerTransactions(id)?.map((transactionItem)=>{
      (transactionItem.cartItems).map((item)=>{
        itemsBought.push(item)
      })
    })

    return itemsBought.length 
  }

  const customerDateCreated =(id)=>{
    const findDate=customers.find((item)=>item._id===id)
    return format(new Date(findDate.date),'yyyy-MM-dd')
  }

  return (
    <div className='admin-customers'>
      <div className="admin-customers-item">    
          <div className="section-header-title">
            {`${customersState.length} CUSTOMERS`}
          </div>
          <div className="input-search">
             <input type="text" placeholder='Search by name' value={searchInput} onChange={onSearchInputChange} />
             <button onClick={searchCustomersByInput}><FaSearch/></button>
          </div>
      </div>
      <div className="admin-customers-item">
        <table>
          <thead>
            <tr>
              <th>
                <div className="th-content">
                  Customer Name
                  <FaSortAlphaDown className="th-content-icon" onClick={()=>setSortId(1)}  onMouseLeave={onClickOutsideAction}/>
                  {
                    sortId===1?<NavBoard sortBy={'name'}/>:null
                  }
                </div>
              </th>
              <th>Date Created</th>
              <th>Email</th>
              <th>
                <div className="th-content">
                  Country
                  <FaSortAlphaUp className="th-content-icon" onClick={()=>setSortId(2)} onMouseLeave={onClickOutsideAction}/>
                  {
                    sortId===2?<NavBoard sortBy={'country'}/>:null
                  }
                </div>
              </th>
              <th>
                <div className="th-content">
                  No.Transaction
                  <FaSortNumericUp className="th-content-icon" onClick={()=>setSortId(3)} onMouseLeave={onClickOutsideAction}/>
                  {
                    sortId===3?<NavBoard sortBy={'transaction'}/>:null
                  }
                </div>
              </th>
              <th>
                <div className="th-content">
                  No.Items Bought
                  <FaSortNumericUp className="th-content-icon" onClick={()=>setSortId(4)} onMouseLeave={onClickOutsideAction}/>
                  {
                    sortId===4?<NavBoard sortBy={'items-bought'}/>:null
                  }
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
          {
            customersState?.map((item)=>{
              return(
                <tr key={item._id}>
                  <td>{item.firstName}</td>
                  <td>{customerDateCreated(item.customerId)}</td>
                  <td>{customerEmail(item.customerId)}</td>
                  <td>{item.country}</td>
                  <td>{customerTransactions(item.customerId).length}</td>
                  <td>{customerNumberOfItemsBought(item.customerId)}</td>
                </tr>
                    )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Customers