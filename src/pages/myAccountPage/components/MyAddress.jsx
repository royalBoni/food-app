import React from 'react'
import './myAddress.css'
import { useSelector } from 'react-redux';
import { FaArrowLeft, FaPen } from 'react-icons/fa';
import { useState } from 'react';
import AddressForm from './AddressForm';
import { FaPlus } from 'react-icons/fa';

                    //DESTRUCTURING ITEMS DRILLED OR PASSED INTO COMPONENT
const MyAddress = ({toggleActiveNav, customerAddress, customerProfile}) => {

    //ASSIGNMENT AND DECLARATION
    const [addressOperation, setAddressOperation]=useState(0) //STATE TO SWITCH BETWEEN ADDRESS DISPLAY AND ADDRESS EDIT
    const pageWidth=useSelector((state)=>state.promptMessage.pageWidth);

  return (
    <div className='myAddress'>
        {
            addressOperation===0?//ADDRESS INFO SET TO 0 DISPLAYS THE USER ADDRESS
            <>
                <div className='myAddress-title'>{pageWidth<1000?<FaArrowLeft onClick={()=>toggleActiveNav(1)}/>:null}
                    My Address 
                    <div onClick={()=>setAddressOperation(3)}>{/* ADDRESS INFO SET TO 3 INVOKES ADDRESS FORM COMPONENTS TO ADD ADDRESS */}
                        <div className={pageWidth>768?'add-address-btn':'add-btn-address-mobile'}>
                            {pageWidth>768?'Add a New Address':<FaPlus/>}
                        </div>
                    </div>
                </div>
                <div className="myAddress-content">
                    {
                        customerAddress.length>0?
                            customerAddress?.slice(0,1).map((address)=>{
                                return(
                                    <div key={address._id} className="myAddress-content-item">
                                        <p>{`${address.firstName} ${address.lastName}`}</p>
                                        <p>{address.address}</p>
                                        <p>{`${address.city}, ${address.region}`}</p>
                                        <p>{`${address.phoneNumber}, ${address.additionalPhoneNumber}`}</p>

                                        <p onClick={()=>setAddressOperation(2)}><span>Edit <FaPen className='title-icon'/></span></p>
                                    </div>
                                    )
                                    }):
                                    
                            <p>
                                <span>Add an Address</span>
                            </p>
                    }
                </div>
            </>: //ADDRESS INFO SET TO ANY 1 INVOKES ADDRESS FORM COMPONENTS TO EDIT ADDRESS
            <div className="adrress-form">
                <AddressForm
                customerProfile={customerProfile}
                customerAddress={customerAddress[0]}
                setAddressOperation={setAddressOperation}
                addressOperation={addressOperation}/>
            </div>
            
        }
        
    </div>
  )
}

export default MyAddress