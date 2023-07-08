import React from 'react'
import { useSelector} from 'react-redux'
import { FaShoppingBag } from 'react-icons/fa'
import { selectAllDishes } from '../features/posts/postSlice'
import './cartmini.css'

const CartMini = () => {
    const cartMini=useSelector((state)=>state.promptMessage.cartMini)
    const allDishes =useSelector(selectAllDishes)

    const myCart= JSON.parse(localStorage.getItem("myCartItems"));
    let total=0

    myCart?.map((item)=>{
      total+=(item.price-((item.discount/100)*item.price))*item.quantity
      return total
    })

    const productImage=(id)=>{
      const findDish = allDishes.find((dish)=>dish._id===id)
      return findDish?.dish_image_url
    }
    
  return (
    <div className={cartMini?'open':'close'}>
    <div className={cartMini?'cart-mini':'no-cart-mini'}>
      {
        (myCart?.length)===0?
        <div className="cart-mini-empty">
          <FaShoppingBag className='cart-mini-icon'/>
          <p>CART IS EMPTY</p>
        </div>
        :
        <div className="cart-mini-content">
          {
            myCart?.map((item)=>{
              return(
                <div key={item._id} className="individual-cart-mini-content">
                  <div className="item-info">
                    <div className="item-image"><img src={productImage(item.dishId)} alt="" /></div>
                    <div className="item-info-info">
                      <h4>{item.dishName}</h4>
                      <div className="price">
                        <p>{`${item.quantity} * `} <span className={item.discount?'old-price':null}>{`GHS${item.price}`}</span></p>
                        {
                          item.discount>0 &&
                          <p>{`GHS${(item.price-((item.discount/100)*item.price)).toFixed(2)}`}</p>
                        }
                      </div>
                    </div>
                  </div>

                 
                </div>
              )
            })
          }
           <div className="total">
              <p>Sub Total</p>
              <h4>{`GHS${total.toFixed(2)}`}</h4>
            </div>
        </div>
      }
    </div>
    </div>
  )
}

export default CartMini