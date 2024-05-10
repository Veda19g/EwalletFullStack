import React from 'react';
import Navbar from "./Navbar";
import rightArrow from "../assets/right-arrow.png";

const Home = () => {

    const handleTry=()=>{
        window.location.href='/signin';
    }

  return (
    <div>
      <Navbar/>
      <div className='bg-black h-screen flex-col text-white'>
        <div className='flex flex-col'>
         <div className='flex justify-center text-6xl mt-32'>EWallet</div>
         <div className='flex justify-center md:text-3xl mt-10 text-center text-2xl'>One Stop Solution for managing your expenses</div>
         <div className='flex md:flex-row justify-center mt-14 gap-5 text-2xl flex-col p-4 md:p-0'>
            <div className='p-4 bg-slate-400 rounded-lg'>Request For Money</div>
            <div className='p-4 bg-slate-400 rounded-lg'>Track your Expense</div>
            <div className='p-4 bg-slate-400 rounded-lg'>Send Money</div>
         </div>
         <div className='flex justify-center text-3xl md:mt-10 mt-5'>experience the Tech!</div>
         <div className='flex justify-center mt-12 md:gap-10 gap-5'>
            <img src={rightArrow} alt='' className='md:w-20 w-10'/>
            <button className='md:py-3 md:px-8 py-3 px-4 rounded-lg bg-green-500 text-slate-50   text-3xl' onClick={handleTry}>Try out yourself</button>
         </div>
         </div>
      </div>
    </div>
  );
};

export default Home;