import React, { useState,useEffect } from 'react'
import './checkout.css'
import { selectAllDishes } from '../../features/posts/postSlice'
import { FaInfoCircle, FaSpinner, FaCheck,FaTimes } from 'react-icons/fa'
import { setPromptMessage,setIsPromptMessage } from '../../features/actions/actionStateSlice'
import { useDispatch, useSelector } from 'react-redux'
import { countries } from '../../assets/info/infoData'
import { useFetchMyCouponMutation } from '../../features/coupons/couponSlice'
import { useAddNewTransactionMutation } from '../../features/transactionSlice.js/transaction'
import { selectAllCarts } from '../../features/cart/cartSlice'
import { Link } from 'react-router-dom'

const CheckOut = () => {
    
    const [openCouponForm,setOpenCouponForm]=useState(false)
    const [activateCouponButton,setActivateCouponButton]=useState(false)
    const [isSuccessState,setIsSuccessState] = useState(false)
    /* const myCart = JSON.parse(localStorage.getItem("myCartItems")) */
    const myCart= useSelector(selectAllCarts); 
    const customerId= JSON.parse(localStorage.getItem('myUserId'))
    const [couponRate,setCouponRate] = useState(0)

    const dispatch =useDispatch()

    const allDishes = useSelector(selectAllDishes)


    /* const [fetchMyCoupon, {data,isError,error}]=useFetchMyCouponMutation() */
    const [addNewTransaction, {data,isSuccess,isLoading}] = useAddNewTransactionMutation()

    useEffect(()=>{
       if(data){
        setIsSuccessState(true)
       }
    },[data])

    const closeSuccessModal =()=>{
        setIsSuccessState(false)
    }

   
    /* DECLARING USER INPUT STATES */
    const [couponInput,setCouponInput] = useState('')
    const [firstNameInput,setFirstNameInput] = useState('')
    const [lastNameInput,setLastNameInput] = useState('')
    const [companyNameInput,setCompanyNameInput] = useState('')
    const [countryNameInput,setCountryNameInput]=useState('')
    const [streetNameInput,setStreetNameInput]=useState('')
    const [postCodeInput,setPostCodeInput]=useState('')
    const [townNameInput,setTownNameInput]=useState('')
    const [phoneInput,setPhoneInput]=useState('')
    const [emailInput,setEmailInput]=useState('')
    const [otherNotesInput,setOtherNotesInput]=useState('')
    const [modeOfPaymentInput,setModeOfPaymentInput]=useState('')


    const listOfModeOfPayment = ['BankCard', 'Crypto', 'Paypal', 'MobileMoney']

    /* INPUT ERROR FLAG STATE */
    const [flagFirstNameInput,setFlagFirstNameInput]=useState(false)
    const [flagLastNameInput,setFlagLastNameInput] = useState(false)
    const [flagCountryNameInput,setFlagCountryNameInput]=useState(false)
    const [flagStreetNameInput,setFlagStreetNameInput]=useState(false)
    const [flagPostCodeInput,setFlagPostCodeInput]=useState(false)
    const [flagTownNameInput,setFlagTownNameInput]=useState(false)
    const [flagPhoneInput,setFlagPhoneInput]=useState(false)
    const [flagEmailInput,setFlagEmailInput]=useState(false)
    const [flagModeOfInputPayment,setFlagModeOfInputPayment]=useState(false)

    /* CREATING ONCHAGE FUNCTION FOR EACH INPUT EVENT */
    const onChangeCouponInput = (e) => {setCouponInput(e.target.value)}
    const onChangeFirstNameInput = (e) => {setFirstNameInput(e.target.value)}
    const onChangeLastNameInput = (e) => {setLastNameInput(e.target.value)}
    const onChangeCompanyNameInput = (e) => {setCompanyNameInput(e.target.value)}
    const OnSelectCountry =(e)=>{setCountryNameInput(e.target.value)}
    const onChangeStreetNameInput = (e) => {setStreetNameInput(e.target.value)}
    const onChangePostCodeInput = (e) => {setPostCodeInput(e.target.value)}
    const onChangeTownNameInput = (e) => {setTownNameInput(e.target.value)}
    const onChangePhoneInput = (e) => {setPhoneInput(e.target.value)}
    const onChangeEmailInput = (e) => {setEmailInput(e.target.value)}
    const onChangeOtherNotesInput = (e) => {setOtherNotesInput(e.target.value)}
    const onChangeModeOfPaymentInput= (e) =>{setModeOfPaymentInput(e.target.value)}

     
    /* VALIDATING COUPON INPUT  */
    useEffect(()=>{
        couponInput.length > 3 ? setActivateCouponButton(true) : setActivateCouponButton(false);
    },[couponInput.length])

    
    /* COMPUTING THE GENERAL TOTAL AMOUNT PAYABLE */
    let total=0

    myCart?.map((item)=>{
      total+=(item.price-((item.discount/100)*item.price))*item.quantity
      return total
    })
 

    let countryOfOrigin = 'ghana';

    /* OPERATION TO CHECK WHETHER ALL MANDATORY INPUT SECTIONS WERE FILLED */
    const isAllEntered = [firstNameInput, lastNameInput, countryNameInput, streetNameInput,postCodeInput,townNameInput,phoneInput,emailInput,modeOfPaymentInput].every(Boolean)

    /* CREATING PAYMENT INFO OBJECT */

    const paymentInfoObject = {couponInput,firstNameInput,lastNameInput,companyNameInput,countryNameInput,streetNameInput,postCodeInput,
    townNameInput,phoneInput,emailInput,otherNotesInput,modeOfPaymentInput,amountPayable:(total-((couponRate/100)*total)).toFixed(2),
    customerId:customerId.id,couponRate}

    /* OPERATIONS FOR THE PLACE ORDER BUTTON EVENT */

    const handlePlaceOrder =async() =>{
        if(myCart.length===0){
            dispatch(setIsPromptMessage(true))
            dispatch(setPromptMessage('you can not place order on an empty cart'))
            setTimeout(() => {
                dispatch(setIsPromptMessage(false))
            }, 8000);
        }
        else{
            if(isAllEntered){
                console.log(paymentInfoObject)
                try{
                    await addNewTransaction({paymentInfoObject}).unwrap()
                }
                catch(err){
                    console.log(err)
                    dispatch(setIsPromptMessage(true))
                    dispatch(setPromptMessage(err?.data.data))
                    setTimeout(() => {
                        dispatch(setIsPromptMessage(false))
                    }, 8000);
                }
            }
    
            else{
            /* CHECKING INDIVIDUAL INPUT FIELDS WHETHER A MANDATORY INPUT WAS NOT ENTERED IN OTHER TO FLAG INDIVIDUAL ERROR ICON */
    
            !firstNameInput?setFlagFirstNameInput(true):setFlagFirstNameInput(false);
            !lastNameInput? setFlagLastNameInput(true):setFlagLastNameInput(false);
            !countryNameInput? setFlagCountryNameInput(true):setFlagCountryNameInput(false)
            !streetNameInput? setFlagStreetNameInput(true):setFlagStreetNameInput(false)
            !postCodeInput? setFlagPostCodeInput(true):setFlagPostCodeInput(false)
            !townNameInput? setFlagTownNameInput(true):setFlagTownNameInput(false)
            !phoneInput? setFlagPhoneInput(true):setFlagPhoneInput(false)
            !emailInput? setFlagEmailInput(true):setFlagEmailInput(false)
            !modeOfPaymentInput? setFlagModeOfInputPayment(true):setFlagModeOfInputPayment(false)
    
    
            dispatch(setIsPromptMessage(true))
            dispatch(setPromptMessage('make sure to insert all mandatory inputs'))
    
            setTimeout(() => {
                dispatch(setIsPromptMessage(false))
            }, 8000);
            }
        }

    }


    /* OPERATIONS FOR THE APPLY COUPON BUTTON EVENT */
    const [isFetchingCoupon,setIsFetchingCoupon]=useState(false)
    const handleApplyCoupon=async()=>{
        if(window.navigator.onLine){
            try {
                setIsFetchingCoupon(true)
                /* await fetchMyCoupon({code:couponInput}).unwrap() */
                const fetchCoupon = await fetch(`http://localhost:5000/coupon/${couponInput}`)
                const couponValue = await fetchCoupon.json()
                if(fetchCoupon.ok){
                    setCouponRate(couponValue.data.value)
                }
                else{
                    dispatch(setIsPromptMessage(true))
                    dispatch(setPromptMessage(couponValue.data))
                    setTimeout(() => {
                        dispatch(setIsPromptMessage(false))
                    }, 8000);
                }
                
            } 
            catch (err) {
                if(err.message==='Failed to fetch'){
                    dispatch(setIsPromptMessage(true))
                    dispatch(setPromptMessage(`network or server might be down`))
                    setTimeout(() => {
                        dispatch(setIsPromptMessage(false))
                    }, 8000);
                  }
                  else{
                    dispatch(setIsPromptMessage(true))
                    dispatch(setPromptMessage(`Error: ${err.message}`))
                    setTimeout(() => {
                        dispatch(setIsPromptMessage(false))
                    }, 8000);
                  }
            }
            finally{
                setIsFetchingCoupon(false)
            }
        }
        else{
            dispatch(setIsPromptMessage(true))
            dispatch(setPromptMessage('check your internet connectivity'))
            setTimeout(() => {
                dispatch(setIsPromptMessage(false))
            }, 8000);
        }
    }

    /* FUNCTION FOR THE OUTPUT OF EACH DISH IMAGE */
    const productImage=(id)=>{
        const findDish = allDishes.find((dish)=>dish._id===id)
        return findDish?.dish_image_url
    }

  return (
    <div className='checkout'>
        {
            isLoading?
            <div className="animation-container">
                <div className="animation-sub-container">
                    <FaSpinner className='loading-animation'/>
                    <p>Placing Order</p>
                </div>
                
            </div>:
            isSuccessState?
            <div className="animation-container">
                <div className="animation-sub-container">
                    <div className='close-btn' onClick={closeSuccessModal}><FaTimes/></div>
                    <FaCheck/>
                    <p>{`Order Checkout with ID:${data?.data._id} Placed Successfully`}</p>
                    <Link to='/gg' className='transaction-history-link'>Transaction History</Link>
                </div>
                
            </div>:
            null
            
        }
        <p>Have a coupon? <span className='click-coupon' onClick={()=>setOpenCouponForm(!openCouponForm)}>Click here to enter your code</span></p>
        
       
        <form action="" className={openCouponForm?"coupon-form":"no-coupon-form"} onSubmit={(e)=>e.preventDefault()}>
            <p htmlFor="coupon">If you have a coupon code, please enter it below</p>
            <input type="text" name='coupon' value={couponInput} onChange={onChangeCouponInput}/>
            <button 
            disabled={!activateCouponButton} 
            onClick={handleApplyCoupon} 
            className={!activateCouponButton?'coupon-form-button-inactive':'.coupon-form-button-active'}>
                {isFetchingCoupon?<FaSpinner className='loading-animation'/>:'Apply coupon'}
            </button>
        </form>
       

        <div className="checkout-sections">
            <div className="checkout-sections-item">
                <h1>Billing details</h1>
                <form action="" onSubmit={(e)=>e.preventDefault()}>
                    <div className="checkout-form-row">
                        <label htmlFor="first-name">First name *</label>
                        <div className="input">
                            <input type="text" id='first-name' value={firstNameInput} onChange={onChangeFirstNameInput} />
                            {
                                flagFirstNameInput&&
                                <FaInfoCircle className='input-warning'/>
                            }
                        </div>
                    </div>

                    <div className="checkout-form-row">
                        <label htmlFor="last-name">Last name *</label>
                        
                        <div className="input">
                            <input type="text" id='last-name' value={lastNameInput} onChange={onChangeLastNameInput}/>
                            {
                                flagLastNameInput&&
                                <FaInfoCircle className='input-warning'/>
                            }
                        </div>
                    </div>

                    <div className="checkout-form-row">
                        <label htmlFor="company-name">Company name(optional)</label>
                        <div className="input">
                            <input type="text" id='company-name' value={companyNameInput} onChange={onChangeCompanyNameInput}/>
                           
                        </div>
                    </div>

                    <div className="checkout-form-row">
                        <label htmlFor="country">Country /Region *</label>
                        <div className="input">
                            <select id='country' value={countryNameInput} onChange={OnSelectCountry}>
                                <option value=""></option>
                                {
                                    countries.map((country)=>{
                                        return(
                                            <option key={country.id} value={country.country}>{country.country}</option>
                                        )
                                    })
                                }
                            </select>
                            {
                                flagCountryNameInput &&
                                <FaInfoCircle className='input-warning'/>
                            }
                          
                        </div>
                    </div>

                    <div className="checkout-form-row">
                        <label htmlFor="street-address">Street address *</label>
                        <div className="input">
                            <input type="text" id='street-address' value={streetNameInput} onChange={onChangeStreetNameInput}/>
                            {
                                flagStreetNameInput &&
                                <FaInfoCircle className='input-warning'/>
                            }
                        </div>
                    </div>

                    <div className="checkout-form-row">
                        <label htmlFor="post-code">Postcode /ZIP *</label>
                        <div className="input">
                            <input type="text" id='post-code' value={postCodeInput} onChange={onChangePostCodeInput}/>    
                            {
                                flagPostCodeInput &&
                                <FaInfoCircle className='input-warning'/>
                            }
                        </div>
                    </div>

                    <div className="checkout-form-row">
                        <label htmlFor="town-city">Town /City *</label>
                        <div className="input">
                            <input type="text" id='town-city' value={townNameInput} onChange={onChangeTownNameInput}/>    
                            {
                                flagTownNameInput &&
                                <FaInfoCircle className='input-warning'/>
                            }
                        </div>
                    </div>

                    <div className="checkout-form-row">
                        <label htmlFor="phone">Phone *</label>
                        
                        <div className="input">
                            <input type='tel' id='phone' value={phoneInput} onChange={onChangePhoneInput}/>    
                            {
                                flagPhoneInput &&
                                <FaInfoCircle className='input-warning'/>
                            }
                        </div>
                    </div>

                    <div className="checkout-form-row">
                        <label htmlFor="email">Email *</label>
                        <div className="input">
                            <input type="email" id='email' value={emailInput} onChange={onChangeEmailInput}/>    
                            {
                                flagEmailInput &&
                                <FaInfoCircle className='input-warning'/>
                            }
                        </div>
                    </div>

                    <div className="checkout-form-row">
                        <label >Method of payment *</label>
                        <div className="input">
                            <div className="mode-of-payment-input">
                                {
                                    listOfModeOfPayment.map((value,key)=>{
                                        return(
                                            <div key={key} className="mode-of-payment-input-item">
                                                <input type='radio' name='payment' value={value}
                                                checked={modeOfPaymentInput===value} onChange={onChangeModeOfPaymentInput}
                                                />
                                                <label htmlFor={value}>{value}</label>
                                            </div>
                                           
                                        )
                                    })
                                }
                            </div>
                            {
                                flagModeOfInputPayment &&
                                <FaInfoCircle className='input-warning'/>
                            }
                        </div>
                    </div>

                    <h1>Additional information</h1>

                    <div className="checkout-form-row">
                        <label htmlFor="email">Order notes(optional)</label>
                        <textarea name="order-note" id="email" cols="30" rows="10"  value={otherNotesInput} onChange={onChangeOtherNotesInput}/>
                    </div>

                </form>
            </div>
            <div className="checkout-sections-item">
                <h1>Your order</h1>
                <table>
                    <thead>
                        <tr>
                            <th>PRODUCT</th>
                            <th>SUB AMOUNT</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            myCart?.map((item)=>{
                                return(
                                    <tr key={item._id}>
                                        <td>
                                            <div className='product-image'>
                                                <img src={productImage(item.dishId)} alt="" />
                                                {item.discount>0&& <span className='discount-banner'>{`${item.discount}% OFF`}</span>}
                                            </div> 
                                            <div className='product-info'>
                                                <p>{item.dishName}</p>
                                                {`${item.price} * ${item.quantity}`}
                                            </div>
                                            
                                        </td>

                                        <td>{`GHS${((item.price-((item.discount/100)*item.price))*item.quantity).toFixed(2)}`}</td>
                                    </tr>
                                )
                            })
                        }

                        <tr>
                            <td>SUBTOTAL</td>
                            <td>{`GHS${total.toFixed(2)}`}</td>
                        </tr>
                        
                        <tr>
                            <td>COUPON</td>
                            <td>{`-${/* couponItem?.value */ couponRate}%`}</td>
                        </tr>

                        <tr>
                            <td>VAT</td>
                            <td>+0</td>
                        </tr>

                        <tr>
                            <th>TOTAL AMOUNT PAYABLE</th>
                            <th>{`GHS${(total-((couponRate/100)*total)).toFixed(2)}`}</th>
                        </tr>
                    </tbody>
                </table>

                <div className="placeOrderOrNot">
                    {
                        !countryOfOrigin &&
                        <p className="cant-place-order-warning">
                            Sorry, it seems there are no available payment methods for your country or state.
                            Please contact us if you require an assistance or wish to make an alternate arrangements.
                        </p>
                    }

                    <div className="place-order-button-container">
                        <button disabled={!countryOfOrigin?true:false} onClick={handlePlaceOrder}>{isLoading?'loading':'PLACE ORDER'}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CheckOut