
import { useSelector,useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setIsAnimateMobileNav,setIsToggleMobileNav } from '../features/actions/actionStateSlice'
import './mobileNav.css'

export const MobileNav = () => {
    const dispatch =useDispatch()
    const isToggleMobileNav = useSelector((state)=>state.promptMessage.isToggleMobileNav)
    const isAnimateMobileNav = useSelector((state)=>state.promptMessage.isAnimateMobileNav)
  
    const onToggleNavButtonOff = ()=>{
      dispatch(setIsAnimateMobileNav(false))
      setTimeout(() => {
        dispatch(setIsToggleMobileNav(true))
      }, 500);
    }

  return (
    <div className={isToggleMobileNav?'no-mobile-nav':'mobile-nav'}>
      <div className={isAnimateMobileNav?'animate-nav':'no-animate-nav'}>
          <Link to={'/'} onClick={onToggleNavButtonOff} className='nav-link'>Home</Link>
          <Link to={'/about'} onClick={onToggleNavButtonOff} className='nav-link'>About</Link>
          <Link to={'/services'} onClick={onToggleNavButtonOff} className='nav-link'>Services</Link>
          <Link to={'/menu'} onClick={onToggleNavButtonOff} className='nav-link'>Menu</Link>
          <Link to={'/contact'} onClick={onToggleNavButtonOff} className='nav-link'>Contact</Link>
      </div>
    </div>
  )
}
