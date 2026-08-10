import React from 'react'
import { Link } from 'react-router-dom'
import './SelectItems.css'
import { guitars } from '../../../assets/assets'

const SelectItems = () => {
  return (
    <div className='select_item'>
        <br />

        <h1>Select your Guitar<span className='dot'>.</span></h1>

        <div className='guitar_items'>
            {guitars.map(item => (
                <Link to='/Guitars' className='item' key={item.id}>
                    <div className='item_image_wrap'>
                        <img src={item.image} alt={item.title} />
                    </div>

                    <h2>{item.title}</h2>

                    <p>USD $ {item.price_text}</p>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default SelectItems
