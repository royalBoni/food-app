import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllCustomers } from '../../../features/customers/customersSlice'
import { selectAdminAllProfile } from '../../../features/profiles/profileSlice'

const Customers = () => {
  const customers=useSelector(selectAllCustomers)
  const profiles=useSelector(selectAdminAllProfile)
  console.log(customers)
  console.log(profiles)
  return (
    <div>{JSON.stringify(customers)}</div>
  )
}

export default Customers