import React from 'react'
import './myReviewsOnProducts.css'
import { useSelector } from 'react-redux';
import { FaArrowLeft } from 'react-icons/fa';
import { useGetTransactionByUserIdMutation } from '../../../features/transactionSlice.js/transaction';
import { useFetchReviewByUserIdMutation } from '../../../features/dishReviews/dishReviewsSlice';
import { useEffect } from 'react';

const MyReviewsOnProducts = ({toggleActiveNav}) => {

    const [getTransactionByUserId, {data:transactions}] = useGetTransactionByUserIdMutation()
    const [fetchReviewByUserId, {data:myReviews}]= useFetchReviewByUserIdMutation()
    const myId = JSON.parse(localStorage.getItem('myUserId'))

    const fetchCustomerTransaction = async()=>{
      await getTransactionByUserId({customerId:myId.id }).unwrap() 
      await fetchReviewByUserId({userId:myId.id }).unwrap()
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
          //nonReviewedDishes.push(item)
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
/*   console.log(myReviews) */
  /* const reviewsOnBoughtProduct =()=>{
    const isBoughtAndReviewed = []
     myReviews?.data.map((review)=>{
      unReviewedPuchasedProducts()?.map((product)=>{
        if(review?.dishId===product?.dishId){
          isBoughtAndReviewed.push(review)
        }
      })
     })
     return isBoughtAndReviewed
  } */


    const pageWidth=useSelector((state)=>state.promptMessage.pageWidth);
  return (
    <div className='my-review-on-products'>
        <div className='my-review-on-products-title'>{pageWidth<1000?<FaArrowLeft onClick={()=>toggleActiveNav(1)}/>:null} Orders</div>
        MyReviewsOnProducts
    </div>
  )
}

export default MyReviewsOnProducts