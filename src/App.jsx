import React from 'react'
import { BrowserRouter as Router, Routes , Route} from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import MainPage from './components/MainPage/MainPage'
import Guitars from './components/Guitars/Guitars'
import GuitarDetail from './components/Guitars/GuitarDetail'
import AboutUs from './components/AboutUs/AboutUs'
import Cart from './components/Cart/Cart'
import FindArtists from './components/FindArtists/FindArtists.jsx'
import { CartProvider } from './context/CartContext'

const App = () => {
  return (
    <CartProvider>
      <div>
        <Router>
          <Header />

            <Routes>
              <Route path="/" element={<MainPage />} />

              <Route path="/Find_Artists" element={<FindArtists/>} />

              <Route path="/Guitars" element={<Guitars/>} />
              <Route path="/Guitars/:id" element={<GuitarDetail/>} />

              <Route path="/AboutUs" element={<AboutUs/>} />

              <Route path="/Cart" element={<Cart/>} />
            </Routes>

          <Footer/>
        </Router>
      </div>
    </CartProvider>
  )
}

export default App