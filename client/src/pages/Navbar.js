import React from 'react';
import { useState } from 'react';
import menu from "../assets/icon-menu.svg";
import closeMenu from "../assets/icon-close.svg";
const Navbar = (props) => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenu = () => {
    setIsMenuOpen((prev)=>!prev);
  }

  const handleLogin=()=>{
    window.location.href='/signin';
  }
  const handleRegister=()=>{
    window.location.href='/signup';
  }

  const handleManage=()=>{
    window.location.href='/manage';
  } 

  return (
    <div className='flex justify-between p-8 shadow bg-black text-yellow-400 border-b-2'>
      <div className='text-3xl md:text-4xl'>
       EWallet
      </div>
      <div className='md:hidden'>
        <img onClick={handleMenu} src={menu} alt='' className='w-8'/>
      </div>
      {isMenuOpen && <div className='md:hidden fixed overflow-y-auto p-5 top-0 bottom-0 right-0 w-2/3  bg-white text-gray-400 text-xl  bg-opacity-100 z-50'>
      <div  className='flex justify-end md:hidden'>
        <img onClick={handleMenu} src={closeMenu} className='w-10'/>
        </div>
      <div className='mt-10 flex flex-col gap-10 justify-center items-center text-black'>
        <div className='text-lg '>Track</div>
        <div className='text-lg' onClick={handleManage}>Manage</div>
        <div><button className='p-2 px-6 bg-blue-700 rounded-md text-white text-lg' onClick={handleRegister}>Register</button></div>
        <div><button className='p-2 px-6 bg-blue-700 rounded-md text-white text-lg' onClick={handleLogin}>Login</button></div>
      </div>
        </div>}
      <div className='hidden md:flex md:gap-10 md:justify-center md:items-center'>
        <div className='text-2xl '>Track</div>
        <div className='text-2xl ' onClick={handleManage}>Manage</div>
        <div><button className='p-2 px-6 bg-blue-700 rounded-md text-white text-lg' onClick={handleRegister}>Register</button></div>
        <div><button className='p-2 px-6 bg-blue-700 rounded-md text-white text-lg' onClick={handleLogin}>Login</button></div>
      </div>
    </div>
  );
};

export default Navbar;