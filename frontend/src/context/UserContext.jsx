import { createContext,useState, useEffect } from "react";
import configData from "../config.json";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-hot-toast';
import Swal from "sweetalert2";


export const UserContext = createContext();
const  SERVER_URL = configData.SERVER_URL;



export const UserProvider = ({ children }) => 
{
    const navigate = useNavigate();
    
    const [onDataChange, setOnDataChange]=useState(true);
    const [subscribers, setSubscribers]  = useState([]);

    const [authToken, setAuthToken] = useState(() => sessionStorage.getItem("authToken") ? sessionStorage.getItem("authToken") : null );
    const [loading, setLoading] = useState(true);

   
    // Subscribe
    const subscribe = (email) => {
      toast.loading("Subscribing...")
      
      fetch(`${SERVER_URL}/subscription/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email
        })
        })
        .then((res)=> res.json())
        .then((response)=>{
          console.log(response);
          
          if (response.success) {
              toast.dismiss();
              toast.success(response.success);
          }
        
          else if(response.error){
            toast.dismiss();
            toast.error(response.error)
          } 
          
          else {
            toast.dismiss();
            toast.error("Something went wrong!");
          }
        })
      }


    // Sending
    const partner = (name, email, description) => {
      toast.loading("Sending...")
      
      fetch(`${SERVER_URL}/partner/sendmail`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name, email, description
        })
        })
        .then((res)=> res.json())
        .then((response)=>{
          console.log(response);
          
          if (response.success) {
              toast.dismiss();
              toast.success(response.success);
          }
        
          else if(response.error){
            toast.dismiss();
            toast.error(response.error)
          } 
          
          else {
            toast.dismiss();
            toast.error("Something went wrong!");
          }
        })
      }



   // Delete Subscriber
   const deleteSubscriber = (id) => {
    fetch(`${SERVER_URL}/subscription/delete/${id}`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
    }
    })
    .then(response => response.json())
    .then((response) => {
        if(response.success) 
        {
          setOnDataChange(!onDataChange);
          toast.success(response.success)
        } 
        else if(response.error)
        {
          toast.error(response.error)
        }
        else
        {
          toast.error("Something went wrong!")
        }
    })
    
  };

// Send Mass Emails to users
const sendSubscriptionEmail = (selectedUsers,subject, message) => {
  toast.loading("Please wait as your message is being processed!")
  fetch(`${SERVER_URL}/subscription/sendmail`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ selectedUsers,subject, message } )
    })
    .then((res)=> res.json())
    .then((response)=>{
      if (response.success) {
          toast.dismiss();
          toast.success("Message sent successfully!!");
          setOnDataChange(!onDataChange);
      }

      else if(response.error){
        toast.dismiss();
        toast.error(response.error)
      } 

      else {
        toast.dismiss();
        toast.error("Something went wrong!");
      }
    })
  }


    // GET SUBSCRIBERS
    useEffect(()=>{
      if(authToken)
      {
        fetch(`${SERVER_URL}/subscription`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${authToken}`
          },
        })
        .then((response)=> response.json())
        .then((data)=>{
            setSubscribers(data)
        })
      }
      else{
        (()=> logout()());
      }

      setLoading(false);
    }, [onDataChange])

    
    // CONTEXT DATA
    const contextData = 
    {
        partner,
        subscribers,
        subscribe,
        deleteSubscriber,
        sendSubscriptionEmail
 
    };  
  

    return (
      <>
      <UserContext.Provider value={contextData}>
        {loading ? null : children}
      </UserContext.Provider>
      </>
    )

}