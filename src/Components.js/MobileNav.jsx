
import { useSelector,useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setIsAnimateMobileNav,setIsToggleMobileNav } from '../features/actions/actionStateSlice'
import './mobileNav.css'

export const MobileNav = () => {
    const dispatch =useDispatch()
    const isToggleMobileNav = useSelector((state)=>state.promptMessage.isToggleMobileNav)
    const isAnimateMobileNav = useSelector((state)=>state.promptMessage.isAnimateMobileNav)
    const pageWidth=useSelector((state)=>state.promptMessage.pageWidth);

    const myId= JSON.parse(localStorage.getItem("myUserId"));
  
    const onToggleNavButtonOff = ()=>{
      dispatch(setIsAnimateMobileNav(false))
      setTimeout(() => {
        dispatch(setIsToggleMobileNav(true))
      }, 500);
    }

    const logout = ()=>{
      localStorage.removeItem("myUserId")
      onToggleNavButtonOff()
    } 

  return (
    <div className={isToggleMobileNav?'no-mobile-nav':'mobile-nav'}>
      <div className={isAnimateMobileNav?'animate-nav':'no-animate-nav'}>
          <Link to={'/'} onClick={onToggleNavButtonOff} className='nav-link'>Home</Link>
          <Link to={'/about'} onClick={onToggleNavButtonOff} className='nav-link'>About</Link>
          <Link to={'/services'} onClick={onToggleNavButtonOff} className='nav-link'>Services</Link>
          <Link to={'/menu'} onClick={onToggleNavButtonOff} className='nav-link'>Menu</Link>
          <Link to={'/contact'} onClick={onToggleNavButtonOff} className='nav-link'>Contact</Link>
          {
            pageWidth<600 && myId?.id?
            <Link to={'/account'} onClick={onToggleNavButtonOff} className='nav-link'>Account</Link>
            :null
          }
          {
            pageWidth<600 && myId?.id?
            <Link to={'/login'} onClick={logout} className='nav-link'>Logout</Link>
            :null
          }
      </div>
    </div>
  )
}
