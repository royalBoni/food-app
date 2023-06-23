import './header.css';
import { FaBars,FaTimes } from 'react-icons/fa'
import { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectAllCarts } from '../features/cart/cartSlice';
import { setIsToggleMobileNav,setIsAnimateMobileNav} from '../features/actions/actionStateSlice';
import CartSymbol from './CartSymbol';

const Header = () => {
    const [hideOrShow,setHideOrShow]=useState('hidden')
    const [activeItem,setActiveItem]=useState(1)
    const isToggleNav = useSelector((state)=>state.promptMessage.isToggleMobileNav)
    
    const myId= JSON.parse(localStorage.getItem("myUserId"));
    const userId =myId?.id
    
    const cartItems = useSelector(selectAllCarts)

    if(userId){
      localStorage.setItem("myCartItems", JSON.stringify(cartItems)); 
    }
    else{
      localStorage.removeItem("myCartItems")
    }

    
    const dispatch = useDispatch()


    const onToggleNavButtonOn = ()=>{
      dispatch(setIsToggleMobileNav(false))
      setTimeout(() => {
        dispatch(setIsAnimateMobileNav(true))
      }, 50);
      
    }

    const onToggleNavButtonOff = (item)=>{
      setActiveItem(item)
      dispatch(setIsAnimateMobileNav(false))
      setTimeout(() => {
        dispatch(setIsToggleMobileNav(true))
      }, 500);
    }


    /* const logout = ()=>{
        localStorage.removeItem("myUserId")
        navigate('/login')
    } */

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
                    <div className="brand"><span>Royal</span>Food</div>
                    <nav>
                        <Link to={'/'} onClick={()=>onToggleNavButtonOff(1)} className={`nav-link ${activeItem===1?'active':null}`}>Home</Link>
                        <Link to={'/about'} onClick={()=>onToggleNavButtonOff(2)} className={`nav-link ${activeItem===2?'active':null}`}>About</Link>
                        <Link to={'/services'} onClick={()=>onToggleNavButtonOff(3)} className={`nav-link ${activeItem===3?'active':null}`}>Services</Link>
                        <Link to={'/menu'} onClick={()=>onToggleNavButtonOff(4)} className={`nav-link ${activeItem===4?'active':null}`}>Menu</Link>
                        <Link to={'/contact'} onClick={()=>onToggleNavButtonOff(5)} className={`nav-link ${activeItem===5?'active':null}`}>Contact</Link>
                    </nav>
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