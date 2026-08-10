import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Cart.css'
import { useCart } from '../../context/CartContext'

const formatPrice = (value) => value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart()
  const [checkedOut, setCheckedOut] = useState(false)

  const handleCheckout = () => {
    setCheckedOut(true)
    clearCart()
  }

  if (checkedOut) {
    return (
      <div className='cart_page'>
        <h1>Thank you for your order<span className='dot'>.</span></h1>
        <p>We've received your order and will reach out with the shipping details.</p>
        <Link to='/Guitars' className='cart_browse'>Continue shopping</Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className='cart_page'>
        <h1>Your Cart<span className='dot'>.</span></h1>
        <p>Your cart is empty right now.</p>
        <Link to='/Guitars' className='cart_browse'>Browse guitars</Link>
      </div>
    )
  }

  return (
    <div className='cart_page cart_page_filled'>
      <h1>Your Cart<span className='dot'>.</span></h1>

      <div className='cart_items'>
        {items.map(item => (
          <div className='cart_item' key={item.id}>
            <img src={item.image} alt={item.title} />

            <div className='cart_item_info'>
              <Link to={`/Guitars/${item.id}`}>
                <h3>{item.title}</h3>
              </Link>
              <p>USD $ {item.priceText}</p>
            </div>

            <div className='cart_item_quantity'>
              <button type='button' onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
              <span>{item.quantity}</span>
              <button type='button' onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            </div>

            <p className='cart_item_subtotal'>USD $ {formatPrice(item.price * item.quantity)}</p>

            <button type='button' className='cart_item_remove' onClick={() => removeFromCart(item.id)} aria-label='Remove item'>✕</button>
          </div>
        ))}
      </div>

      <div className='cart_summary'>
        <button type='button' className='cart_clear' onClick={clearCart}>Clear cart</button>
        <div className='cart_total'>
          <span>Total:</span>
          <h2>USD $ {formatPrice(totalPrice)}</h2>
        </div>
        <button type='button' className='cart_checkout' onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  )
}

export default Cart
