import React from 'react'
import './myReviewsOnProducts.css'
import { useSelector } from 'react-redux';
import { FaArrowLeft,FaSpinner,FaStar } from 'react-icons/fa';
import { useEffect,useState } from 'react';
import { selectAllDishes } from '../../../features/posts/postSlice';
import { useNavigate } from 'react-router-dom';
import { useAddNewReviewMutation } from '../../../features/dishReviews/dishReviewsSlice';
import { useDispatch } from 'react-redux';
import { setPromptMessage,setIsPromptMessage } from '../../../features/actions/actionStateSlice';
import { selectAllReviews } from '../../../features/dishReviews/dishReviewsSlice';
import { selectAllTransactionsByUser } from '../../../features/transactionSlice.js/transaction';

const MyReviewsOnProducts = ({toggleActiveNav,customerProfile}) => {

  //ASSIGNMENT AND DECLARATIONS
  const navigate= useNavigate()
  const allReviews= useSelector(selectAllReviews)
  const myTransactions= useSelector(selectAllTransactionsByUser)
  const dispatch = useDispatch()
  const [toReView,setToReview]=useState(null)
  const [review, setReview]=useState('')
  const myId = JSON.parse(localStorage.getItem('myUserId'))
  const numbers=[1,2,3,4,5]
  const [hoveredRateState, setHoveredRateState]=useState(0)
  const [rateSelected,setRateSelected]=useState(0)
  const dishes = useSelector(selectAllDishes)

  const [addNewReview, {isSuccess,isLoading}]=useAddNewReviewMutation()

  //CALLING THE PAGEWIDTH FROM OUR REDUX STORE
  const pageWidth=useSelector((state)=>state.promptMessage.pageWidth);

  //NAVIGATE BACK TO LIST OF UNREVIEWED PRODUCTS AFTER REVIEW SUCCESS STATE IS ACHIEVED
  useEffect(()=>{
    back()
  },[isSuccess])




  // A FUNCTION WHICH FETCHES THE PRODUCT IMAGES IN WITH THE PRODUCT ID
  const returnProductImage = (id)=>{
      const findImage=dishes.find((item)=>item._id===id)
      return findImage.dish_image_url
  }


  // A FUNCTION THAT NAVIGATES US TO THE PRODUCT PAGE WHEN THE PRODUCT IS BEEN CLICKED
  const recentlyViewedClicked=(id)=>{
    navigate(`/menu/${id}`)
  }


  // AN THAT IS USED TO FILTER OUT THE REVIEWS MADE BY THE SPECIFIC USER USING HIS USER ID
  //THIS OPERATION RUNS WHENEVER STATE 'toReview' or 'setToReview' is invoked
  const [reviewsByUser, setReviewsByUser]=useState()
  useEffect(()=>{
      const filteredResults= allReviews.filter((item)=>item.userId===myId.id)
      setReviewsByUser(filteredResults)
  },[setToReview,toReView,allReviews,myId.id,isSuccess])


  // GETTING PURCHASED PRODUCTS WITHOUT REVIEW BY BUYER
  const  unReviewedPuchasedProducts=()=>{

    // GETTING ALL DISHES PURCHASED BY USER
    const dishesArray=[]
    myTransactions.map((item)=>{
      item.cartItems.map((cartItem)=>{
      
        // ELIMINATING DUPLICATES
          if(dishesArray.find((item)=>item.dishId===cartItem.dishId)){
            return null
          }
          else{
            dishesArray.push(cartItem)
          }
          return true
      })
      return true;
    })

    const mappedDishAndReview = []
    reviewsByUser?.map((review)=>{
      dishesArray?.map((product)=>{
        if(review?.dishId!==product?.dishId){
          mappedDishAndReview.push(product)
        }
        return true
      })
      return true
     }) 

     const boughtButNotReviewed =[]
     dishesArray.map((dish)=>{
      const fliteredReviewedProducts=mappedDishAndReview.filter((item)=>dish.dishId===item.dishId)
      if(fliteredReviewedProducts.length===reviewsByUser?.length){
        boughtButNotReviewed.push(dish)
      } 
      return true
     })
  
     return boughtButNotReviewed
  }

  //THIS IS AN OPERATION TO TEST WHETHER ALL REQUIRED INPUTS HAVE BEEN FILLED AND THE REQUEST IS NOT ALREADY IN PLACE.
  //INVOKED BY A CLICK ON THE POST REVIEW
  const canSave = [review].every(Boolean) && !isLoading;


  //THIS FUNCTION IS USED SEND FILLED FORMS TO THE BACKEND FOR PROCESSING. THIS FUNCTION IS INVOKED WHEN THE POST REVIEW BUTTON IS CLICKED
  const onSaveReviewClicked = async() => {
    if (canSave) {
         if(window.navigator.onLine){
           try {
             await addNewReview({ userName:`${customerProfile.firstName} ${customerProfile.lastName}`, review, rate:hoveredRateState, dishId:`${toReView.dishId}`, date:`${new Date()}`, userId:myId.id}).unwrap()  
             } catch (err) {
                 console.error('Failed to save the post', err)
             }
         }
         else{
             dispatch(setPromptMessage(`check your internet connectivity`))
             dispatch(setIsPromptMessage(true)) 
             setTimeout(() => {
                 dispatch(setIsPromptMessage(false))
             }, 8000);
         }
         
     } 
     else{
         dispatch(setPromptMessage(`make sure you have filled all fields`))
         dispatch(setIsPromptMessage(true)) 
         setTimeout(() => {
             dispatch(setIsPromptMessage(false))
         }, 8000);
     }

 }

 //FUNCTION TO SELECT A RATE VALUE FOR THE PRODUCT
 const rateOperaton=(id,operation)=>{
    if(operation==='over'){
      setHoveredRateState(id)
    }

    else if(operation==='clicked'){
      setHoveredRateState(id)
      setRateSelected(id)
    }

    else if(operation==='out'){
      if(rateSelected===0){
        setHoveredRateState(0)
      }
      else{
        setHoveredRateState(rateSelected)
      } 
    }
    
 }

 const back=()=>{
  setToReview(null)
  setReview('')
  setHoveredRateState(0)
  setRateSelected(0)
 }


  return (
    <div className='my-review-on-products'>
      {
        !toReView?
        <>
          <div className='my-review-on-products-title'>{pageWidth<1000?<FaArrowLeft onClick={()=>toggleActiveNav(1)}/>:null} Pending Reviews</div>
          <div className="my-review-on-products-content">
            {
              unReviewedPuchasedProducts()?.map((item)=>{
                return(
                  <div key={item._id} className="my-review-on-products-content-item">
                    <div className="my-review-on-products-content-item-section" onClick={()=>recentlyViewedClicked(item.dishId)}>
                      <div className="review-product-image">
                        <img src={returnProductImage(item.dishId)} alt="" />
                      </div>
                      <div className="review-product-info">
                        <div className="review-product-name">{item.dishName}</div>
                        <div className="review-product-number">{`Order no: ${item._id}`}</div>
                        <div className="review-product-delivery-date">Delivered on:</div>
                      </div>
                    </div>
                    <div className="my-review-on-products-content-item-section" onClick={()=>setToReview(item)}>RATE THIS PRODUCT</div>
                  </div>
                )
              })
            }
          </div>
   
        </>:
        <>
          <div className='my-review-on-products-title'><FaArrowLeft onClick={back}/>Rate and Review</div>
          <div className="my-review-on-products-form-section">

            <div className="my-review-on-products-form-section-item">
              <div className="my-review-on-products-form-section-item-title">
                {
                  pageWidth>756?'SELECT THE STARS TO RATE THIS PRODUCT':'LEAVE A RATE'
                }
              </div>
              <div className="my-review-on-products-form-section-item-content">
                <div className="review-product-image"><img src={returnProductImage(toReView.dishId)} alt="" /></div>
                <div className="review-product-name-and-stars">

                  <div className="review-product-name">{toReView.dishName}</div>
                  <div className="review-product-stars-and-statement">
                    <div className="review-product-stars">
                      <div className="uncolored">
                        {
                          numbers.map((item)=>{
                              return(
                                  <div key={item}><FaStar style={{color:'rgb(124, 105, 120)'}} onMouseOver={()=>rateOperaton(item,'over')} onMouseOut={()=>rateOperaton(item,'out')} onClick={()=>rateOperaton(item,'clicked')}/></div>
                              )
                          })                          
                        }
                      </div>
                      <div className="colored">
                        {
                          numbers.slice(0,hoveredRateState).map((item)=>{
                              return(
                                  <div key={item}><FaStar style={{color:'rgb(241, 110, 23)'}} onMouseOver={()=>rateOperaton(item,'over')} onMouseOut={()=>rateOperaton(item,'out')} onClick={()=>rateOperaton(item,'clicked')}/></div>
                              )
                          })                          
                        }
                      </div>
                    
                    </div>

                    <div className="review-product-statement" style={{color:'green'}}>
                      {
                        hoveredRateState===1?'I hate it!'
                        :hoveredRateState===2?'I dont like it!'
                        :hoveredRateState===3?'I have mixed feelings!'
                        :hoveredRateState===4?'I like it!'
                        :hoveredRateState===5?'I love it!'
                        :null
                      }
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>

            <div className="my-review-on-products-form-section-item">
              <div className="my-review-on-products-form-section-item-title">LEAVE A REVIEW</div>
              <form action="" onSubmit={(e)=>e.preventDefault()}>
              <div className="address-info-form-row">
                <div className="address-info-form-row-item">
                    <label htmlFor="">Title</label>
                    <input type="email" value={customerProfile.gender==='Male'?'Mr':'Mrs'} readOnly/>
                </div>

                <div className="address-info-form-row-item">
                    <label htmlFor="">Your Name</label>
                    <input type="text" value={`${customerProfile.firstName} ${customerProfile.lastName}`} readOnly/>
                </div>
            </div>

            <div className="address-info-form-row">
                <div className="address-info-form-row-item">
                    <label htmlFor="">Review</label>
                    <textarea name="" id="" cols="30" rows="10" placeholder='Tells us more about your rating' value={review} onChange={(e)=>setReview(e.target.value)}></textarea>
                </div>
            </div>
                
            <div className="address-info-form-row">
                <button onClick={onSaveReviewClicked}>{isLoading?<FaSpinner className='loading-animation'/>:'Post Review'}</button>
            </div>
        </form>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default MyReviewsOnProducts