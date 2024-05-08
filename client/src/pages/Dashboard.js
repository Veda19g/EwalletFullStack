import { useEffect,useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Header from "./Header";

export const  Dashboard=()=>{
    const navigate=useNavigate();
    const [balance,setBalance]=useState(0);
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [users,setUsers]=useState([]);
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


      useEffect(()=>{
          const fetchUsers=async()=>{
              try{
                  const response=await axios.get("http://localhost:8000/api/v1/user/bulk",{
                      withCredentials:true,
                      headers:{
                          "Content-Type":"application/json",
                      },
                  });
                  console.log("response",response);
                  setUsers(response.data.users);
              }
              catch(err){
                  console.log("error in ",err);
              }  
          }
          fetchUsers();
      },[])
    
    
    const handleSend =(user) => {
        try{
         navigate("/send?id=" + user._id + "&name=" + user.firstName);
        } catch (err) {
          console.log("error in ", err);
        }   
    };
    
    const handleRequest =(user) => {
        try{
         navigate("/request?id=" + user._id + "&name=" + user.firstName);
        } catch (err) {
          console.log("error in ", err);
        }   
    };

    return(
        
        <div className="bg-slate-600 h-screen">
             <div>
                <Header firstName={firstName} lastName={lastName} />
             </div>
             <div></div>
             <div className="flex flex-col p-8">
                <div className="bg-slate-400 rounded-lg p-2 shadow-md ">
                {users.map((user) => (
          <div className="flex flex-row justify-between m-8 items-center md:gap-0 gap-5 md:border md:border-slate-800 md:rounded-lg md:p-4 " key={user._id}>
          <div className="md:text-xl font-semibold font-mono textmd text-left">
              {user.firstName} {user.lastName}
          </div>
          <div className="flex md:gap-10 gap-5 items-center">
              <button className="md:py-4 md:px-3 p-3 rounded-lg bg-red-500 md:text-lg text-sm" onClick={()=>handleRequest(user)}>Request</button>
              <button className="md:py-4 md:px-3 p-3 rounded-lg bg-green-500 md:text-lg text-sm" onClick={() => handleSend(user)}>Send</button>
          </div>
         
          </div>
          ))}
                </div>
             </div>
        </div>
    )
    
       }
    