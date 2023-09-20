import './header.css';
import { FaBars,FaTimes} from 'react-icons/fa'
import { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { selectAllCarts } from '../features/cart/cartSlice';
import { setIsToggleMobileNav,setIsAnimateMobileNav, setPageWidth} from '../features/actions/actionStateSlice';
import CartSymbol from './CartSymbol'
import AccountToggle from './AccountToggle';
import { extendedApiProfileSlice } from '../features/profiles/profileSlice';
import { store } from '../app/store';


const Header = () => {

  useEffect(()=>{
    store.dispatch(extendedApiProfileSlice.endpoints.getUserProfiles.initiate())
  })

  // ASSINGMENT AND DECLARATIONS
    const [hideOrShow,setHideOrShow]=useState('hidden')
    const [activeItem,setActiveItem]=useState(1)
    const isToggleNav = useSelector((state)=>state.promptMessage.isToggleMobileNav)
    const pageWidth=useSelector((state)=>state.promptMessage.pageWidth);
    const dispatch = useDispatch()
    const navigate=useNavigate()
    
    //GETTING USER ID FROM LOCAL STORAGE
    const myId= JSON.parse(localStorage.getItem("myUserId"));
    const userId =myId?.id
    
    //FETCHING ALL USER CARTS FROM OUR REDUX STATE STORE
    const cartItems = useSelector(selectAllCarts)

    //GETTING THE PAGE WIDTH AFTER EVERY PAGE LOAD AND THEN SETTING THE WIDTH TO THE STORE TO BE USED BY OTHER COMPONENTS
    useEffect(()=>{
      const width=window.innerWidth
      dispatch(setPageWidth(width))
    })
    
    //GETTING THE PAGE WIDTH AFTER EVERY PAGE RESIZE EVENT AND THEN SETTING THE WIDTH TO THE STORE TO BE USED BY OTHER COMPONENTS
    const screen = () =>{
      const width=window.innerWidth
      dispatch(setPageWidth(width))
   
   }
    window.onload=screen
    window.onresize=screen

    //IF A USER IS LOGGED IN AND USER ID IS STORE ON LOCAL STORAGE THEN USER CART ITEMS WILL ALSO BE STORE ON LOCAL STORAGE
    if(userId){
      localStorage.setItem("myCartItems", JSON.stringify(cartItems)); 
    }

    //IF USER LOGOUTS AND THE USER IS DELETED, THE USERS CART ITEMS WILL ALL ALSO BE DELETED PERMANENTLY
    else{
      localStorage.removeItem("myCartItems")
    }

    //TOGGLE HOME WHEN BRAND IS CLICKED
    const handleBrandClicked=()=>{
      onToggleNavButtonOff(1)
      navigate('/')

    }
    // A FUNCTION TO TURN ON THE NAVIGATIONS WHEN IN MOBILE MODE AND STATUS IS SENT TO THE REDUX STORE
    const onToggleNavButtonOn = ()=>{
      dispatch(setIsToggleMobileNav(false))
      setTimeout(() => {
        dispatch(setIsAnimateMobileNav(true))
      }, 50);
      
    }

    // FUNCTION TO TURN OFF THE NAVIGATIONS WHEN IN MOBILE  AND STATUS IS SENT TO THE REDUX STORE
    // ITEM ID NUMBER IS PASSED TO THE FUNCTION TO SHOW WHICH LIST ITEM IS ACTIVE WHEN NOT IN MOBILE MODE
    const onToggleNavButtonOff = (item)=>{
      setActiveItem(item) //ACTIVE ITEM IS SETTED
      dispatch(setIsAnimateMobileNav(false))
      setTimeout(() => {
        dispatch(setIsToggleMobileNav(true))
      }, 500);
    }

    //ANIMATIONS OF THE HEADER THAT TAKES PLACE WHEN AN ENTRY IS INTESECTED
    useEffect(()=>{
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                    setHideOrShow('show')
              }
              else{
                 setHideOrShow('hidden')
              }
          
            });
          });
        
        const hiddenElements= document.querySelectorAll('.hidden');
        hiddenElements.forEach((el)=>observer.observe(el));
    })
  return (
            <header className={`${hideOrShow}`}>
                <div className='header'>
                    <div className="brand" onClick={handleBrandClicked}><span>Royal</span>Food</div>
                    <nav>
                        <Link to={'/'} onClick={()=>onToggleNavButtonOff(1)} className={`nav-link ${activeItem===1?'active':null}`}>Home</Link>
                        <Link to={'/about'} onClick={()=>onToggleNavButtonOff(2)} className={`nav-link ${activeItem===2?'active':null}`}>About</Link>
                        <Link to={'/services'} onClick={()=>onToggleNavButtonOff(3)} className={`nav-link ${activeItem===3?'active':null}`}>Services</Link>
                        <Link to={'/menu'} onClick={()=>onToggleNavButtonOff(4)} className={`nav-link ${activeItem===4?'active':null}`}>Menu</Link>
                        <Link to={'/contact'} onClick={()=>onToggleNavButtonOff(5)} className={`nav-link ${activeItem===5?'active':null}`}>Contact</Link>
                    </nav>

                    {
                      pageWidth<600?null:<AccountToggle/>
                    }
                    

                    <div className="desktop-cart-symbol"><CartSymbol/></div>
                  
                    {
                      isToggleNav?
                      <FaBars className='toggle-nav-on' onClick={onToggleNavButtonOn}/>:
                      <FaTimes className='toggle-nav-off' onClick={()=>onToggleNavButtonOff(activeItem)}/>
                    }
                    

                    {/* <button onClick={logout}>logout</button> */}
                </div>
            </header>

  )
}

export default Header