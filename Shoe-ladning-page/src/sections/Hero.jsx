import React from 'react'
import Button from '../components/Button'
const Hero = () => {
  return (
    <section
    id='home'
    className='w-full flex xl:flex-row flex-col  justify-center min-h-screen gap-10 max-container'
    >
    <div className='xl:w-2/5 flex flex-col justify-center items-start w-full max-xl:padding-x pt-28'>
     <p>
        Our Summer Collection
     </p>
     <h1>
        <span>
            The New Arrival
        </span><br />
        <span> Nike</span> Shoes
     </h1>
     <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
     </p>
     <Button/>
    </div>
    
    
        
    </section>
  )
}

export default Hero
