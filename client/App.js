import React from 'react'

import Navbar from './components/Navbar'
import Routes from './Routes'
// import Button from 'react-bootstrap/Button'
// import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  return (
    <div className="p-3 mb-2 bg-white text-dark">

      <Navbar />
      <Routes />
    </div>
  )
}

export default App
