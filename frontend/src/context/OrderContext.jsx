import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import configData from "../config.json";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "./ProductContext";
const  SERVER_URL = configData.SERVER_URL;


export const OrderContext = createContext();

const OrderProvider = ({ children }) => 
{
  const navigate = useNavigate()

  const {cart, setCart} = useContext(ProductContext)

  console.log("cart cccc ", cart);
  


  const {authToken} = useContext(AuthContext)
  const [orders, setOrders] = useState([]);
  const [all_orders, setAllOrders] = useState([]);

  const [onDataChange, setOnDataChange] = useState(false);

  // Fetch user orders
  const fetchOrders = () => {
    fetch(`${SERVER_URL}/orders/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => toast.error("Failed to load orders!"));
  };

    // Fetch all orders
    const fetchAllOrders = () => {
      fetch(`${SERVER_URL}/orders/all/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setAllOrders(data);
        })
        .catch((error) => toast.error("Failed to load orders!"));
    };


  // place order
  const placeOrder = (cart) => {
    fetch(`${SERVER_URL}/orders/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify(cart),
      })
      .then((res) => res.json())
      .then((response) => {

        if(response.success) 
        {
          toast.success("Order placed");
          setCart({
            items: [],
            totalCost: 0, // Initialize the total cost to 0
            address_id:0
        })

          navigate("/orders")
        } 
        else 
        {
          toast.error(response.error || "Failed to place order!");
        }
        
      });
  };

  // Cancel order
    // place order
    const cancelOrder = (id) => {
      fetch(`${SERVER_URL}/orders/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        },
        // body: JSON.stringify(cart),
        })
        .then((res) => res.json())
        .then((response) => {
  
          if(response.success) 
          {
            toast.success("Order cancelled");
             fetchOrders()
  
          } 
          else 
          {
            toast.error(response.error );
          }
          
        });
    };

  // Update order status buy admin
  const updateOrderStatus = async (orderId, data) => {
      fetch(`${SERVER_URL}/order/${orderId}/status/`, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`
            },
            body: JSON.stringify(data),
        })
      .then((res)=> res.json())
      .then((response)=>{

        if (response.success) {
            fetchOrders(); // Reload orders after updating
            toast.success("Product updated successfully!");
        } 
       else if(response.error) {
              toast.error(response.error);
            }
        else{
          toast.error("Failed to update status!");

        }

    }) 
};

//=================================== ADDRESS  ======================================
const [addresses, setAddresses] = useState([]);
const [loading, setLoading] = useState(false);
const [addressChange, setAddressChange] = useState(false);

//  getAddresses =
   useEffect(()=>{
    setLoading(true);

    fetch(`${SERVER_URL}/addresses/`,{
      method: 'GET', 
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        }})
        .then((response) => response.json())
        .then((data) => setAddresses(data))
        .finally(() => setLoading(false));
    }, [addressChange])
    

const createAddress = (address) => {
    fetch(`${SERVER_URL}/addresses/create/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(address),
    })
        .then((response) => response.json())
        .then((response) => {
          console.log("Response ",response);
          
           if(response.success){
               setAddressChange(!addressChange)
               toast.success(response.success)
           }
           else if(response.error) {
            toast.error(response.error);
            }
            else{
              toast.error("Failed to add address!");

            }
        })
};

const updateAddress = (id, updatedAddress) => {
    fetch(`${SERVER_URL}/addresses/${id}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(updatedAddress),
    })
      .then((response) => response.json())
      .then((response) => {
         if(response.success){
             setAddressChange(!addressChange)
            toast.success(response.success)
         }
         else if(response.error) {
          toast.error(response.error);
          }
        else{
            toast.error("Failed to add address!");

          }
      })
};

const deleteAddress = (id) => {
    fetch(`${SERVER_URL}/addresses/${id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
      },
       })
       .then((response)=> response.json())
        .then((response) =>{
    
          if(response.success){
            setAddressChange(!addressChange)
            toast.success(response.success)
          }
          else if(response.error) {
            toast.error(response.error);
            }
          else{
            toast.error("Failed to delete address!");

          }
       })
};

  const contextData ={
    orders,
       placeOrder,
       cancelOrder,
       fetchOrders,

       all_orders,
       fetchAllOrders,
       updateOrderStatus,

      //  Address, 
      addresses, loading, createAddress, updateAddress, deleteAddress
  }

  return (
    <OrderContext.Provider
      value={contextData}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
