import React from 'react'
import './landing.css'
/* import LoadPage from '../../Components.js/LoadPage'; */
import OrderProcessModal from '../../Components.js/OrderProcessModal';
import {FaStar,FaGitter,FaArrowRight,FaCheck,FaCaretLeft,FaCaretRight} from 'react-icons/fa';
import { useEffect,useState } from 'react';
import { useDispatch } from 'react-redux';
import { setProcessModal } from '../../features/actions/actionStateSlice';
import { setIsPromptMessage,setPromptMessage } from '../../features/actions/actionStateSlice';
import pic1 from '../../assets/images/pic1.png'
import pic2 from '../../assets/images/pic2.png'
import prof1 from '../../assets/images/pic-1.png'
import prof2 from '../../assets/images/pic-2.png'
import prof3 from '../../assets/images/pic-3.png'
import chef from '../../assets/images/chef-2.png'
import { Link, useNavigate} from 'react-router-dom';
import { appReview,userProfiles,howToUseInfo } from '../../assets/info/infoData';
import { selectAllDishes } from '../../features/posts/postSlice';
import { useSelector } from 'react-redux';
import { useAddNewCartMutation } from '../../features/cart/cartSlice';

const Landing = () => {
    const [addNewCart,{isError,error,isSuccess}] = useAddNewCartMutation()

    const [orderedDshName,setOrderedDishName]=useState('')
    const [selectedProfile,setSelectedProfile]=useState([])
    const [selectedReview,setSelectedReview]=useState([])
    const [id,setId]=useState(1)
    const [hideOrShow,setHideOrShow]=useState('word-anim')
    const [firstImageAnimation,setFirstImageAnimation]=useState('img-anim')
    const [firstP,setFirstP]=useState('word-anim')
    const [firstButton,setFirstButton]=useState('button-anim')
    const [secondH1,setSecondH1]=useState('second-h1-anim')
    const [secondP,setSecondP]=useState('second-h1-anim')
    const [secondOddDishCard,setSecondOddDishCard]=useState('img-anim')
    const [secondEvenDishCard,setSecondEvenDishCard]=useState('special-dish-card-even-anim')
    const dispatch =useDispatch()
    /* const [showWord,setShowWord]=useState('first-anim') */

    const myId= JSON.parse(localStorage.getItem("myUserId"));
    const userId =myId?.id
    const allDishes= useSelector(selectAllDishes)
    const navigate = useNavigate()

    /* FUNCTION TO REDIRECT A CLICKED SPECIAL DIET TO ITS INFO PAGE */
    const clickOnSpecialDish=(id)=>{
        navigate(`/menu/${id}`)
    }


    /* A SUCCESS MODAL WHICH TRIGGERS WHEN A CONDITION TRUE FOR DISH ADDED */

    if(isSuccess){
        dispatch(setPromptMessage(`"${orderedDshName}" have successfully been added`))
        dispatch(setIsPromptMessage(true)) 
        setTimeout(() => {
            dispatch(setIsPromptMessage(false))
        }, 8000);
    }

    /* FUNCTION TO ADD A DISH OR PRODUCT TO CART */

    const ClickOnAddToCart =async(dishName,dishId,price,discount)=>{
        if(!userId){
            navigate('/login')
        }
        else{
            const isOnline=window.navigator.onLine
            if(isOnline){
                setOrderedDishName(dishName)
                await addNewCart({dishName,dishId,price,discount,quantity:1,customerId:userId, date:new Date()})
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
         
    }

    useEffect(()=>{
        if(id===(userProfiles.length+1)){
            setId(1)
        }
        else if(id<1){
            setId(userProfiles.length)
        }
        const find=userProfiles.find(profile=>profile.id===id)
        const findReview=appReview.find(review=>review.userId===id)
        setSelectedProfile(find)
        setSelectedReview(findReview)
    },[id])
  
    useEffect(()=>{
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                    setHideOrShow('word')
                    setFirstImageAnimation('img')
                    setFirstP('first-p-anim')
                    setFirstButton('button')
              }
          
            });
          });
        
        const hiddenElements= document.querySelectorAll('.first');
        hiddenElements.forEach((el)=>observer.observe(el));

        const observer2 = new IntersectionObserver(entries => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                   setSecondH1('second-h1')
                   setSecondP('second-p')
              }
          
            });
          });
        
        const hiddenElements2= document.querySelectorAll('.second');
        hiddenElements2.forEach((el)=>observer2.observe(el));

        const observer3 = new IntersectionObserver(entries => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                  setSecondOddDishCard('special-dish-card-odd')
                  setSecondEvenDishCard('special-dish-card-odd')
              }
          
            });
          });
        
        const hiddenElements3= document.querySelectorAll('.h4-intersect-spy');
        hiddenElements3.forEach((el)=>observer3.observe(el));
    })

    const [descriptionTitle, setDescriptionTitle] = useState('')
    const handleOrderProcessDescription =(id,title)=>{
        setDescriptionTitle(title)
        dispatch(setProcessModal(id))
    }
    
  return (
    <main>
        <OrderProcessModal modalTitle={descriptionTitle}/>
        
        <section className={`first`}>
            <div className="intro">
                <div className="divisions">
                    <div className={` ${hideOrShow}`}>Meet,Eat & Enjoy The <span>True Taste</span>.</div>
                    <p className={`${firstP}`}>Food Taste Better when you eat with your family</p>
                    <Link to={userId?'/menu':'/login'}><button className={`${firstButton} desktop-mobile`}>{userId?'Explore Menu':'Get Started'}</button></Link>
                </div>
                <div className={`divisions ${firstImageAnimation}`}><img src={pic1} alt="" className='division-icon'/></div>
                <Link to={userId?'/menu':'/login'}><button className={`${firstButton} mobile-button`}>{userId?'Explore Menu':'Get Started'}</button></Link>
                
            </div>
        </section>

        <section className="second">
            <h1 className={`${secondH1}`}>Our Special Dish</h1>
            <p className={`${secondP}`}>
                Indulge in our signature dishes. A culinary masterpiece that will take your taste buds on a journey .
                This dish is a fusion of natural and the best ingredients around the world, prepared with care and precision by our expert chefs.
            </p>
            <div className="special-dish-cards-container">
                {
                    allDishes.slice(0,3).map((dish)=>{
                        return(
                            <div className={`special-dish-card active-card`} key={dish._id}>
                                <div className="special-dish-card-img" onClick={()=>clickOnSpecialDish(dish._id)}>
                                    <img src={dish.dish_image_url} alt="" />
                                </div>
                                <h3 onClick={()=>clickOnSpecialDish(dish._id)}>{dish.dishName}</h3>
                                <p onClick={()=>clickOnSpecialDish(dish._id)}>{dish.catchPhrase}</p>
                                <div className="special-dish-card-review">
                                    <FaStar/>
                                    <FaStar/>
                                    <FaStar/>
                                    <FaStar/>
                                    <FaStar/>
                                </div>
                                <div className="special-dish-card-price-button">
                                    <button onClick={()=>ClickOnAddToCart(dish.dishName,dish._id,dish.price,dish.discount)}>
                                        Add to Cart
                                    </button>
                                    <h4>{`GHS${dish.price}`}</h4> 
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>

        <section className="third">
            <h1 className='mobile-third-h1'>We Serve Healthy & Tasty Food</h1>
            <div className="third-content">
                <div className="third-section-division">
                    <img src={pic2} alt="" />
                </div>
                <div className="third-section-division">
                <h1 className='desktop-third-h1'>We Serve Healthy & Tasty Food</h1>
                <p>
                    At RoyalFood, we believe that good food can also be good for you. That's why we're committed to serving healthy, nutritious meals that are both delicious and satisfying. We use only the freshest, locally sourced ingredients and avoid artificial additives and preservatives. 
                </p>
                <Link to={`/menu`}><button>Explore Our Menu</button></Link>
                </div>
            </div>
        </section>

        <section className="fourth">
            <div className="fourth-section-division">
                <h1>Get Your Favorite Food In Just 25 Minutes</h1>
                <p>
                    We are committed to delivering your food to your doorstep in just 25 minutes or less. With our streamlined ordering process and efficient delivery system,
                    you can enjoy your favorite dishes without the hassle of long wait times.
                </p>
            </div>
            <div className="fourth-section-division">
                <div className="fourth-section-division-card" onClick={()=>{handleOrderProcessDescription(1,'Order Your Food')}}>
                    <div className="card-icon-container">
                        <FaGitter className='card-icon'/>
                    </div>
                    <h3>Order Your Food</h3>
                    <p className='more-info'>
                        {`${howToUseInfo.order.substring(0,150)}...`} 
                    </p>
                    <p className="read-more">Read more <FaArrowRight className='read-more-icon'/></p>
                </div>
                <div className="fourth-section-division-card" onClick={()=>{handleOrderProcessDescription(2,'Pick Up Your Food')}}>
                    <div className="card-icon-container">
                        <FaGitter className='card-icon'/>
                    </div>
                    <h3>Pick Up Your Food</h3>
                    <p className='more-info'>
                        {`${howToUseInfo.pick.substring(0,150)}...`}    
                    </p>
                    <p className="read-more">Read more <FaArrowRight className='read-more-icon'/></p>
                </div>
                <div className="fourth-section-division-card" onClick={()=>{handleOrderProcessDescription(3,'Enjoy Your Food')}}>
                    <div className="card-icon-container">
                            <FaGitter className='card-icon'/>
                    </div>
                    <h3>Enjoy Your Food</h3>
                    <p className='more-info'>
                        {`${howToUseInfo.enjoy.substring(0,150)}...`} 
                    </p>
                    <p className="read-more">Read more <FaArrowRight className='read-more-icon'/></p>
                </div>
            </div>
        </section>

        <section className='fifth'>
            <div className="fifth-section-division">
                
                <div className='para'>
                    <h1 className='desktop-third-h1'>Cooked by the Best Chefs in the World.</h1>
                    <p> Our team of culinary experts is passionate about creating unique and delicious dishes that are sure to satisfy your taste buds.</p>
                    <ul>
                        <li>
                            <div className="fifth-second-division-icon-container">
                                <FaCheck/>
                            </div>
                            <p>A guaranted delicious meal</p>
                        </li>
                        <li>
                            <div className="fifth-second-division-icon-container">
                                    <FaCheck/>
                            </div>
                            <p>Hygienic guaranted process</p>
                        </li>
                        <li>
                            <div className="fifth-second-division-icon-container">
                                    <FaCheck/>
                            </div>
                            <p>Cooked and Served Quickly</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="fifth-section-division">
                <h1 className='mobile-third-h1'>Cooked by the Best Chefs in the World.</h1>
                <div className="circle-container">
                    <img src={chef} alt="" />
                </div>
            </div>
        </section>

        <section className="sixth">
            <h1>
                What Our Customers Are Saying
            </h1>
            <p>
                We pride ourselves on providing exceptional service and delicious food to our customers. But don't just take our word for it, here's what some of our satisfied customers have to say
            </p>
            <div className="review">
                <div className="navigation" onClick={()=>/* findReviewPost(1) */ setId(id+1)}><FaCaretLeft/></div>
                <div className="review-container">
                    <p className="review-message">
                        {selectedReview?.message}
                    </p>
                    <div className="reviewer-image">
                        <img src={
                        id===1?prof1:
                        id===2?prof2:
                        prof3}
                         alt="" />
                    </div>
                    <h3>{selectedProfile?.name}</h3>
                    <p>Happy Customer</p>
                </div>
                <div className="navigation" onClick={()=>/* findReviewPost(-1) */ setId(id-1)}><FaCaretRight /></div>
            </div>
            
        </section>
       {/*  </>:
        <LoadPage/>
        } */}
    </main>
  )
}

export default Landing