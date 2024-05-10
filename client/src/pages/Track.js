import React from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const Track = () => {
    const [balance,setBalance]=useState(0);
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    useEffect(() => {  
        const fetchData = async () => {              
            try {
                const response = await axios.get("http://localhost:8000/api/v1/user/userDetails",
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                console.log("response", response);
                const { balance, firstName,lastName } = response.data; // Destructure balance and user from response
                setBalance(balance); // Set balance state
                setFirstName(firstName); 
                setLastName(lastName); // Set user state
            } catch (err) {
                console.log("error in ", err);
            }
        };
        fetchData(); // Call fetchData function
    }, []);

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


  return (
    <div>
        <div className="bg-slate-600 h-screen">
             <div>
                <Header firstName={firstName} lastName={lastName} />
             </div>
            <div className="flex justify-center items-center h-full">
                <div className="bg-white p-8 rounded-2xl shadow-2xl">
                    <h1 className="text-2xl font-semibold text-slate-400">Track</h1>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <div className="text-lg font-semibold text-slate-400">Track your transactions here</div>
                        </div>
                        <div>
                        {notifications.length>0 && <div className="bg-white p-8 rounded-2xl shadow-2xl ml-8">
                    <div className="flex flex-col gap-4">
                        {notifications.map((notification, index) => (
                        <div key={index} className="flex flex-col gap-1">
                            <div className="text-lg font-semibold text-slate-400">{notification}</div>
                        </div>
                        ))}
                    </div>
                </div>}
                        </div>
                    </div>
                </div>
               

    </div>
    </div>
    </div>
  );
};

export default Track;