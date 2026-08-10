import React from 'react'
import './Media.css'
import { nav_assets } from '../../../assets/assets'

const Media = () => {
  return (
    <div>
       <div>
        <h2>Contacts</h2>
       </div>

       <div>
            <p>
                +1 (615) 555-0199
                <br />
                contato@lespaulgarage.com
            </p>
       </div>

       <div>
             <hr />
             <br />
            <p>
                209 10th Ave S #209
                <br />
                Nashville, TN 37203, USA
            </p>
       </div>

       <div className='medias'>
             <hr />
             <br />
            <a href="https://www.instagram.com/gibsonguitar/" target="_blank" rel="noopener noreferrer">
              <img className='insta' src={nav_assets.instagram} alt="Instagram" />
            </a>

            <a href="https://www.facebook.com/Gibson" target="_blank" rel="noopener noreferrer">
              <img className='faceb' src={nav_assets.facebook} alt="Facebook" />
            </a>

            <a href="https://www.youtube.com/@gibsonguitar" target="_blank" rel="noopener noreferrer">
              <img className='yout' src={nav_assets.youtube} alt="YouTube" />
            </a>
       </div>   
     
       <p className='rights_reserved_mobile'>Les Paul Garage © All rights reserved.</p>
    </div>
  )
}

export default Media
