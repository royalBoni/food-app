import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { setIsOverPage } from '../../../features/actions/actionStateSlice'
import "./editProductModal.css"
import { FaTimes, FaPlus, FaSpinner } from 'react-icons/fa'
import { useState } from 'react'
import { useAddNewPostMutation } from '../../../features/posts/postSlice'
import { setPromptMessage,setIsPromptMessage } from '../../../features/actions/actionStateSlice'
import { categories } from '../../../assets/info/infoData'
import './addProductModal.css'

const AddProductModal = () => {
    

    const dispatch = useDispatch()

    const [addNewPost,{isLoading,isSuccess,isError,error}] = useAddNewPostMutation()

    //SETTING STATES FOR INPUT ELEMENTS
    const [image,setImage]=useState('')
    const [fileName, setFileName]=useState('')
    const [uploadImageFile, setUploadImageFile]=useState('')
    const [name, setName]=useState('')
    const [price, setPrice]=useState('')
    const [catchPhrase, setCatchPhrase]=useState('')
    const [discount, setDiscount]=useState('')
    const [category, setCategory]=useState([])
    const [description,setDescription] = useState('')

    const [checked, setChecked] = useState([])

    //CREATING ONCHANE FUNCTIONS FOR STATE CHANGE DURING INPUT PROCESS
    const onImageChanged = e => setImage(e.target.value)
    const onNameChanged = e => setName(e.target.value)
    const onPriceChanged = e => setPrice(e.target.value)
    const onCatchPhraseChanged = e => setCatchPhrase(e.target.value)
    const onDiscountChanged = e => setDiscount(e.target.value)
    const onCategoryChanged = e => setCategory(e.target.value)
    const onDescriptionChanged = e => setDescription(e.target.value)
    const onCheckedChanged = e => setChecked(e.target.value)

    //CREATING A RESET FUNCTION
    const reset=()=>{
      setImage('')
      setName('')
      setPrice('')
      setCatchPhrase('')
      setDiscount('')
      setCategory([])
      setDescription('')
    }

    // ADD/REMOVE CHECKED ITEM FROM LIST
    const handleCheck = (event) => {
        var updatedList = [...category];
        if (event.target.checked) {
        updatedList = [...category, event.target.value];
        } else {
        updatedList.splice(category.indexOf(event.target.value), 1);
        }
        setCategory(updatedList);
    };

    /* // Generate string of checked items
    const checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ", " + item;
      })
    : "";

    // Return classes based on whether item is checked
    var isChecked = (item) => checked.includes(item) ? "checked-item" : "not-checked-item"; */

    //CHECKING WHETHER ALL INPUT FIELD HAVE BEEN ENTERED
    const isAllEntered = [description,category,discount,uploadImageFile,catchPhrase,price,name].every(Boolean)

    //ADD PRODUCT FUNCTION
    const formData = new FormData()

    const add =async()=>{
      const testObject={description,category,discount,uploadImageFile,catchPhrase,price,name}
          console.log(testObject)
      if(isAllEntered){
        if(window.navigator.onLine){
          
          try{
            formData.append('description',description)
            formData.append('category',category)
            formData.append('discount',discount)
            formData.append('image',uploadImageFile)
            formData.append('catchPhrase',catchPhrase)
            formData.append('price',price)
            formData.append('dishName',name) 
            formData.append('classification',"breakfast")
            formData.append('date',new Date())
            await addNewPost(formData).unwrap()
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
      dispatch(setPromptMessage(`product added successfully`))
      dispatch(setIsPromptMessage(true)) 
      setTimeout(() => {
          dispatch(setIsPromptMessage(false))
      }, 8000);
    }

    if(isError){
      console.log(error)
    }
  return (
    <div className='add-product-modal'>
        <div className='modal-close-btn' onClick={()=>dispatch(setIsOverPage(false))}><FaTimes/></div>
        <div className="add-modal-division">
          <div className="add-modal-division-image">
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

        <div className="add-modal-division">
          <div className="add-modal-division-row">
            <label htmlFor="">Name:</label>
            <input type="text" value={name} onChange={onNameChanged}/>
          </div>

          <div className="add-modal-division-row">
            <label htmlFor="">Price:</label>
            <input type="number" value={price} onChange={onPriceChanged}/>
          </div>

          <div className="add-modal-division-row">
            <label htmlFor="">Catch Phrase:</label>
            <input type="text" value={catchPhrase} onChange={onCatchPhraseChanged}/>
          </div>

          <div className="add-modal-division-row">
            <label htmlFor="">Discount:</label>
            <input type="number" value={discount} onChange={onDiscountChanged}/>
          </div>

          <div className="add-modal-division-row">
            <label htmlFor="">Categories:</label>
            <div className="add-modal-division-row-item">
                {categories.map((item, index) => (
                <div className='individual-category-item' key={index}>
                <input value={item} type="checkbox" onChange={handleCheck} />
                <label>{item}</label>
                </div>
                ))}
            </div>
          </div>

          <div className="add-modal-division-row">
            <label htmlFor="">Description:</label>
            <textarea name="" id="" cols="30" rows="10" value={description} onChange={onDescriptionChanged}></textarea>
          </div>

          {
            isSuccess?
            <div className="add-modal-division-row"><span>Successfuly Added</span></div>:
            <div className="add-modal-division-row">
              <button disabled={isLoading} onClick={reset}>Reset</button>
              <button disabled={isLoading} onClick={add}>{isLoading?<FaSpinner className='loading-animation'/>:'Add'}</button>
            </div>
          }

        </div>
    </div>
  )
}

export default AddProductModal