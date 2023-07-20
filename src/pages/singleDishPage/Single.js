import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { useSelector,useDispatch } from "react-redux"
import { format } from 'date-fns';
import { selectDishById } from '../../features/posts/postSlice'
import { selectAllReviews } from '../../features/dishReviews/dishReviewsSlice'
import { selectAllDishes } from '../../features/posts/postSlice';
import { FaStar, FaShareAlt, FaRegHeart, FaRegStar, FaUser, FaBook, FaBookOpen, FaComments} from 'react-icons/fa'
import { useAddNewReviewMutation } from '../../features/dishReviews/dishReviewsSlice'
import { useAddNewCartMutation } from '../../features/cart/cartSlice';
import { setPromptMessage,setIsPromptMessage } from '../../features/actions/actionStateSlice';
import './single.css'


const Single = () => {
    
    const reviews=useSelector(selectAllReviews)
    const dishes=useSelector(selectAllDishes)
   
    const [addNewReview, {isLoading}]=useAddNewReviewMutation()

    const {dishId} =useParams()
    const navigate = useNavigate()

    const relatedClicked=(id)=>{
      navigate(`/menu/${id}`)
    }

    const handleAddToRecentlyViewed = ()=>{
      const myRecentlyViewed= JSON.parse(localStorage.getItem("myRecentlyViewed"));
      if(myRecentlyViewed){
        const isRecentlyViewed = myRecentlyViewed?.find((item)=>item===dishId)
        if(isRecentlyViewed){
          return null
        }
        else{
          localStorage.setItem("myRecentlyViewed", JSON.stringify([...myRecentlyViewed,dishId]));
        }
      }
      else{
        const viewed=[dishId]
        localStorage.setItem("myRecentlyViewed", JSON.stringify(viewed));
      }
    }

    useEffect(()=>{
      handleAddToRecentlyViewed()
    },[relatedClicked,handleAddToRecentlyViewed])

    const dishReviews= reviews.filter((item)=>item.dishId===dishId)
    const allDishes=dishes.filter((item)=>item._id!==dishId)
    
    const [numberOfItems,setNumberOfItems]=useState(1)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [review, setReview] = useState('')
    const [pageWidth, setPageWidth] = useState(0)
    const [isReadMore, setIsReadMore] = useState(false)

    const controlReadMore = ()=>{
      setIsReadMore(!isReadMore)
    }


    const onNameChanged = e => setName(e.target.value)
    const onEmailChanged = e => setEmail(e.target.value)
    const onReviewChanged = e => setReview(e.target.value)

  
    const screen = () =>{
         const width=window.innerWidth
         setPageWidth(width)
      
      }
  
      window.onload=screen
      window.onresize=screen 

    const canSave = [name, email, review].every(Boolean) && !isLoading;
    const myId= JSON.parse(localStorage.getItem("myUserId"));
    const date = new Date()
    const onSaveReviewClicked = async() => {
       if (canSave) {
            if(window.navigator.onLine){
              try {
                await addNewReview({ userName:name, review, userEmail:email, dishId:dishId, date, userId:myId.id}).unwrap()  
                dispatch(setPromptMessage(`review have successfully been added`))
                dispatch(setIsPromptMessage(true)) 
                setTimeout(() => {
                    dispatch(setIsPromptMessage(false))
                }, 8000);
                setName('')
                setEmail('')
                setReview('')

                } catch (err) {
                    console.error('Failed to save the post', err)
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
            dispatch(setPromptMessage(`make sure you have filled all fields`))
            dispatch(setIsPromptMessage(true)) 
            setTimeout(() => {
                dispatch(setIsPromptMessage(false))
            }, 8000);
        }

    }


    const [activeId,setActiveId]=useState(1)

    const handleSetActive=(id)=>{
      setActiveId(id)
    }

    const AddNumerOfItems=()=>{
      setNumberOfItems(numberOfItems+1)
    }

    const DeductNumberOfItems=()=>{
      setNumberOfItems(numberOfItems-1)
      if(numberOfItems<2) setNumberOfItems(1)
    }

    const dish =useSelector((state)=>selectDishById(state, dishId))

    const [socialsDecision,setSocialDecision]=useState(0)
    const [buttonStyle,setButtonStyles]=useState('related-button-disappear')

    const handleMouseOverRelated=(id)=>{
      setSocialDecision(id)
      setButtonStyles('related-button')
    }

    const handleMouseOut=()=>{
      setSocialDecision(0)
      setButtonStyles('related-button-disappear')
    }

    

    const [addNewCart]=useAddNewCartMutation()
    const dispatch = useDispatch()
    let submissionPointer = true

    const ClickOnAddToCart =async(dishName,id,price,discount)=>{
      if(window.navigator.onLine){
        await addNewCart({dishName:dishName, dishId:id, price:price, discount:discount, quantity:!submissionPointer?1:numberOfItems, customerId:myId.id})
        dispatch(setPromptMessage(`"${dishName}" have successfully been added`))
        dispatch(setIsPromptMessage(true)) 
        setTimeout(() => {
            dispatch(setIsPromptMessage(false))
        }, 8000);
      }
      else{
        dispatch(setPromptMessage(`check your internet connectivity`))
        dispatch(setIsPromptMessage(true)) 
        setTimeout(() => {
            dispatch(setIsPromptMessage(false))
        }, 8000);
      }
  }


  return (
    <div>
      {
        !dish?
        <p className='not-found'>No Post Found</p>:

        <div className="single">
        <section className='single-division'>
            <div className="single-division-item">
              <img src={dish.dish_image_url} alt="" />
              {dish.discount>0&& <span className='single-division-item-discount-banner'>{`${dish.discount}% OFF`}</span>}
            </div>
            <div className="single-division-item">
              <h1>{dish.dishName}</h1>
              <h1 className='price'>
                {`GHS${dish.discount?(dish.price-((dish.discount/100)*dish.price)).toFixed(2):dish.price}`} 
                    <span className='old-price'>{dish.discount?`GHS${dish.price}`:null}</span>
              </h1>
              <div className="interactions">
                <div className="review-stars">
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                </div>
                <p className="review-comments">{`(${dishReviews.length} customer reviews)`}</p>
              </div>

              <p>{dish.catchPhrase}</p>
              <div className="input-and-add">
                <div className="number-container">
                  <div className='click' onClick={DeductNumberOfItems}>-</div>
                  <input type="text" value={numberOfItems} onChange={(e)=>setNumberOfItems(e.target.value)}/>
                  <div className='click' onClick={AddNumerOfItems}>+</div>
                </div>
                <button className='add-cart' onClick={()=>ClickOnAddToCart(dish.dishName,dish._id,dish.price,dish.discount,submissionPointer=true)}>{`Add ${numberOfItems} To Cart. GHS${(numberOfItems*(dish.price-(dish.discount/100)*dish.price)).toFixed(2)}`}</button>
              </div>

              <div className="product-actions">
                <button className='action-button'>Add To Wishlist <FaRegHeart/></button>
                <div className="share">
                  <p>Share</p>
                  <FaShareAlt className='share-icon'/>
                </div>
              </div>

              <div className="categories-container">
                <h3>Categories:</h3>
                <div className="categories">
                  {
                    !dish.categories?<p>{null}</p>:
                    dish.categories.map((key,value)=>{
                      return(
                        <p key={value}>{key},</p>
                      )
                    })
                  }
                </div>
              </div>
            </div>
        </section>

        <section className='single-division'>
          <div className="top">
            <ul>
              <li className={activeId===1?'active-list':null} onClick={()=>handleSetActive(1)}>{pageWidth>576?'Description':<FaBookOpen/>}</li>
              <li className={activeId===2?'active-list':null} onClick={()=>handleSetActive(2)}>{pageWidth>576?'Specification':<FaBook/>}</li>
              <li className={activeId===3?'active-list':null} onClick={()=>handleSetActive(3)}>{pageWidth>576?'Reviews':<FaComments/>}<span className='active-list-span'>{dishReviews.length}</span></li>
            </ul>
          </div>

          <div className="down">
            <div  className={activeId===1?null:'none'}>
              <h1>{dish.dishName}</h1>
              {
                dish.description.length >1000 && !isReadMore ? 
                <p>{`${dish.description.slice(0,1000)}...`}<span onClick={controlReadMore}>Read more</span></p>:
                <p>{dish.description}</p>
              }
            </div>

            <div  className={activeId===2?null:'none'}>
              <h1>Detailed Specification</h1>
              <p>This is a specification</p>
            </div>

            <div className={activeId===3?'reviews':'none'}>
              <h1>{`${dishReviews.length} Reviews for ${dish.dishName}`}</h1>

              <div className="reviews-conatiner">
                {
                  dishReviews.map(review=>{
                    return(
                      <div className='individual-review' key={review._id}>
                        <div className="reviewer-profile">
                          <div className="reviewer-image">
                            <FaUser className='image-image'/>
                          </div>
                          <div className="name-and-date">
                            <h3 className="reviewer-name">{review.userName?review.userName:"Anonymous"}</h3>
                            <p className="review-date">{format(new Date(review.date), 'MMMM dd, yyyy')}</p>
                          </div>
                        </div>
                        <p>
                          {
                            review.review
                          }
                        </p>
                      </div>
                    )
                  })
                }
              </div>

              <form action="" onSubmit={(e)=>e.preventDefault()}>
                <div className="form-row">
                  <h3>Add a Review</h3> 
                </div>
                
                <div className="form-row">
                  <div className="rating">
                    <h4>Your Ratings *</h4>
                    <div className="review-stars">
                      <FaRegStar/>
                      <FaRegStar/>
                      <FaRegStar/>
                      <FaRegStar/>
                      <FaRegStar/>
                    </div>
                  </div>
                  <p className="instructions">
                    Your email address will not be published. Required fields are marked *
                  </p>
                </div>

                <div className="form-row">
                  <input 
                  type="text" 
                  name="name" 
                  id="name" 
                  placeholder='Your Name *'
                  value={name}
                  onChange={onNameChanged}
                  />

                  <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  placeholder='Your Email *'
                  value={email}
                  onChange={onEmailChanged}
                  />
                </div>

                <div className="form-row">
                  <textarea 
                  name="message" 
                  id="message" 
                  cols="30" 
                  rows="10" 
                  placeholder='Your Review *' 
                  value={review}
                  onChange={onReviewChanged}
                  >
                  
                  </textarea>
                </div>

                <div className="form-row">
                  <button onClick={onSaveReviewClicked}>Submit</button>
                </div>
              </form>
            </div>
          </div>
        </section>

        <section className='single-division'>
          <div className="top">
            <h1>Related Product</h1>
            <p>Sitewide Discount Savings Of Up To 25%</p>
          </div>
          <div className='down'>
            {
              allDishes.slice(0,4).map((related,key)=>{
                return(
                  <div key={related._id} className='individual-related' onMouseOver={()=>handleMouseOverRelated(related._id)} onMouseOut={handleMouseOut}>
                    <div className="related-image">
                        {related.discount>0? <span className='related-discount-banner'>{`${related.discount}% OFF`}</span>:<span className='related-discount-banner'>HOT DEAL</span>}
                        <img src={related.dish_image_url} alt=""  onClick={()=>relatedClicked(related._id)}/>
                        <div className={related._id===socialsDecision?'show-button':'dont-show-button'}>
                          <button className={`${buttonStyle}`} onClick={()=>ClickOnAddToCart(related.dishName,related._id,related.price,related.discount,submissionPointer=false)}>Add to Cart</button>
                        </div>
                    </div>
                    <div className="related-info">
                      <h3>{related.dishName}</h3>
                      <p>
                        {`GHS${related.discount?(related.price-((related.discount/100)*related.price)).toFixed(2):related.price}`} 
                        <span className='old-price'>{related.discount?`GHS${related.price}`:null}</span>
                      </p>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </section>
        </div>
      }
    </div>
  )
}

export default Single