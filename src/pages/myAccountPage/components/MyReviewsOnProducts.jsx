import React from 'react'
import './myReviewsOnProducts.css'
import { useSelector } from 'react-redux';
import { FaArrowLeft } from 'react-icons/fa';
import { useGetTransactionByUserIdMutation } from '../../../features/transactionSlice.js/transaction';
import { useFetchReviewByUserIdMutation } from '../../../features/dishReviews/dishReviewsSlice';
import { useEffect } from 'react';
import { selectAllDishes } from '../../../features/posts/postSlice';

const MyReviewsOnProducts = ({toggleActiveNav}) => {

    const [getTransactionByUserId, {data:transactions}] = useGetTransactionByUserIdMutation()
    const [fetchReviewByUserId, {data:myReviews}]= useFetchReviewByUserIdMutation()
    const myId = JSON.parse(localStorage.getItem('myUserId'))

    const dishes = useSelector(selectAllDishes)

    const fetchCustomerTransaction = async()=>{
      await getTransactionByUserId({customerId:myId.id }).unwrap() 
      await fetchReviewByUserId({userId:myId.id }).unwrap()
  }

  const returnProductImage = (id)=>{
    const findImage=dishes.find((item)=>item._id===id)
    return findImage.dish_image_url
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
    dishesArray.map((item)=>{
      isBoughtAndReviewed.map((rev)=>{
        if(item.dishId!==rev.dishId){
          if(nonReviewedDishes.find((checkItem)=>checkItem.dishId===item.dishId)){
            return null
          }
          else{
            nonReviewedDishes.push(item)
          } 
        }
      })
    })
 
    return nonReviewedDishes
  }

  console.log(unReviewedPuchasedProducts())


    const pageWidth=useSelector((state)=>state.promptMessage.pageWidth);
  return (
    <div className='my-review-on-products'>
        <div className='my-review-on-products-title'>{pageWidth<1000?<FaArrowLeft onClick={()=>toggleActiveNav(1)}/>:null} Pending Reviews</div>
        <div className="my-review-on-products-content">
          {
            unReviewedPuchasedProducts()?.map((item)=>{
              return(
                <div key={item._id} className="my-review-on-products-content-item">
                  <div className="my-review-on-products-content-item-section">
                    <div className="review-product-image">
                      <img src={returnProductImage(item.dishId)} alt="" />
                    </div>
                    <div className="review-product-info">
                      <div className="review-product-name">{item.dishName}</div>
                      <div className="review-product-number">{`Order no: ${item._id}`}</div>
                      <div className="review-product-delivery-date">Delivered on:</div>
                    </div>
                  </div>
                  <div className="my-review-on-products-content-item-section">RATE THIS PRODUCT</div>
                </div>
              )
            })
          }
        </div>
    </div>
  )
}

export default MyReviewsOnProducts