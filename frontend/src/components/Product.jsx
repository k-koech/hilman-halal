import React, { useContext } from 'react';
import { IoCartOutline } from "react-icons/io5";

import configData from "../config.json";
import { ProductContext } from '../context/ProductContext';
import { convertUSDToKSH } from './utils/convertUSDToKSH';
const SERVER_URL = configData.SERVER_URL;

export default function Product({ product }) {
  const { cart, addToCart } = useContext(ProductContext); // Use cart context

  // Check if the product is already in the cart
  const isInCart = cart && cart.items.some((cartItem) => cartItem.id === product.id);

  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart(product);
    }

  };

  return (
    <div className="shadow-xl overflow-hidden h-min" SSclassName="bg-white rounded overflow-hidden shadow-md cursor-pointer hover:scale-[1.02] transition-all  h-min">
      {/* Category label on top-right of the image */}
      {product.category && (
        <div className="absolute top-2 right-2 bg-[#4BAF47] text-white text-xs px-1 sm:px-2 py-1 rounded-full">
          {product.category.name}
        </div>
      )}
        <img
          src={SERVER_URL + product.image}
          alt={product.name}
          className="h-auto w-full object-cover object-top"
        />

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 capitalize">{product.name}</h3>
        <div className="mt-4 flex items-center flex-wrap gap-2">
          <h4 className="flex flex-col font-bold text-sm text-[#4BAF47]">
            <span>${product.price} /</span> <span>Ksh. { convertUSDToKSH(product.price)}</span> 
          </h4>

          <div
            className={`${
              isInCart ? "bg-gray-100 border border-gray-200 cursor-not-allowed" : "bg-gray-100"
            } w-10 h-10 flex items-center justify-center rounded-full ml-auto`}
            onClick={handleAddToCart}
          >
            {isInCart ? (
              <div className="relative text-xs font-bold text-[#4BAF47]"> 
                  <p className='relative text-xl'>✔</p>
                  <p className='absolute -top-1 -right-2'><IoCartOutline size={14}/></p>
              </div>
            ) : (
              <IoCartOutline size={24} color="#4BAF47" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}



