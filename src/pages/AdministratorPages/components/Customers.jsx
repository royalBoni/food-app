import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllCustomers } from '../../../features/customers/customersSlice'

const Customers = () => {
  const customers=useSelector(selectAllCustomers)
  console.log(customers)
  return (
    <div>{JSON.stringify(customers)}</div>
  )
}

export default Customers