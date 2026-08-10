import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'
import {nav_assets} from "../../assets/assets.js"
import Media from './Media/Media.jsx'
import Information from './Information/Information.jsx'
import Newsletter from './Newsletter/Newsletter.jsx'

const Footer = () => {
  return (
    <div className='footer'>
        <div className='footer_logo'>
          <Link to='/'>
            <img className='img_footer' src={nav_assets.logo} alt="Les Paul Garage logo" />
          </Link>
          <p className='rights_reserved'>Les Paul Garage © All rights reserved.</p>
        </div>

        <div>
          <Media />
        </div>

        <div className='info_class'>
          <Information />
        </div>

        <div>
          <Newsletter />
        </div>
    </div>
  )
}

export default Footer
