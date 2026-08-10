import React from 'react'
import './AboutUs.css'
import { nav_assets } from '../../assets/assets'

const AboutUs = () => {
  return (
    <div className='about_us'>
      <h1>ABOUT GIBSON</h1>

      <p>Gibson Inc., the world’s most iconic guitar brand,
        has shaped the sounds of generations of musicians
        and music lovers across genres for more than 100 years.
        Founded in 1894 and headquartered in Nashville, TN, Gibson
        has a legacy of world-class craftsmanship, legendary music
        partnerships, and progressive product evolution that is
        unrivaled among musical instrument companies. The Gibson
        portfolio includes Gibson, the number one guitar brand, 
        as well as many of the most beloved and recognizable music brands,
        including Epiphone, Kramer, Steinberger, MESA/Boogie, and
        the Gibson Pro Audio division, KRK Systems. Gibson is dedicated
        to quality, innovation, and sound excellence so that music lovers
        for generations to come will continue to experience music shaped by
        Gibson. Learn more at Gibson.com and follow us on 
        <a href="https://twitter.com/gibsonguitar" target="_blank" rel="noopener noreferrer"> Twitter</a>,
        <a href="https://www.facebook.com/Gibson" target="_blank" rel="noopener noreferrer"> Facebook</a> and 
        <a href="https://www.instagram.com/gibsonguitar/" target="_blank" rel="noopener noreferrer"> Instagram</a>.</p>

        <h1>Cesar Gueikian</h1>
        <h3>President and Chief Executive Officer</h3>

        <img src={nav_assets.cesar} className='founder_img' alt="Cesar Gueikian" />

      <div className='map'>
        <br />
        <h1>Check Us On Map!</h1>
        <p>You're always welcome in our Gibson Garage on 209 10th Ave S#209, Nashville, TN 37203, USA</p>
        <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14058.814147027982!2d-86.78657823181229!3d36.154174809567074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8864672b6855b195%3A0x4bf5a2e89662eee8!2sThe%20Gibson%20Garage!5e0!3m2!1suk!2spl!4v1719411485570!5m2!1suk!2spl"
        title="Gibson Garage location map"
        className='map_google'
        allowFullScreen="" 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade" />
      </div>

      <p><b>We are open from Monday to Sunday from 11:00 to 18:00</b></p>
      
    </div>
  )
}

export default AboutUs
