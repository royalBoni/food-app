import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { setIsOverPage } from '../../../features/actions/actionStateSlice'
import { selectDishById } from '../../../features/posts/postSlice'
import "./editProductModal.css"
import { FaTimes, FaPlus, FaSpinner } from 'react-icons/fa'
import { useState } from 'react'
import { useUpdatePostMutation } from '../../../features/posts/postSlice'
import { setPromptMessage,setIsPromptMessage } from '../../../features/actions/actionStateSlice'

const EditProductModal = () => {
    const dispatch = useDispatch()
    const productId=useSelector((state)=>state.promptMessage.productId);
    const singleDish = useSelector((state)=>selectDishById(state,productId))

    const [updatePost,{isLoading,isSuccess,isError,error}] = useUpdatePostMutation()
    

    //SETTING STATES FOR INPUT ELEMENTS
    const [image,setImage]=useState(singleDish.dish_image_url)
    const [fileName, setFileName]=useState('')
    const [uploadImageFile, setUploadImageFile]=useState('')
    const [name, setName]=useState(singleDish.dishName)
    const [price, setPrice]=useState(singleDish.price)
    const [catchPhrase, setCatchPhrase]=useState(singleDish.catchPhrase)
    const [discount, setDiscount]=useState(singleDish.discount)
    const [category, setCategory]=useState(singleDish.category)
    const [description,setDescription] = useState(singleDish.description)

    //CREATING ONCHANE FUNCTIONS FOR STATE CHANGE DURING INPUT PROCESS
    const onImageChanged = e => setImage(e.target.value)
    const onNameChanged = e => setName(e.target.value)
    const onPriceChanged = e => setPrice(e.target.value)
    const onCatchPhraseChanged = e => setCatchPhrase(e.target.value)
    const onDiscountChanged = e => setDiscount(e.target.value)
    const onCategoryChanged = e => setCategory(e.target.value)
    const onDescriptionChanged = e => setDescription(e.target.value)

    //CREATING A RESET FUNCTION
    const reset=()=>{
      setImage('')
      setName('')
      setPrice('')
      setCatchPhrase('')
      setDiscount('')
      setCategory('')
      setDescription('')
    }

    //CHECKING WHETHER ALL INPUT FIELD HAVE BEEN ENTERED
    const isAllEntered = [description,discount,image,catchPhrase,price,name].every(Boolean)

    //UPDATE FUNCTION
    const formData = new FormData()

    const update =async()=>{
      if(description){
        console.log(`description true`)
      }
      if(discount){
        console.log(`discount true`)
      }
      if(uploadImageFile){
        console.log(`uploadImageFile true`)
      }
      if(catchPhrase){
        console.log(`catchPhrase true`)
      }
      if(price){
        console.log(`price true`)
      }
      if(name){
        console.log(`name true`)
      }
      if(isAllEntered){
        if(window.navigator.onLine){
          try{
            formData.append('dishId',productId)
            formData.append('description',description)
            formData.append('category',category)
            formData.append('discount',discount)
            formData.append('image',uploadImageFile)
            formData.append('catchPhrase',catchPhrase)
            formData.append('price',price)
            formData.append('dishName',name) 
            await updatePost(formData).unwrap()
          }
          catch(err){
            console.log(err)
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
        dispatch(setPromptMessage(`make sure to enter all input`))
          dispatch(setIsPromptMessage(true)) 
          setTimeout(() => {
              dispatch(setIsPromptMessage(false))
          }, 8000);
      }
    
    }

    if(isSuccess){
      dispatch(setPromptMessage(`product updated successfully`))
      dispatch(setIsPromptMessage(true)) 
      setTimeout(() => {
          dispatch(setIsPromptMessage(false))
      }, 8000);
    }

    if(isError){
      console.log(error)
    }
  return (
    <div className='edit-product-modal'>
        <div className='modal-close-btn' onClick={()=>dispatch(setIsOverPage(false))}><FaTimes/></div>
        <div className="edit-modal-division">
          <div className="edit-modal-division-image">
            {
              image?
              <img src={image} alt="" />:
              null
            }
          </div>
          <div className="image-post"  onClick={()=>document.querySelector('.input-field').click()}>
              <input type='file' accept='image' className='input-field' hidden
                onChange={({target:{files}})=>{
                /* files[0] &&setFileName(files[0].name) */
                setUploadImageFile(files[0])
                if(files){
                setImage(URL.createObjectURL(files[0]))
                }
                }}/>
                <FaPlus/>
                Select Image
          </div>
        </div>

        <div className="edit-modal-division">
          <div className="edit-modal-division-row">
            <label htmlFor="">Name:</label>
            <input type="text" value={name} onChange={onNameChanged}/>
          </div>

          <div className="edit-modal-division-row">
            <label htmlFor="">Price:</label>
            <input type="text" value={price} onChange={onPriceChanged}/>
          </div>

          <div className="edit-modal-division-row">
            <label htmlFor="">Catch Phrase:</label>
            <input type="text" value={catchPhrase} onChange={onCatchPhraseChanged}/>
          </div>

          <div className="edit-modal-division-row">
            <label htmlFor="">Discount:</label>
            <input type="text" value={discount} onChange={onDiscountChanged}/>
          </div>

          <div className="edit-modal-division-row">
            <label htmlFor="">Categories:</label>
            <div className="edit-modal-division-row-item">
              {
              singleDish.category.map((category)=>(`${category} : `))
              }
            </div>
          </div>

          <div className="edit-modal-division-row">
            <label htmlFor="">Description:</label>
            <textarea name="" id="" cols="30" rows="10" value={description} onChange={onDescriptionChanged}></textarea>
          </div>

          {
            isSuccess?
            <div className="edit-modal-division-row"><span>Successfuly Updated</span></div>:
            <div className="edit-modal-division-row">
              <button disabled={isLoading} onClick={reset}>Reset</button>
              <button disabled={isLoading} onClick={update}>{isLoading?<FaSpinner className='loading-animation'/>:'Update'}</button>
            </div>
          }

        </div>
    </div>
  )
}

export default EditProductModal