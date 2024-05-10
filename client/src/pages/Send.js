import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

export const Send = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);

    const [balance, setBalance] = useState(0);
    const [fi, setFirstName] = useState("");
    const [la, setLastName] = useState("");

    useEffect(() => {  
        const fetchData = async () => {              
            try {
                const response = await axios.get("https://ewalletfullstack-1.onrender.com/api/v1/user/userDetails",
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


    return (
        <div>
            <div>
        <Header firstName={fi} lastName={la}/>
            </div>
            <div className="flex justify-center h-screen bg-black">
            <div className="h-full flex flex-col justify-center">
                <div className="border text-card-foreground max-w-md p-3  md:w-96 bg-white shadow-lg rounded-lg w-80">
                    <div className="flex flex-col space-y-1 p-6">
                        <h2 className="text-3xl font-bold text-center">Send Money</h2>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                            </div>
                            <h3 className="text-2xl font-semibold">{name}</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="amount" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Amount (in Rs)
                                </label>
                                <input
                                    onChange={(e) => setAmount(e.target.value)}
                                    type="number"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    id="amount"
                                    placeholder="Enter amount"
                                />
                            </div>
                            <button
                                onClick={async () => {
                                    try {
                                        const response = await axios.post("http://localhost:8000/api/v1/account/transfer", {
                                            to: id,
                                            amount
                                        }, {
                                            withCredentials: true,
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                        });
                                        console.log(response);
                                        if (response.status === 200) {
                                            navigate("/dashboard");
                                        }
                                    } catch (error) {
                                        console.log("Error:", error);
                                    }
                                }}
                                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
                            >
                                Initiate Transfer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </div>
        
    );
};
