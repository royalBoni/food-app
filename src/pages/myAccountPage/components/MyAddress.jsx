import React from 'react'
import './myAddress.css'
import { useSelector } from 'react-redux';
import { FaArrowLeft, FaPen } from 'react-icons/fa';
import { useState } from 'react';
import AddressForm from './AddressForm';

const MyAddress = ({toggleActiveNav, customerAddress, myProfile}) => {

    const [addressOperation, setAddressOperation]=useState(0)
    const pageWidth=useSelector((state)=>state.promptMessage.pageWidth);

  return (
    <div className='myAddress'>
        {
            addressOperation===0?
            <>
                <div className='myAddress-title'>{pageWidth<1000?<FaArrowLeft onClick={()=>toggleActiveNav(1)}/>:null}My Address</div>
                <div className="myAddress-content">
                    {
                        customerAddress.length>0?
                            customerAddress?.slice(0,1).map((address)=>{
                                return(
                                    <div key={address._id} className="my-royal-container-item-content-address">
                                        <p>{`${address.firstName} ${address.lastName}`}</p>
                                        <p>{address.address}</p>
                                        <p>{`${address.city}, ${address.region}`}</p>
                                        <p>{`${address.phoneNumber}, ${address.additionalPhoneNumber}`}</p>

                                        <p onClick={()=>setAddressOperation(2)}><span>Edit <FaPen className='title-icon'/></span></p>
                                        <p onClick={()=>setAddressOperation(3)}><span>Add <FaPen className='title-icon'/></span></p>
                                    </div>
                                    )
                                    }):
                                    
                            <p>
                                <span>Add an Address</span>
                            </p>
                    }
                </div>
            </>:
            <div className="adrress-form">
                <AddressForm
                myProfile={myProfile}
                customerAddress={customerAddress[0]}
                setAddressOperation={setAddressOperation}
                addressOperation={addressOperation}/>
            </div>
            
        }
        
    </div>
  )
}

export default MyAddress