import React from 'react'
import './products.css'
import { selectAllDishes } from '../../../features/posts/postSlice'
import { useSelector } from 'react-redux'

const Products = () => {

  const allDishes= useSelector(selectAllDishes)
  console.log(allDishes)

  return (
    <div className='admin-products'>
        <div className="admin-poducts-item">boni</div>
        <div className="admin-poducts-item">
          <div className="section-header-title-name"><span>5555</span> Dishes on sales</div>
          <input type="text" placeholder='Search by name' />
        </div>
        <div className="admin-poducts-item">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
            {
              allDishes?.map((item)=>{
                return(
                        <tr key={item._id}>
                          <td>check</td>
                          <td>{item.dishName}</td>
                          <td>{item.category}</td>
                          <td>{item.price}</td>
                          <td>{item.discount}</td>
                          <td>Actions</td>
                        </tr>
                      )
                })
            }
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default Products