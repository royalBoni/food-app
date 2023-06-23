import React from 'react'
import './menu.css'
import { useState,useEffect,useRef } from 'react'
import {FaSpinner, FaStar, FaAngleDown} from 'react-icons/fa'
import { useGetPostsQuery} from '../../features/posts/postSlice'
import { useAddNewCartMutation } from '../../features/cart/cartSlice'
import { useSelector,useDispatch } from 'react-redux'
import { selectAllDishes } from '../../features/posts/postSlice'
import { setIsPromptMessage,setPromptMessage } from '../../features/actions/actionStateSlice'
import { classifications,categories } from '../../assets/info/infoData'
import { Link } from 'react-router-dom'

const Menu = () => {
    const dispatch = useDispatch()
    const [orderedDshName,setOrderedDishName]=useState('')
    const toProductsRef =useRef()
    const { isLoading}= useGetPostsQuery()
    const [addNewCart,{isSuccess, isError, error}]=useAddNewCartMutation()

    if(isSuccess){
        dispatch(setPromptMessage(`"${orderedDshName}" have successfully been added`))
        dispatch(setIsPromptMessage(true)) 
        setTimeout(() => {
            dispatch(setIsPromptMessage(false))
        }, 8000);
    }

    if(isError){
        console.log(error)
    }

    const dishes =useSelector(selectAllDishes)
   

    //CREATING KEYWORD CATEGORY COUNTER
    const keywordCategoryCounter =(keyword)=>{
        let counter = 0
        dishes.map((dish)=>{
         dish.category.map((item)=>{
            if(item===keyword){
                counter+=1
            }
            return true
        })
        return true
    })
        return counter
        
    }

    const handleToProducts = ()=>{
        toProductsRef?.current.scrollIntoView({behavior:'smooth'});
    }

     //CREATING KEYWORD CLASSIFICATION COUNTER
     const keywordClassificationCounter =(keyword)=>{
        let counter = 0
        dishes.map((dish)=>{
            if(dish.classification===keyword){
                counter+=1
            }
            return true
        })
        return counter   
    }

    const myId= JSON.parse(localStorage.getItem("myUserId"));
    const quantity=1;
    const date= new Date()

    const ClickOnAddToCart =async(dishName,dishId,price,discount)=>{
        const isOnline=window.navigator.onLine
        if(isOnline){
            setOrderedDishName(dishName)
            await addNewCart({dishName,dishId,price,discount,quantity,customerId:myId.id, date})
        }
       else{
           /*  dispatch(setPromptMessage(`${newItem.error.error}. Server might be down`)) */
           dispatch(setPromptMessage('please check your internet connection'))
            dispatch(setIsPromptMessage(true)) 
            setTimeout(() => {
                dispatch(setIsPromptMessage(false))
            }, 8000);
        }
         
    }

    const [inputMaxPrice,setInputMaxPrice]=useState(0)
    const [inputMinPrice,setInputMinPrice]=useState(0)
    
    let priceArray=[]

    dishes.map((item)=>{
        priceArray.push(item.price)
        return true
    })

    const maxPrice=Math.max(...priceArray)
    const minPrice=Math.min(...priceArray)

    useEffect(()=>{
        if(dishes.length>0){
            setInputMaxPrice(maxPrice)
            setInputMinPrice(minPrice)
        }
        else{
            setInputMaxPrice(0)
            setInputMinPrice(0)
        }
    },[dishes.length,maxPrice,minPrice])
       

  return (
    <div className='menu-page'>
        <div className='page-welcome-dashboard'>
            <div className="background-content"></div>
            <div className="background-content"></div>
            <div className='page-welcome-dashboard-content'>
                <h1>Our<span>Menu</span></h1>
                <div className='caption'>Make every dinning moment count</div>
                <FaAngleDown className='page-welcome-down-button' onClick={handleToProducts}/>  
            </div>
        </div>
        <div className="menu-page-content-container">
            <div className="menu-page-content-container-item">
                <form action="">
                    <div className="list">
                        <h3 ref={toProductsRef}>Categories</h3>
                        <div className="form-list-item">
                            {
                                categories.map((value,key)=>{
                                    return(
                                        <div key={key} className="individual-form-list-item">
                                            <div className="individual-form-list-item-input">
                                                <input type="checkbox" name={value} id={value} />
                                                <label htmlFor={value}>{value[0].toUpperCase()+value.substring(1)}</label>
                                            </div>
                                            <p>
                                                ({keywordCategoryCounter(value)})
                                            </p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className="list">
                        <h3>Classification</h3>
                        <div className="form-list-item">
                            {
                                classifications.map((value,key)=>{
                                    return(
                                        <div key={key} className="individual-form-list-item">
                                            <div className="individual-form-list-item-input">
                                                <input type="checkbox" name={value} id={value} />
                                                <label htmlFor={value}>{value[0].toUpperCase()+value.substring(1)}</label>
                                            </div>  
                                            <p>
                                                ({keywordClassificationCounter(value)})
                                                
                                            </p>  
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>


                    <div className="list">
                        <h3>Filter By Price</h3>
                        <div className="form-list-item">
                           
                            <div className="individual-form-list-item">
                                <label htmlFor='#fromSlider'>{`GHS${inputMinPrice}`}</label>
                                <div className="sliders_control">
                                    <input id='#fromSlider' type='range' min={minPrice} max={maxPrice} value={inputMinPrice} onChange={(e)=>setInputMinPrice(e.target.value)}/>
                                    <input id='#toSlider' type='range' min={minPrice}  max={maxPrice} value={inputMaxPrice}  onChange={(e)=>setInputMaxPrice(e.target.value)} />
                                </div>
                                <label htmlFor='#toSlider'>{`GHS${inputMaxPrice}`}</label>
                              
                            </div>
                                      
                        </div>
                    </div>
                </form>
            </div>

            <div className="menu-page-content-container-item">
                {
               
                    isLoading?
                    <div className="loading-menu-container">
                        <FaSpinner className='loading-animation'/>
                    </div>:
                    <section>
                    
                    <div className="dishes-container">
                        {
                            dishes?.map(dish=>{
                                return(
                                    <div key={dish._id} className="individual-dish">
                                        <Link className='router-link' to={`/menu/${dish._id}`}>
                                        <div className="dish-image">
                                            <img src={dish.dish_image_url} alt="" /> 
                                        </div>
                                        <h3>{dish.dishName}</h3>
                                        <p>{`${dish.catchPhrase?.slice(0,80)} ...`}</p>
                                        <div className="review-stars">
                                            <FaStar/>
                                            <FaStar/>
                                            <FaStar/>
                                            <FaStar/>
                                            <FaStar/>
                                        </div>
                                        </Link>
                                        <div className="action">
                                            <button className="button" onClick={()=>ClickOnAddToCart(dish.dishName,dish._id,dish.price,dish.discount)}>Add To Cart</button>
                                            <h4>{`GHS${dish.discount?(dish.price-((dish.discount/100)*dish.price)).toFixed(2):dish.price}`} 
                                            <span className='old-price'>{dish.discount?`GHS${dish.price}`:null}</span></h4>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    </section>
                }
    
            </div>

        </div>
    </div> 
  )
}

export default Menu