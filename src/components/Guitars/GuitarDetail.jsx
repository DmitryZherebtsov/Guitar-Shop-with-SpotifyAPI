import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import './GuitarDetail.css'
import { guitars, nav_assets } from '../../assets/assets'
import { useCart } from '../../context/CartContext'

const GuitarDetail = () => {
  const { id } = useParams()
  const guitar = guitars.find(item => item.id === id)
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  if (!guitar) {
    return (
      <div className='guitar_detail_page not_found'>
        <h1>Guitar not found<span className='dot'>.</span></h1>
        <Link to='/Guitars' className='button_guitars'>Back to collection</Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(guitar)
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className='guitar_detail_page'>
      <Link to='/Guitars' className='back_link'>&larr; Back to collection</Link>

      <div className='guitar_detail_content'>
        <div className='guitar_detail_image_wrap'>
          <img src={guitar.collection} alt={guitar.title} />
        </div>

        <div className='guitar_detail_info'>
          <h1>{guitar.title}<span className='dot'>.</span></h1>
          <p className='guitar_detail_description'>{guitar.description}</p>

          <div className='guitar_detail_specs'>
            <h3><img src={nav_assets.decorador} alt="" />Specifications</h3>
            <p className='guitar_detail_additional'>{guitar.additional}</p>
          </div>

          {guitar.genres && (
            <div className='guitar_detail_genres'>
              {guitar.genres.map(genre => (
                <span key={genre} className='genre_tag'>{genre}</span>
              ))}
            </div>
          )}

          <div className='guitar_detail_purchase'>
            <h2>{guitar.price_text} $</h2>

            <div className='quantity_selector'>
              <button type='button' onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
              <span>{quantity}</span>
              <button type='button' onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>

            <button type='button' className='button_guitars add_to_cart_btn' onClick={handleAddToCart}>
              {added ? 'Added ✓' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GuitarDetail
