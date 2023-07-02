import React, { useState } from 'react'
import './products.css'
import { selectAllDishes } from '../../../features/posts/postSlice'
import { useSelector } from 'react-redux'
import { FaTrash, FaRegEdit, FaRegEye,FaPlus, FaSpinner, FaShoppingBag, FaBookOpen, FaListAlt, FaSortAlphaDown, FaSortAlphaUp, FaSortNumericDown, FaSortNumericUp} from 'react-icons/fa'
import { useDeletePostMutation } from '../../../features/posts/postSlice'
import { setIsPromptMessage,setPromptMessage,setIsOverPage,setProductId } from '../../../features/actions/actionStateSlice'
import { useDispatch } from 'react-redux'
import { categories,classifications } from '../../../assets/info/infoData'

const Products = () => {

  const [dishToDeleteId, setDishToDeleteId] = useState('')
  const [deletePost, {isLoading}] = useDeletePostMutation()
  const dispatch = useDispatch()


  const unAvailableConnection =()=>{
    dispatch(setPromptMessage(`check your internet connectivity`))
          dispatch(setIsPromptMessage(true)) 
          setTimeout(() => {
              dispatch(setIsPromptMessage(false))
    }, 8000);
  }

  const myId = JSON.parse(localStorage.getItem('myAdminData'))

  const handleActions = async (type, id) =>{

    if(type==="view"){
      dispatch(setIsOverPage({isOverPage:true, operation:"view"}))
      dispatch(setProductId(id))
    }
  
    else if(type === "edit"){
      dispatch(setIsOverPage({isOverPage:true, operation:"edit"}))
      dispatch(setProductId(id))
    }
  
    else if(type === "delete"){
        setDishToDeleteId(id)
        if(window.navigator.onLine){
          try {
            await deletePost({dishID:id, adminID:myId.id}).unwrap()
              
          } catch (err) {
            console.error('Failed to delete the post', err)
          } 
        }

        else{
          unAvailableConnection()
        } 
      }

      else if(type === "create"){
        dispatch(setIsOverPage({isOverPage:true, operation:"create"}))
      }
 
    }

  const navBoard=()=>{
    
  }

  const allDishes= useSelector(selectAllDishes)

  return (
    <div className='admin-products'>
        <div className="admin-poducts-item">
          <div className="info-boards">
            <FaShoppingBag className='info-board-icon'/>
            <div className="info-board-message">
              <div className="info-board-message-point">Total Products</div>
              <div className="info-board-message-number">{allDishes.length}</div>
            </div>
          </div>

          <div className="info-boards">
            <FaBookOpen className='info-board-icon'/>
            <div className="info-board-message">
              <div className="info-board-message-point">Classifications</div>
              <div className="info-board-message-number">{classifications.length}</div>
            </div>
          </div>

          <div className="info-boards">
            <FaShoppingBag className='info-board-icon'/>
            <div className="info-board-message">
              <div className="info-board-message-point">Total Products</div>
              <div className="info-board-message-number">5000</div>
            </div>
          </div>

          <div className="info-boards">
            <FaListAlt className='info-board-icon'/>
            <div className="info-board-message">
              <div className="info-board-message-point">Categories</div>
              <div className="info-board-message-number">{categories.length}</div>
            </div>
          </div>
        </div>

        <div className="admin-poducts-item">
          <div className="section-header-title-name">
             <button  onClick={()=>handleActions("create",null)}><FaPlus/>Add</button>
          </div>
          <input type="text" placeholder='Search by name' />
        </div>

        {/* <div className="admin-poducts-item">
          <button  onClick={()=>handleActions("create",null)}>Add Product <FaPlus/></button>
          <button>Delete Multiple <FaTrash/></button>
        </div> */}

        <div className="admin-poducts-item">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>
                  <div className="th-content">
                    Name
                    <FaSortAlphaDown className="th-content-icon"/>
                    <ul className="nav-board">
                      <li><FaSortAlphaUp/>Ascending</li>
                      <li><FaSortAlphaDown/>Descending</li>
                    </ul>
                  </div>
                </th>

                <th>Category</th>
                <th>
                  <div className="th-content">
                    Price
                    <FaSortNumericDown className="th-content-icon"/>
                  </div>
                </th>
                <th><div className="th-content">Discount<FaSortNumericUp className="th-content-icon"/></div></th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
            {
              allDishes?.map((item)=>{
                return(
                        <tr key={item._id}>
                          <td><input type="checkbox" /></td>
                          <td>{item.dishName}</td>
                          <td>{item.category}</td>
                          <td>{item.price}</td>
                          <td>{item.discount}</td>
                          <td>
                            <div className="action-box">
                              <FaRegEye className='td-icon' onClick={()=>handleActions("view",item._id)}/>
                              <FaRegEdit className='td-icon' onClick={()=>handleActions("edit",item._id)}/>
                              {
                                isLoading && dishToDeleteId===item._id?
                                <FaSpinner className='loading-animation'/>:
                                <FaTrash className='td-icon' onClick={()=>handleActions("delete",item._id)}/>
                              }
                            </div>
                          </td>
                        </tr>
                      )
                })
            }
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default Products