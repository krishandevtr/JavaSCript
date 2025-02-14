import React from 'react'
import {headerLogo} from "../assets/images"
import {hamburger} from "../assets/icons"
const Nav = () => {
  return (
    <header className='padding-x py-8 absolute z-10 w-full'>
        <nav className='flex justify-between max-container items-center '>
            <a href="/">
                <img src={headerLogo} alt=""
                width={130}
                height={20}
                className='m-0 w-[129px] h-[29px]'
                />
            </a>

                <ul className='flex-1 flex justify-center items-center gap-16 max-lg:hidden '>
                        <li><a href=""  className='font-montserrat leading-normal text-lg text-slate-gray'>Home</a></li>
                        <li><a href=""  className='font-montserrat leading-normal text-lg text-slate-gray'>About Us</a></li>
                        <li><a href=""  className='font-montserrat leading-normal text-lg text-slate-gray'>Products</a></li>
                        <li><a href=""  className='font-montserrat leading-normal text-lg text-slate-gray'>Contact us</a></li>
                </ul>
                <div className='hidden max-lg:block'>
                    <img src={hamburger} alt="" width={26} height={12}/>
                </div>
                
            
        </nav>
    </header>
  )
}

export default Nav
