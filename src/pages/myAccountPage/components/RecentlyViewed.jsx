import React from 'react'
import { useSelector } from 'react-redux';
import { FaArrowLeft } from 'react-icons/fa';
import { selectAllDishes } from '../../../features/posts/postSlice';
import { useNavigate } from 'react-router-dom';
import './recentlyViewed.css'

const RecentlyViewed = ({toggleActiveNav}) => {

    const navigate = useNavigate()

    const pageWidth=useSelector((state)=>state.promptMessage.pageWidth);
    const myRecentlyViewed= JSON.parse(localStorage.getItem("myRecentlyViewed"));

    const dishes = useSelector(selectAllDishes)

    const recentlyViewedClicked=(id)=>{
        navigate(`/menu/${id}`)
    }

  return (
    <div>
        <div className='recent-view-title'>{pageWidth<1000?<FaArrowLeft onClick={()=>toggleActiveNav(1)}/>:null}Recently Viewed Items</div>
        <div className='recent-view-content'>
            {
                myRecentlyViewed.map((id)=>(
                   dishes.map((dish)=>{
                    if(id===dish._id){
                        return(
                            <div className='recent-view-content-item' onClick={()=>recentlyViewedClicked(dish._id)}>
                                <div className='recent-view-content-item-image'>
                                    {dish.discount>0&& <span className='recent-view-content-item-discount'>{`${dish.discount}% OFF`}</span>}
                                    <img src={dish.dish_image_url} alt="" />
                                </div>
                                <div className='recent-view-content-item-name'>{dish.dishName}</div>
                                <div className='dish-price'>
                                    {`GHS${dish.discount?(dish.price-((dish.discount/100)*dish.price)).toFixed(2):dish.price}`} 
                                    <span className='dish-old-price'>{dish.discount?`GHS${dish.price}`:null}</span>
                                </div>
                            </div>
                        )
                    }
                   })
                ))
            }
        </div>
    </div>
  )
}

export default RecentlyViewed