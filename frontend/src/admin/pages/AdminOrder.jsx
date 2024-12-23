import React, { useContext, useEffect, useState } from 'react';
import { OrderContext } from '../../context/OrderContext';
import { Link } from 'react-router-dom';
import Order from "../../pages/Order"

export default function AdminOrder() {
    const { orders, fetchOrders, updateOrderStatus } = useContext(OrderContext); // Assuming updateOrderStatus is defined
    const [statusUpdate, setStatusUpdate] = useState({}); // To handle status updates for orders

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusChange = (orderId, newStatus) => {
        setStatusUpdate((prev) => ({ ...prev, [orderId]: newStatus }));
    };

    const handleSubmitStatus = (orderId) => {
        const newStatus = statusUpdate[orderId];
        if (newStatus) {
            updateOrderStatus(orderId, { status: newStatus }); // Assuming backend expects an object with status
        }
    };

    return (
        <Order />
    );
}
