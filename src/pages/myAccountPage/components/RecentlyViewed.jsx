import React from 'react'
import { useSelector } from 'react-redux';
import { FaArrowLeft } from 'react-icons/fa';
import './recentlyViewed.css'

const RecentlyViewed = ({toggleActiveNav}) => {

    const pageWidth=useSelector((state)=>state.promptMessage.pageWidth);

  return (
    <div>
        <div className='recent-view-title'>{pageWidth<1000?<FaArrowLeft onClick={()=>toggleActiveNav(1)}/>:null}Recently Viewed Items</div>
        RecentlyViewed
    </div>
  )
}

export default RecentlyViewed