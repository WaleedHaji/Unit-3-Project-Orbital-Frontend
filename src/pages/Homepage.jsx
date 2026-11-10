import React from 'react'
import SolarSystem from "../components/Solar-System-React-Three-Fiber/src/solarSystem"

function Homepage() {
  return (
    <div>
      <h1 className='webTitle-homepage'>Orbital</h1>
              
      <div className="solar-system-container">
        <SolarSystem />
      </div>
      
    </div>
  )
}

export default Homepage