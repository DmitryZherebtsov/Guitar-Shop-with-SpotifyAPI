import React from 'react'
import style from './MainPage.module.css'
import MainBlock from './MainBlock/MainBlock'
import SelectItems from './SelectItems/SelectItems'
import GuitarInfo from './GuitarInfo/GuitarInfo'
import Companies from './Companies/Companies'
import Testimonials from './Testimonials/Testimonials'

const MainPage = () => {
  return (
    <div>
        <MainBlock />
    
        <SelectItems />

        <GuitarInfo />

        <Testimonials />

        <Companies />
    </div>
  )
}

export default MainPage