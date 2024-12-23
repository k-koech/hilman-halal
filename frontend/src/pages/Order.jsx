import React, { useContext, useEffect, useState } from 'react';
import { OrderContext } from '../context/OrderContext';
import FormatDate from "../components/utils/FormatDate";
import { Link, useLocation } from 'react-router-dom';

import configData from "../config.json";
const SERVER_URL = configData.SERVER_URL;

export default function Order() {
    const { orders, fetchOrders } = useContext(OrderContext);
    const location = useLocation();

    const { items, order } = location.state || {};

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of items per page

    useEffect(() => {
        fetchOrders();
    }, []);

    // Calculate paginated items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items?.slice(indexOfFirstItem, indexOfLastItem) || [];

    // Handle pagination
    const totalPages = Math.ceil((items?.length || 0) / itemsPerPage);
    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <section className="py-14 bg-white">
            <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
                <div className="min-h-[60vh] main-data p-4 sm:px-14 bg-gray-50 rounded-3xl">
                    <h2 className="text-center font-manrope font-semibold text-2xl md:text-3xl text-black mb-16">
                        Order {order && order.id} - ({items && items.length}) Products
                    </h2>
                    {
                        items && items.length < 1 &&
                        <div className='h-[20vh] flex items-center justify-center font-poppins'>
                            <p className='px-5 py-1.5 rounded-full bg-gray-100'>No items in this order</p>
                        </div>
                    }

                    { currentItems.map((item) => (
                        <div
                            key={item.product.id}
                            className="box p-8 rounded-3xl bg-gray-100 grid grid-cols-8 mb-7 cursor-pointer transition-all duration-500 hover:bg-indigo-50 max-lg:max-w-xl max-lg:mx-auto"
                        >
                            <div className="flex items-center col-span-8 sm:col-span-4 lg:col-span-1 sm:row-span-4 lg:row-span-1">
                                    
                                <div className='relative bg-red-900'>
                                    <div className="absolute top-2 right-2 bg-[#4BAF47] text-white text-xs px-1 sm:px-2 py-1 rounded-full">
                                        {item.product.category.name}
                                    </div>
                                    
                                    <div className="w-full aspect-w-36 aspect-h-8 dh-[10vh]">
                                        <img
                                            src={SERVER_URL + item.product.image}
                                            alt={item.product.name}
                                            className="max-lg:w-auto max-sm:mx-auto rounded-xl object-cover"
                                        />
                                    </div>
                                </div>

                            </div>
                            <div
                                className="col-span-8 sm:col-span-4 lg:col-span-3 flex h-full justify-center pl-4 flex-col max-lg:items-center"
                            >
                                <h5 className="font-manrope font-semibold text-xl leading-9 text-black mb-1 whitespace-nowrap">
                                    {item.product.name}
                                </h5>
                                <p className="hidden md:block font-normal text-base leading-7 text-gray-600 max-md:text-center">
                                    {item.product.category.name}
                                </p>
                            </div>

                            <div className="col-span-8 sm:col-span-4 lg:col-span-1 flex flex-col items-center justify-center">
                                <p className=" text-xl leading-8 text-black">
                                    ${item.product.price}
                                </p>
                              <div className="col-span-8sm:col-span-4lg:col-span-1 p-3 flex gap-5 items-center ">
                                <p>Quantity</p>
                                <p className="font-semibold text-xl leading-8 text-[#4BAF47] text-center">
                                    {item.quantity}
                                </p>
                              </div>
                            </div>

                            <div className="col-span-8 sm:col-span-4 lg:col-span-2 flex items-center justify-center ">
                                <p className="font-semibold text-xl leading-8 text-black">23rd March 2021</p>
                            </div>
                        </div>
                    ))}

                </div>
                    {/* Pagination Controls */}

                    { items && items.length > 5 &&
                    <div className="p-8 sm:p-14 flex justify-between mt-8">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-400 text-white font-semibold disabled:bg-gray-200 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <p className="text-lg font-semibold">
                            Page {currentPage} of {totalPages}
                        </p>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-400 text-white font-semibold disabled:bg-gray-200 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                }
                


            </div>
        </section>
    );
}
