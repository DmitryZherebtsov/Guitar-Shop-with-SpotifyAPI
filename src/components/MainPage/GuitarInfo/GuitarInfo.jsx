import React from 'react'
import { Link } from 'react-router-dom'
import './GuitarInfo.css'
import { nav_assets } from '../../../assets/assets'

const GuitarInfo = () => {
  return (
    <div className='guitar_info_section'>
        <div className='background_more'> </div>
        <div className='more_info'>
            <div className='first_more'>

                <p>Advanced customization</p>

                <h1>Customize your Les Paul <span className='dot'>.</span></h1>

                <p>     If you are a guitarist looking for a Les Paul
                    that reflects your personality and style,
                    you need to know our customization process.
                    <br />
                    <br />
                        Our services allow you to create a unique
                    and exclusive guitar, tailored to your needs
                    and preferences.   
                </p>
            
                <span className='check_boxes'>
                    <h5><img src={nav_assets.check} alt="" /> Accessories</h5>
                    <h5><img src={nav_assets.check} alt="" />Finish and appearance</h5>
                    <h5><img src={nav_assets.check} alt="" />Changing pickups, knobs and bridge</h5>
                    <h5><img src={nav_assets.check} alt="" />Adding decorative elements</h5>
                    <h5><img src={nav_assets.check} alt="" />And much more</h5>
                </span>

                <Link className='link_for_more' to="/AboutUs">MORE INFORMATION</Link>
            </div>

            <div className='second_more'>
                <img src={nav_assets.img_intro2} className='more_img' alt="Custom Les Paul guitar" />
            </div>

        </div>
    </div>
  )
}

export default GuitarInfo
