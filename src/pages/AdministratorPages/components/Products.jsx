import React from 'react'
import './products.css'
import { selectAllDishes } from '../../../features/posts/postSlice'
import { useSelector } from 'react-redux'
import { FaTrash, FaRegEdit, FaRegEye} from 'react-icons/fa'
import { useAddNewPostMutation } from '../../../features/posts/postSlice'
import { useDeletePostMutation } from '../../../features/posts/postSlice'
import { setIsPromptMessage,setPromptMessage } from '../../../features/actions/actionStateSlice'
import { useDispatch } from 'react-redux'

const Products = () => {

  const [addNewPost] = useAddNewPostMutation()
  const [deletePost] = useDeletePostMutation()
  const dispatch = useDispatch()

  const myId = JSON.parse(localStorage.getItem('myAdminData'))

  const handleActions = async (type, id) =>{

    if(window.navigator.onLine){
      
      if(type==="view"){
        console.log(`you want to view ${id}`)
      }
  
      else if(type === "edit"){
        console.log(`you want to edit ${id}`)
      }
  
      else if(type === "delete"){
        console.log(`you want to want delete ${id}`)
        try {
          await deletePost({dishID:id, adminID:myId.id}).unwrap()
          
        } catch (err) {
            console.error('Failed to delete the post', err)
        } 
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
    
    
  

  const allDishes= useSelector(selectAllDishes)
  console.log(allDishes)

  return (
    <div className='admin-products'>
        <div className="admin-poducts-item">boni</div>
        <div className="admin-poducts-item">
          <div className="section-header-title-name"><span>5555</span> Dishes on sales</div>
          <input type="text" placeholder='Search by name' />
        </div>
        <div className="admin-poducts-item">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Discount</th>
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
                              <FaTrash className='td-icon' onClick={()=>handleActions("delete",item._id)}/>
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