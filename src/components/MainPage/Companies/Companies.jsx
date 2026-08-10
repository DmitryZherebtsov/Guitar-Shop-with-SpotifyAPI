import React from 'react'
import './Companies.css'
import { sponsors } from '../../../assets/assets'

const Companies = () => {
  return (
    <div className='companies'>

        <h1>Our partners<span className='dot'>.</span></h1> 

        <div className='partners'>
        {sponsors.map(item => (
             <div className='company_logo' key={item.image}> 
                <img src={item.image} alt="Partner logo" />
             </div>
        ))}
        </div>
    </div>
  )
}

export default Companies
