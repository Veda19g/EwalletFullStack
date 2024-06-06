
import { useEffect,useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Header from "./Header";

export const  AcceptRequests=()=>{
    const navigate=useNavigate();
    const [balance,setBalance]=useState(0);
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [Requests,setRequests]=useState([]);
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
          const fetchRequests=async()=>{
              try{
                  const response=await axios.get("http://localhost:8000/api/v1/account/getAllrequests",{
                      withCredentials:true,
                      headers:{
                          "Content-Type":"application/json",
                      },
                  });
                  console.log("response",response);
                  setRequests(response.data.requests);
              }
              catch(err){
                  console.log("error in ",err);
              }  
          }
          fetchRequests();
      },[])
    
    
    const handleGive =(request) => {
        try{
            const response=axios.post("http://localhost:8000/api/v1/account/approve",{
                to:request.user._id,
                amount:request.amount,
            },{
                withCredentials:true,
                headers:{
                    "Content-Type":"application/json",
                },
            });
            if(response.status===200){
                navigate("/dashboard");
            }
        } catch (err) {
          console.log("error in ", err);
        }   
    };
    



    return(
        
        <div className="bg-black h-screen">
             <div>
                <Header firstName={firstName} lastName={lastName} />
             </div>
             <div className="p-4 font-semibold  text-3xl text-white ">Your Balence is {balance}</div>
             <div className="flex flex-col md:p-8 p-4 text-white">
                <div className="bg-black rounded-lg p-2 shadow-md ">
                {Requests.map((request) => (
          <div className="flex flex-row justify-between m-8 items-center md:gap-0 gap-5 border border-white rounded-lg md:p-4 p-4 " key={request.user._id}>
          <div className="md:text-3xl  text-md text-left">
              {request.user.firstName} {request.user.lastName} asks for {request.amount}
          </div>
          <div className="flex md:gap-10 gap-5 items-center">
              <button className="md:py-4 md:px-3 p-3 rounded-lg bg-green-500 md:text-lg text-sm" onClick={()=>handleGive(request)}>Give</button>
          </div>
         
          </div>
          ))}
                </div>
             </div>
        </div>
    )
    
       }

       export default AcceptRequests;
       