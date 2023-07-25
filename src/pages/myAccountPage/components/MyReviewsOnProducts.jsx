import React from 'react'
import './myReviewsOnProducts.css'
import { useSelector } from 'react-redux';
import { FaArrowLeft } from 'react-icons/fa';

const MyReviewsOnProducts = ({toggleActiveNav}) => {

    const pageWidth=useSelector((state)=>state.promptMessage.pageWidth);
  return (
    <div className='my-review-on-products'>
        <div className='my-review-on-products-title'>{pageWidth<1000?<FaArrowLeft onClick={()=>toggleActiveNav(1)}/>:null} Orders</div>
        MyReviewsOnProducts
    </div>
  )
}

export default MyReviewsOnProducts