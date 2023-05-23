import React from 'react'

import Navbar from './components/Navbar'
import Routes from './Routes'
import Banner from './components/Banner'
// import myImage from './celebration.png'
// import Celebration from './Images/celebration.png'

// import Button from 'react-bootstrap/Button'
// import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <Routes />
    </div>
  )
}

export default App
