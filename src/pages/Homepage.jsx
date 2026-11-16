import React from 'react'
import SolarSystem from "../components/Solar-System-React-Three-Fiber/src/solarSystem"


function Homepage() {
  return (
    <div className='homepage'>

      <div className='logoTitleDiv'>
        <div className='logoDiv'>

        </div>
        
        <div className='homepageTitlesContainer'>
          <h1 className='webTitle-homepage'>Orbital</h1>
          <h3 className='subTitle'>Explore the Universe</h3>
        </div>
        

      </div>
                    
      <div className="solar-system-container">
        <SolarSystem />
      </div>
      
    </div>
  )
}

export default Homepage