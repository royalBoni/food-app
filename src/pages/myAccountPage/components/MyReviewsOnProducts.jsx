import React from 'react'
import './myReviewsOnProducts.css'
import { useSelector } from 'react-redux';
import { FaArrowLeft,FaRegStar,FaSpinner } from 'react-icons/fa';
import { useGetTransactionByUserIdMutation } from '../../../features/transactionSlice.js/transaction';
import { useFetchReviewByUserIdMutation } from '../../../features/dishReviews/dishReviewsSlice';
import { useEffect,useState } from 'react';
import { selectAllDishes } from '../../../features/posts/postSlice';
import { useNavigate } from 'react-router-dom';
import { useAddNewReviewMutation } from '../../../features/dishReviews/dishReviewsSlice';
import { useDispatch } from 'react-redux';
import { setPromptMessage,setIsPromptMessage } from '../../../features/actions/actionStateSlice';

const MyReviewsOnProducts = ({toggleActiveNav,customerProfile}) => {

  const dispatch = useDispatch()
  const [toReView,setToReview]=useState(null)
  const [review, setReview]=useState('')
  const [getTransactionByUserId, {data:transactions}] = useGetTransactionByUserIdMutation()
  const [fetchReviewByUserId, {data:myReviews}]= useFetchReviewByUserIdMutation()
  const myId = JSON.parse(localStorage.getItem('myUserId'))

  const dishes = useSelector(selectAllDishes)

  const [addNewReview, {isSuccess,isError,isLoading,error}]=useAddNewReviewMutation()

  if(isSuccess){
    dispatch(setPromptMessage(`review have successfully been added`))
    dispatch(setIsPromptMessage(true)) 
    setTimeout(() => {
        dispatch(setIsPromptMessage(false))
    }, 8000);
    
  }

  const fetchCustomerTransaction = async()=>{
    await getTransactionByUserId({customerId:myId.id }).unwrap() 
    await fetchReviewByUserId({userId:myId.id }).unwrap()
  }

  const returnProductImage = (id)=>{
      const findImage=dishes.find((item)=>item._id===id)
      return findImage.dish_image_url
  }

  
  const navigate= useNavigate()

  const recentlyViewedClicked=(id)=>{
    navigate(`/menu/${id}`)
  }


  useEffect(()=>{
      fetchCustomerTransaction()
  },[])

  // GETTING PURCHASED PRODUCTS WITHOUT REVIEW BY BUYER
  const  unReviewedPuchasedProducts=()=>{

    // GETTING ALL DISHES PURCHASED BY USER
    const dishesArray=[]
    transactions?.data.map((item)=>{
      item.cartItems.map((cartItem)=>{
      
        // ELIMINATING DUPLICATES
          if(dishesArray.find((item)=>item.dishId===cartItem.dishId)){
            return null
          }
          else{
            dishesArray.push(cartItem)
            return
          }
      })
      return;
    })

    /* const isBoughtAndReviewed = []
    myReviews?.data.map((review)=>{
     dishesArray?.map((product)=>{
       if(review?.dishId===product?.dishId){
         isBoughtAndReviewed.push(review)
       }
       return true
     })
    })  */

    const mappedDishAndReview = []
    myReviews?.data.map((review)=>{
      dishesArray?.map((product)=>{
        if(review?.dishId!==product?.dishId){
          mappedDishAndReview.push(product)
        }
        return true
      })
     }) 

     const boughtButNotReviewed =[]
     dishesArray.map((dish)=>{
      const fliteredReviewedProducts=mappedDishAndReview.filter((item)=>dish.dishId===item.dishId)
      if(fliteredReviewedProducts.length===myReviews?.data.length){
        boughtButNotReviewed.push(dish)
      } 
      
     })
    

     return boughtButNotReviewed
  }

  const productsBought =()=>{
     // GETTING ALL DISHES PURCHASED BY USER
     const dishesArray=[]
     transactions?.data.map((item)=>{
       item.cartItems.map((cartItem)=>{
       
         // ELIMINATING DUPLICATES
           if(dishesArray.find((item)=>item.dishId===cartItem.dishId)){
             return null
           }
           else{
             dishesArray.push(cartItem)
           }
       })

     })

     return dishesArray;
  }

  console.log(unReviewedPuchasedProducts())
  console.log(productsBought())


  /* // GETTING PURCHASED PRODUCTS WITHOUT REVIEW BY BUYER
  const  unReviewedPuchasedProducts=()=>{

    // GETTING ALL DISHES PURCHASED BY USER
    const dishesArray=[]
    transactions?.data.map((item)=>{
      item.cartItems.map((cartItem)=>{
      
        // ELIMINATING DUPLICATES
          if(dishesArray.find((item)=>item.dishId===cartItem.dishId)){
            return null
          }
          else{
            dishesArray.push(cartItem)
            return
          }
      })
      return;
    })

    const isBoughtAndReviewed = []
    myReviews?.data.map((review)=>{
     dishesArray?.map((product)=>{
       if(review?.dishId===product?.dishId){
         isBoughtAndReviewed.push(review)
       }
       return true
     })
    }) 
  
  
    const nonReviewedDishes= []
    dishesArray?.map((item)=>{
      isBoughtAndReviewed?.map((rev)=>{
        if(item.dishId!==rev.dishId){
          if(nonReviewedDishes?.find((checkItem)=>checkItem.dishId===item.dishId)){
            return null
          }
          else{
            nonReviewedDishes.push(item)
          } 
        }
      })
    })
 
    //return nonReviewedDishes 
    return isBoughtAndReviewed
  }

  const productsBought =()=>{
     // GETTING ALL DISHES PURCHASED BY USER
     const dishesArray=[]
     transactions?.data.map((item)=>{
       item.cartItems.map((cartItem)=>{
       
         // ELIMINATING DUPLICATES
           if(dishesArray.find((item)=>item.dishId===cartItem.dishId)){
             return null
           }
           else{
             dishesArray.push(cartItem)
           }
       })

     })

     return dishesArray;
  }

  console.log(unReviewedPuchasedProducts())
  console.log(productsBought()) */

  const canSave = [review].every(Boolean) && !isLoading;

  const onSaveReviewClicked = async() => {
    if (canSave) {
         if(window.navigator.onLine){
           try {
             await addNewReview({ userName:`${customerProfile.firstName} ${customerProfile.lastName}`, review, dishId:`${toReView.dishId}`, date:`${new Date()}`, userId:myId.id}).unwrap()  
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



    const pageWidth=useSelector((state)=>state.promptMessage.pageWidth);
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
          <div className='my-review-on-products-title'><FaArrowLeft onClick={()=>setToReview(null)}/>Rate and Review</div>
          <div className="my-review-on-products-form-section">
            <div className="my-review-on-products-form-section-item">
              <div className="my-review-on-products-form-section-item-title">SELECT THE STARS TO RATE THIS PRODUCT</div>
            </div>
            <div className="my-review-on-products-form-section-item">
              <div className="my-review-on-products-form-section-item-title">LEAVE A REEVIEW</div>
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