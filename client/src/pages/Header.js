import React, { useEffect } from 'react';
import { useState } from 'react';
import menu from "../assets/icon-menu.svg";
import closeMenu from "../assets/icon-close.svg";
import NotificationImg from "../assets/notification.png";
import Notification from './Notification';
import axios from 'axios';

const Header = (props) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNotiOpen,setIsNotiOpen]=useState(false);
  const handleMenu = () => {
    setIsMenuOpen((prev)=>!prev);
  }
  const handleNotification=()=>{
    setIsNotiOpen((prev)=>!prev)
  }
 
  const [notifications,setNotifications]=useState([]);

  useEffect(()=>{
    const fetchData=async()=>{
      try{
       const response=await axios.get("http://localhost:8000/api/v1/notifications/get-notifications",{
          withCredentials:true,
          headers:{
            "Content-Type":"application/json",
          },
        });
        console.log("response",response);
        setNotifications(response.data.unreadNotifications);
      }catch(err){
        console.log(err);
      }
    }
    fetchData();
  },[notifications.length]);

  const handleRequests=()=>{
    window.location.href='/requests';
  }

  const home=()=>{
    window.location.href='/dashboard';
  }

  return (
    <div>
       <div className='flex justify-between p-8 shadow bg-white'>
      <div onClick={home} className='md:text-3xl font-mono text-xl cursor-pointer '>
       {props.firstName} {props.lastName}
      </div>
      <div className='md:hidden flex gap-4'>
        <img onClick={handleNotification} src={NotificationImg} alt='' className='w-8'/>
        <img onClick={handleMenu} src={menu} alt='' className='w-8'/>
      </div>
      {isNotiOpen && <>
      <Notification
      notifications={notifications}
      />
      </>}

      {isMenuOpen && <div className='md:hidden fixed overflow-y-auto p-5 top-0 bottom-0 right-0 w-2/3  bg-white text-gray-400 text-xl  bg-opacity-100 z-50'>
      <div  className='flex justify-end md:hidden'>
        <img onClick={handleMenu} src={closeMenu} className='w-10'/>
        </div>
      <div className='mt-10 flex flex-col gap-10 justify-center items-center text-black'>
        <div className='text-lg font-semibold cursor-pointer'>Track</div>
        <div className='text-lg font-semibold cursor-pointer'>Manage</div>
        <div className='text-lg font-semibold cursor-pointer'onClick={handleRequests} >Requests</div>
      </div>
        </div>}
      <div className='hidden md:flex md:gap-10 md:justify-center md:items-center'>
        <div><img onClick={handleNotification} src={NotificationImg} alt='' className='w-8'/></div>
        <div className='text-lg font-semibold cursor-pointer'>Track</div>
        <div className='text-lg font-semibold cursor-pointer'>Manage</div>
        <div className='text-lg font-semibold cursor-pointer' onClick={handleRequests}>Requests</div>
      </div>
    </div>
    </div>
  );
};

export default Header;