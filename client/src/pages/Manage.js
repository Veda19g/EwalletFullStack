import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Netflix  from "./../assets/netflix-logo.png";
import Amazon  from "./../assets/amazon-logo.png";

const Manage = () => {
    const [balance, setBalance] = useState(0);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/v1/user/userDetails", {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
            });
            console.log("response", response);
            const { balance, firstName, lastName } = response.data; // Destructure balance and user from response
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
            <Header firstName={firstName} lastName={lastName} />
            </div>
            <div className="bg-black h-screen flex">
            </div>
        </div>
    );
    }

export default Manage;