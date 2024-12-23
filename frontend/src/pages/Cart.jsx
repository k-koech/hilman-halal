import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import configData from "../config.json";
import { OrderContext } from "../context/OrderContext";
import { Link } from "react-router-dom";
import Address from "../components/Address";
import { convertUSDToKSH } from "../components/utils/convertUSDToKSH";
const SERVER_URL = configData.SERVER_URL;


export default function Cart() {
  const { cart,setCart, updateCartQuantity, removeFromCart } = useContext(ProductContext);
  const {placeOrder, addresses} = useContext(OrderContext)
  const [selectedAddress, setSelectedAddress] = useState("");

  
  const handleDecrement = (productId) => {
    updateCartQuantity(productId, -1); // Decrease the quantity
  };

  const handleIncrement = (productId) => {
    updateCartQuantity(productId, 1); // Increase the quantity
  };

  const handleRemove = (productId) => {
    removeFromCart(productId); // Remove the product from the cart
  };

  
  const handlePlaceOrder = () => {
     placeOrder(cart)
  }


  const handleAddressChange = (e) => {
    const selectedAddress = e.target.value;
    
    setSelectedAddress(e.target.value)
    setCart((prevCart) => ({
      ...prevCart,
      address_id: selectedAddress, // Update the address_id in the cart
    }));
  };


  
  

  return (
    <section className="bg-white py-8 antialiased Ddark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 Ddark:text-white sm:text-2xl">Shopping Cart</h2>


        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          {/* Product List */}
  
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">

            {
              cart && cart.items.length == 0 &&
              <div className=" flex flex-col space-y-8 min-h-[40vh] items-center justify-center font-poppins">
                <p className="text-2xl">No items in your cart</p>
                <Link to="/shop" className="text-xl hover:font-bold border rounded-full px-3 py-1.5 hover:bg-gray-100">Start shopping</Link>
              </div>
            }


              {cart && cart.items.map((product) => (
                <div
                  key={product.id}
                  className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm Ddark:border-gray-700 Ddark:bg-gray-800 md:p-6"
                >
                  <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                    <a href="#" className="shrink-0 md:order-1">
                      <img
                        className="w-28 h-auto Ddark:hidden"
                        src={SERVER_URL + product.image}
                        alt={product.name}
                      />
                      <img
                        className="hidden w-28 h-auto Ddark:block"
                        src={product.image}
                        alt={product.name}
                      />
                    </a>

                    <label htmlFor="counter-input" className="sr-only">
                      Choose quantity:
                    </label>
                    <div className="flex items-center justify-between md:order-3 md:justify-end">
                      <div className="flex items-center">
                        {/* Decrement Button */}
                        <button
                          type="button"
                          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 Ddark:border-gray-600 Ddark:bg-gray-700 Ddark:hover:bg-gray-600 Ddark:focus:ring-gray-700"
                          onClick={() => handleDecrement(product.id)}
                        >
                          <svg
                            className="h-2.5 w-2.5 text-gray-900 Ddark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <input
                          type="text"
                          className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 Ddark:text-white"
                          value={product.quantity}
                          readOnly
                        />
                        {/* Increment Button */}
                        <button
                          type="button"
                          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 Ddark:border-gray-600 Ddark:bg-gray-700 Ddark:hover:bg-gray-600 Ddark:focus:ring-gray-700"
                          onClick={() => handleIncrement(product.id)}
                        >
                          <svg
                            className="h-2.5 w-2.5 text-gray-900 Ddark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                      {/* Price */}
                      <div className="text-end md:order-4 md:w-32">
                        <p className="text-base font-bold text-gray-900 Ddark:text-white">
                          ${product.price * product.quantity} / Ksh. {convertUSDToKSH(product.price * product.quantity)}
                        </p>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                      <a
                        href="#"
                        className="text-base font-medium text-gray-900 hover:underline Ddark:text-white"
                      >
                        {product.name}
                      </a>

                      <div className="flex items-center gap-4">
                        {/* <button
                          type="button"
                          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline Ddark:text-gray-400 Ddark:hover:text-white"
                        >
                          Add to Favorites
                        </button> */}

                        {/* Remove Button */}
                        <button
                          type="button"
                          className="inline-flex items-center text-sm font-medium text-red-600 hover:underline Ddark:text-red-500"
                          onClick={() => handleRemove(product.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm Ddark:border-gray-700 Ddark:bg-gray-800 sm:p-6">
                  <h3 className="text-xl font-semibold">Select Address</h3>
                  {addresses && addresses.length === 0 ? (
                      <p className="text-gray-500">No addresses available. Add one below.</p>
                  ) : (
                      <select
                          value={selectedAddress}
                          // value={cart.address_id || ""}

                          onChange={handleAddressChange}
                          className="w-full border p-2 rounded"
                      >
                          <option value="" disabled>
                              Select an address
                          </option>
                          { addresses && addresses.map((address) => (
                              <option key={address.id} value={address.id}>
                                  {address.address_line1}, {address.city}, {address.state}
                              </option>
                          ))}
                      </select>
                  )}

                  <Address />

                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 Ddark:border-gray-700">
                      <dt className="text-base font-bold text-gray-900 Ddark:text-white">
                          Total
                      </dt>
                      <dd className="flex flex-col text-base font-bold text-gray-900 Ddark:text-white">
                         <span>${cart.totalCost || 0} /</span>   <span>Ksh.{convertUSDToKSH(cart.totalCost)}</span> 
                      </dd>
                  </dl>

                  <button
                      onClick={handlePlaceOrder}
                      disabled={
                          cart.items.length === 0 ||
                          addresses.length === 0 ||
                          !selectedAddress
                      }
                      className={`w-full px-5 py-2.5 text-sm font-medium text-white rounded-lg ${
                          cart.items.length > 0 &&
                          addresses.length > 0 &&
                          selectedAddress
                              ? "bg-[#4BAF47] hover:bg-green-600"
                              : "bg-gray-400 cursor-not-allowed"
                      }`}
                  >
                      Place your order
                  </button>
              </div>
            </div>



        </div>
      </div>
    </section>
  );
}
