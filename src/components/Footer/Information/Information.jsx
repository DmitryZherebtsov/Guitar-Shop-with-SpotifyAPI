import React from 'react'
import { Link } from 'react-router-dom'
import './Information.css'

const Information = () => {
  return (
    <div>
      <div>
        <h2>Information</h2>
      </div>

      <div className='information'>
        <Link to='/Find_Artists'>Find Artists</Link>
        <Link to='/Guitars'>Guitars</Link>
        <Link to='/Cart'>Cart</Link>
        <Link to='/AboutUs'>About Us</Link>
      </div>
    </div>
  )
}

export default Information
