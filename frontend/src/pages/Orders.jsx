import React, { useContext, useEffect, useState, useRef } from 'react';
import { OrderContext } from '../context/OrderContext';
import FormatDate from "../components/utils/FormatDate";
import { Link } from 'react-router-dom';
import { convertUSDToKSH } from '../components/utils/convertUSDToKSH';

export default function Orders() {
    const { orders, fetchOrders, cancelOrder } = useContext(OrderContext);

    useEffect(() => {
        fetchOrders();
    }, []);

    // Dropdown and filtering
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [selectedStatus, setSelectedStatus] = useState("All");

    const toggleDropdown = () => {
        setIsDropdownOpen((prevState) => !prevState);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    const handleOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            closeDropdown();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 15;
    const filteredOrders = selectedStatus === "All"
        ? orders
        : orders.filter((order) => order.status.toUpperCase() === selectedStatus.toUpperCase());

    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
    const paginatedOrders = filteredOrders.slice(
        (currentPage - 1) * ordersPerPage,
        currentPage * ordersPerPage
    );

    return (
        <section className="py-10 md:py-24 relative">
            <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
                <h2 className="font-manrope font-extrabold text-2xl md:text-3xl lead-10 text-black mb-9">Order History</h2>
                <div className="flex flex-row items-center justify-between gap-4">
                    <span className="font-bold text-lg md:text-xl text-[#4BAF47]">
                        Orders ({filteredOrders.length})
                    </span>
                    <div className="relative">
                        <button
                            className="border rounded-2xl px-4 py-2 font-medium text-black hover:text-[#4BAF47]"
                            onClick={toggleDropdown}
                        >
                            Filter By: {selectedStatus}
                        </button>
                        {isDropdownOpen && (
                            <ul
                                ref={dropdownRef}
                                className="absolute top-full right-0 mt-2 bg-white border border-gray-300 shadow-md rounded w-48"
                            >
                                {["All", "Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"].map((status) => (
                                    <li
                                        key={status}
                                        className={`px-4 py-2 hover:bg-gray-100 ${
                                            selectedStatus === status ? "font-bold text-[#4BAF47]" : ""
                                        }`}
                                        onClick={() => {
                                            setSelectedStatus(status);
                                            closeDropdown();
                                            setCurrentPage(1);
                                        }}
                                    >
                                        {status}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {paginatedOrders.map((order) => (
                    <div className="shadow-md mt-8 border border-gray-300 rounded-lg p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div>
                                <div className='flex justify-between border-b pb-1'>
                                     <h6 className="font-semibold text-xl">Order: #{order.id}</h6>
                                     <p>
                                        <span className="font-medium">Status:</span>{" "}
                                        <span className={`font-bold ${
                                            order.status === "PENDING"
                                                ? "text-blue-500"
                                                : order.status === "DELIVERED"
                                                ? "text-green-500"
                                                : order.status === "CANCELLED"
                                                ? "text-red-500"
                                                : "text-gray-600"
                                        }`}>
                                            {order.status}
                                        </span>
                                    </p>
                                </div>

                                <p>Order Placed on : <FormatDate date={order.created_at} /></p>
                                <p>{order.items.length} Products</p>
                                <p>Delivery Address : 
                                {order.address ? (
                                    <span>{order.address.address_line1}, {order.address.city}, {order.address.state}</span> 
                                ): (
                                    <span>No address provided</span>
                                )}
                                </p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <p>
                                    <span className="font-medium">Delivery Expected by:</span> 23rd March 2021
                                </p>

                                <p>
                                    <span className="font-medium">Total Price:</span> ${order.total_price} / Ksh. {convertUSDToKSH(order.total_price)}
                                </p>
                                <div className="flex gap-3 mt-4">
                                    <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded">
                                        Show Invoice
                                    </button>
                                    <Link
                                        to={`/order/${order.id}`} state={{ items: order.items, order: order}}
                                        className="bg-[#4BAF47] text-white px-4 py-2 rounded hover:bg-[#59cf55]"
                                    >
                                        View Items
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Pagination Controls */}
                {paginatedOrders && paginatedOrders.length > 7 &&
                <div className="flex justify-center mt-8 space-x-4">
                    <button
                        className={`px-4 py-2 rounded ${
                            currentPage === 1 ? "bg-gray-200" : "bg-[#4BAF47] text-white hover:bg-[#59cf55]"
                        }`}
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    >
                        Previous
                    </button>
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        className={`px-4 py-2 rounded ${
                            currentPage === totalPages ? "bg-gray-200" : "bg-[#4BAF47] text-white hover:bg-[#59cf55]"
                        }`}
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    >
                        Next
                    </button>
                </div>
                }
            </div>
        </section>
    );
}
