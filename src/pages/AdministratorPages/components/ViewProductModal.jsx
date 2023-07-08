import React from 'react'
import "./viewProductModal.css"
import { useSelector,useDispatch  } from 'react-redux'
import { setIsOverPage } from '../../../features/actions/actionStateSlice'
import { selectDishById } from '../../../features/posts/postSlice'
import { FaTimes, FaTimesCircle } from 'react-icons/fa'

const ViewProductModal = () => {
    const dispatch = useDispatch()
    const productId=useSelector((state)=>state.promptMessage.productId);
    const singleDish = useSelector((state)=>selectDishById(state,productId))
    
  return (
    <div className='view-product-modal'>
        <div className='modal-close-btn' onClick={()=>dispatch(setIsOverPage(false))}><FaTimes/></div>
       {/*  {
           JSON.stringify(singleDish)
        } */}
        <div className="view-modal-division">
          <img src={singleDish?.dish_image_url} alt="" />
        </div>
        <div className="view-modal-division">
          <div className="view-modal-division-row">
            <div className="label">Name:</div>
            <div className="view-modal-division-row-item">{singleDish.dishName}</div>
          </div>

          <div className="view-modal-division-row">
            <div className="label">Price:</div>
            <div className="view-modal-division-row-item">{singleDish.price}</div>
          </div>

          <div className="view-modal-division-row">
            <div className="label">Catch Phrase:</div>
            <div className="view-modal-division-row-item">{singleDish.catchPhrase}</div>
          </div>

          <div className="view-modal-division-row">
            <div className="label">Discount:</div>
            <div className="view-modal-division-row-item">{singleDish.discount}</div>
          </div>

          <div className="view-modal-division-row">
            <div className="label">Categories:</div>
            <div className="view-modal-division-row-item">
              {
              singleDish.category.map((category)=>(`${category} : `))
              }
            </div>
          </div>

          <div className="view-modal-division-row">
            <div className="label">Date created:</div>
            <div className="view-modal-division-row-item">{singleDish.date}</div>
          </div>

          <div className="view-modal-division-row">
            <div className="label">Description:</div>
            <div className="view-modal-division-row-item">{singleDish.description?.slice(0,500)}</div>
          </div>

        </div>
    </div>
  )
}

export default ViewProductModal