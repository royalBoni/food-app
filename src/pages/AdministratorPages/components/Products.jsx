import React, { useState } from 'react'
import './products.css'
import { selectAllDishes } from '../../../features/posts/postSlice'
import { useSelector } from 'react-redux'
import { FaTrash, FaRegEdit, FaRegEye,FaPlus, FaSpinner, FaShoppingBag, FaBookOpen, FaListAlt, FaSortAlphaDown, FaSortNumericDown, FaSortNumericUp, FaSearch, FaArrowDown, FaArrowUp} from 'react-icons/fa'
import { useDeletePostMutation } from '../../../features/posts/postSlice'
import { setIsPromptMessage,setPromptMessage,setIsOverPage,setProductId } from '../../../features/actions/actionStateSlice'
import { useDispatch } from 'react-redux'
import { categories,classifications } from '../../../assets/info/infoData'

const Products = () => {
  const allDishes= useSelector(selectAllDishes)
  const [dishToDeleteId, setDishToDeleteId] = useState('')
  const [sortId,setSortId] = useState(null)
  const [dishes,setDishes] = useState(allDishes)
  const [searchInput, setSearchInput] = useState('')
  const [deletePost, {isLoading}] = useDeletePostMutation()
  const dispatch = useDispatch()

  const onSearchInputChange = (e) => setSearchInput(e.target.value)

  const searchProductByInput =()=>{
    const searchedItems = allDishes.filter((item)=>((item.dishName).toUpperCase()).includes(searchInput.toUpperCase()))
    setDishes(searchedItems)
  }

  const sortOrder = (sortBy,order) =>{
    const sortedItems = allDishes.sort((a,b)=>{
      if(sortBy==="price"&&order==="ascending"){
        return a.price - b.price
      }

      else if(sortBy==="price"&&order==="descending"){
        return b.price - a.price
      }

      else if(sortBy==="name"&&order==="ascending"){
        const nameA = a.dishName.toUpperCase(); // ignore upper and lowercase
        const nameB = b.dishName.toUpperCase(); // ignore upper and lowercase
        if (nameA > nameB) {
          return 1;
        }
        if (nameA < nameB) {
          return -1;
        }

        // names must be equal
        return 0;
      }

      else if(sortBy==="name"&&order==="descending"){
        const nameA = a.dishName.toUpperCase(); // ignore upper and lowercase
        const nameB = b.dishName.toUpperCase(); // ignore upper and lowercase
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      }

      else if(sortBy==="discount"&&order==="ascending"){
        return a.discount - b.discount
      }

      else if(sortBy==="discount"&&order==="descending"){
        return b.discount - a.discount
      }
      return true
      
    }) 
    setDishes(sortedItems)
  } 

  const NavBoard =({sortBy})=>{
    return(
      <ul className="nav-board">
        <li onClick={()=>sortOrder(sortBy,'ascending')}><FaArrowDown/>Ascending</li>
        <li onClick={()=>sortOrder(sortBy,'descending')}><FaArrowUp/>Descending</li>
      </ul>
    )
  }

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

  const onClickOutsideListener = () => {
    setSortId(null)
    document.removeEventListener("click", onClickOutsideListener)
  }


  const onClickOutsideAction = () => {
    document.addEventListener("click", onClickOutsideListener)
    
  }


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
          
          <div className="section-header-title-products">
            <p>{`(${dishes.length}) Products Found`}</p>
          </div>
          <div className="input-search">
             <input type="text" placeholder='Search by name'value={searchInput} onChange={onSearchInputChange}/>
             <button onClick={searchProductByInput}><FaSearch/></button>
          </div>
        </div>

        <div className="admin-poducts-item">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>
                  <div className="th-content">
                    Name
                    <FaSortAlphaDown className="th-content-icon" onClick={()=>setSortId(1)}  onMouseLeave={onClickOutsideAction}/>
                    {
                      sortId===1?<NavBoard sortBy={'name'}/>:null
                    }
                  </div>
                </th>

                <th>Category</th>
                <th>
                  <div className="th-content">
                    Price
                    <FaSortNumericDown className="th-content-icon" onClick={()=>setSortId(2)} onMouseLeave={onClickOutsideAction}/>
                    {
                      sortId===2?<NavBoard sortBy={'price'}/>:null
                    }
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    Discount
                    <FaSortNumericUp className="th-content-icon" onClick={()=>setSortId(3)} onMouseLeave={onClickOutsideAction}/>
                    {
                      sortId===3?<NavBoard sortBy={'discount'}/>:null
                    }
                  </div>
                </th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
            {
              dishes?.map((item)=>{
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