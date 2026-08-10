import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Guitars.css'
import { guitars, nav_assets } from '../../assets/assets'
import { useCart } from '../../context/CartContext'

const Guitars = () => {
  const { addToCart } = useCart()
  const [addedId, setAddedId] = useState(null)

  const handleAddToCart = (item) => {
    addToCart(item)
    setAddedId(item.id)
    setTimeout(() => setAddedId(null), 1500)
  }

  return (
    <div className='guitars_page'>
      <div className='guitar_collection'>
        <p>Choose the best one for you</p>
        <h1 className='caption_guitars'>Our Guitar collection<span className='dot'>.</span></h1>
      </div>

      <div className='collection'>
        {guitars.map(item => (
          <div className='collection_item' key={item.id}>

            <Link to={`/Guitars/${item.id}`} className='image_container'>
              <img className='collection_item_image' src={item.collection} alt={item.title} />
            </Link>

            <div className='collection_item_description'>
              <div className='title_element'>
                <h2>{item.title} <span className='dot'>.</span></h2>
                <img src={nav_assets.decorador} alt="decorador" />
              </div>

              <p className='guitar_description'>{item.description}</p>

              <p className='additional_info'>{item.additional}</p>

              <div className='price_guitars'>
                <h3>{item.price_text} $</h3>
                <div className='guitar_actions'>
                  <Link to={`/Guitars/${item.id}`} className='button_guitars button_outline'>More Information</Link>
                  <button className='button_guitars' onClick={() => handleAddToCart(item)}>
                    {addedId === item.id ? 'Added ✓' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Guitars
