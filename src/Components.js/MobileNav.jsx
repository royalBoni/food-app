
import { useSelector,useDispatch } from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'
import { setIsAnimateMobileNav,setIsToggleMobileNav } from '../features/actions/actionStateSlice'
import './mobileNav.css'

export const MobileNav = () => {
    const dispatch =useDispatch()
    const navigate=useNavigate()
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

    const logout = (id)=>{
      onToggleNavButtonOff()
      if(id===1){
          localStorage.removeItem("myUserId")
          navigate('/login')
          console.log(1)
      }
      else if(id===2){
          navigate('/account')
          console.log(2)
      }
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
            <li onClick={()=>logout(2)} className='nav-link'>Account</li>
            :null
          }
          {
            pageWidth<600 && myId?.id?
            <Link onClick={()=>logout(1)} className='nav-link'>Logout</Link>
            :null
          }
      </div>
    </div>
  )
}
