import React from 'react'
import SolarSystem from "../components/Solar-System-React-Three-Fiber/src/solarSystem"


function Homepage() {
  return (
    <div className='homepage'>

                    
      <div className="solar-system-container">
        <SolarSystem />
      </div>
      
    </div>
  )
}

export default Homepage