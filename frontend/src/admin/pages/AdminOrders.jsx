import React, { useContext, useEffect, useState } from 'react';
import { OrderContext } from '../../context/OrderContext';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function AdminOrders() {
    const { all_orders, fetchAllOrders, updateOrderStatus } = useContext(OrderContext);
    const [statusUpdate, setStatusUpdate] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [filterStatus, setFilterStatus] = useState('ALL'); // Added state for status filter
    const recordsPerPage = 30;

    useEffect(() => {
        fetchAllOrders();
    }, []);

    const handleStatusChange = (orderId, newStatus) => {
        setStatusUpdate((prev) => ({ ...prev, [orderId]: newStatus }));
    };

    const handleSubmitStatus = (orderId) => {
        const newStatus = statusUpdate[orderId];
        if (newStatus) {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#4BAF47",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Update it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    updateOrderStatus(orderId, { status: newStatus });
                    Swal.fire({
                        title: "Updated!",
                        text: "Status Updated.",
                        icon: "success",
                        confirmButtonColor: "#4BAF47"
                    });
                }
            });
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'PENDING':
                return 'bg-yellow-300 text-yellow-900';
            case 'CONFIRMED':
                return 'bg-blue-400 text-blue-900';
            case 'SHIPPED':
                return 'bg-purple-400 text-purple-900';
            case 'DELIVERED':
                return 'bg-green-500 text-green-900';
            case 'CANCELLED':
                return 'bg-red-600 text-red-900';
            default:
                return 'bg-gray-300 text-gray-900';
        }
    };

    const filteredOrders = filterStatus === 'ALL'
        ? all_orders
        : all_orders.filter(order => order.status === filterStatus);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstRecord, indexOfLastRecord);

    const totalPages = Math.ceil(filteredOrders.length / recordsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="py-6">
            <h1 className="text-2xl font-bold mb-4">Users Orders</h1>

            {/* Filter Dropdown */}
            <div className="mb-4 flex justify-end">
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border border-gray-300 rounded px-4 py-2"
                >
                    <option value="ALL">All Statuses</option>
                    <option value="PENDING">Pending</option>
                    <option value="CONFIRMED">Confirmed</option>
                    <option value="SHIPPED">Shipped</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                </select>
            </div>

            <div className="min-h-[80vh] w-[92vw] md:w-full overflow-x-auto">
                <table className="ktable-auto w-full border-collapse border border-gray-300 text-left">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-4 py-2">Order ID</th>
                            <th className="border border-gray-300 px-4 py-2">User Email</th>
                            <th className="border border-gray-300 px-4 py-2">Number of Items</th>
                            <th className="border border-gray-300 px-4 py-2">Total Price</th>
                            <th className="border border-gray-300 px-4 py-2">Status</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentOrders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-100">
                                <td className="border border-gray-300 px-4 py-2">{order.id}</td>
                                <td className="border border-gray-300 px-4 py-2">{order.user.email}</td>
                                <td className="border border-gray-300 px-4 py-2">{order.items.length}</td>
                                <td className="border border-gray-300 px-4 py-2">${order.total_price}</td>
                                <td
                                    className={`border border-gray-300 px-4 py-2 ${getStatusClass(
                                        statusUpdate[order.id] || order.status
                                    )}`}
                                >
                                    <select
                                        value={statusUpdate[order.id] || order.status}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                        className="border-0 rounded px-2 py-1"
                                    >
                                        <option value="PENDING">PENDING</option>
                                        <option value="CONFIRMED">CONFIRMED</option>
                                        <option value="SHIPPED">SHIPPED</option>
                                        <option value="DELIVERED">DELIVERED</option>
                                        <option value="CANCELLED">CANCELLED</option>
                                    </select>
                                </td>
                                <td className="flex flex-col gap-3 md:flex-row justify-center border border-gray-300 px-4 py-2">
                                    <Link
                                        to={`/admin/order/${order.id}`}
                                        state={{ items: order.items, order }}
                                        className="border text-nowrap border-green-500 px-3 py-1.5 rounded hover:text-white hover:bg-green-600"
                                    >
                                        View Items
                                    </Link>
                                    <button
                                        onClick={() => handleSubmitStatus(order.id)}
                                        className="border-0 text-nowrap bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                    >
                                        Update Status
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
