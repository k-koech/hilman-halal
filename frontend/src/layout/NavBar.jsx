import React, { useContext, useRef, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import { MdOutlineEmail } from 'react-icons/md';
import { FaFacebookSquare } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { IoLocationOutline } from 'react-icons/io5';
import { AiFillInstagram } from 'react-icons/ai';
import { AuthContext } from '../context/AuthContext';
import { ProductContext } from '../context/ProductContext';

const Navbar = () => {
  const {current_user} = useContext(AuthContext)
  const {cart} = useContext(ProductContext)

  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };


    // Close on click of outside
    const navbarRef = useRef(null);
    // Close navbar when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (navbarRef.current && !navbarRef.current.contains(event.target)) {
          closeNavbar();
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);


  return (
    <nav  id="home" ref={navbarRef} className=" mx-auto  border-green-200 ">
      <div className='bg-[#4BAF47] text-white p-3 mx-auto'>
          <div className="flex flex-col sm:flex-row justify-between mx-auto sm:w-[85vw] xl:w-[85vw] 2xl:w-[73vw] gap-4 sm:gap-0">
            <div className='hidden md:flex flex-col sm:flex-row justify-between sm:justify-between  sm:items-center gap-3 sm:gap-10'>
              <div className='flex items-center justify-between gap-2'>
                <IoLocationOutline />
                <p>Kivi Suites, Kilimani, Nairobi Kenya</p>
              </div>
              <div className='flex items-center sm:justify-between gap-2'>
                <MdOutlineEmail />
                <p>info@hilmanhalalfoods.co.ke</p>
              </div>
            </div> 
            <div className='flex items-center gap-10 '>
              <FaXTwitter />
              <AiFillInstagram />
              <FaFacebookSquare />
            </div>
          </div>   
      </div>
      <div className="sm:w-[85vw] xl:w-[85vw] 2xl:w-[73vw] flex flex-wrap items-center justify-between mx-auto p-2 sm:p-0">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-12 sm:h-32" alt="Halal Logo" />
        </a>
        <div className="flex items-center">
          <Link to="/cart" onClick={closeNavbar} className={`md:hidden block py-2 px-3 sm:text-lg rounded md:hover:bg-transparent md:border-0 md:hover:text-[#4BAF47] md:p-0 Ddark:hover:text-green-500 md:Ddark:hover:bg-transparent ${location.pathname === '/contact' ? 'text-green-600' : 'text-green-900'}`}>
                  <div className="relative py-2">
                    <div className="-mt-4 absolute left-3">
                      <p className="flex h-2 w-2 items-center justify-center rounded-full bg-[#4BAF47] p-3 text-xs text-white">{cart && cart.items.length}</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="file: mtk-4 h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                  </div>
                </Link>
          <button onClick={toggleNavbar} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-[#4BAF47] rounded-lg md:hidden hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-200 Ddark:text-green-400 Ddark:hover:bg-green-700 Ddark:focus:ring-green-600" aria-controls="navbar-default" aria-expanded={isOpen ? "true" : "false"}>
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
        </div>

        <div className={`${isOpen ? "absolute z-20" : "hidden"} top-24 right-0 left-0 mx-8 xw-full md:block md:w-auto`} id="navbar-default">
          <ul className="font-medium flex flex-col sm:items-center p-4 md:p-0 mt-4 border border-green-100 rounded-lg bg-white z-10 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white Ddark:border-green-700">
            <li>
              <Link to="/" onClick={closeNavbar} className={`block py-2 px-3 sm:text-lg rounded hover:bg-green-100 md:hover:bg-transparent md:border-0 md:hover:text-[#4BAF47] md:p-0 Ddark:hover:text-green-500 Ddark:hover:bg-green-700 md:Ddark:hover:bg-transparent ${location.pathname === '/' ? 'text-green-600' : 'text-green-900'}`} aria-current="page">
              Home</Link>
            </li>
            <li>
              <Link to="/about" onClick={closeNavbar} className={`block py-2 px-3 sm:text-lg rounded hover:bg-green-100 md:hover:bg-transparent md:border-0 md:hover:text-[#4BAF47] md:p-0 Ddark:hover:text-green-500 Ddark:hover:bg-green-700 md:Ddark:hover:bg-transparent ${location.pathname === '/about' ? 'text-green-600' : 'text-green-900'}`}>
                About</Link>
            </li>

            <li>
              <Link to="/shop" onClick={closeNavbar} className={`block py-2 px-3 sm:text-lg rounded hover:bg-green-100 md:hover:bg-transparent md:border-0 md:hover:text-[#4BAF47] md:p-0 Ddark:hover:text-green-500 Ddark:hover:bg-green-700 md:Ddark:hover:bg-transparent ${location.pathname === '/blog' ? 'text-green-600' : 'text-green-900'}`}>
                Shop</Link>
            </li>
            <li>
              <Link to="/contact" onClick={closeNavbar} className={`block py-2 px-3 sm:text-lg rounded hover:bg-green-100 md:hover:bg-transparent md:border-0 md:hover:text-[#4BAF47] md:p-0 Ddark:hover:text-green-500 Ddark:hover:bg-green-700 md:Ddark:hover:bg-transparent ${location.pathname === '/contact' ? 'text-green-600' : 'text-green-900'}`}>
                Contact Us</Link>
            </li>
            { current_user && current_user.email ?
             <UserProfileDropdown current_user={current_user} />
            :
            <li>
            <Link to="/login" onClick={closeNavbar} className={`block py-2 px-3 sm:text-lg rounded hover:bg-green-100 md:hover:bg-transparent md:border-0 md:hover:text-[#4BAF47] md:p-0 Ddark:hover:text-green-500 Ddark:hover:bg-green-700 md:Ddark:hover:bg-transparent ${location.pathname === '/events' ? 'text-green-600' : 'text-green-900'}`}>
              Login</Link>
          </li>
            }


            <li className='hidden md:block'>
              <Link id="navbar-cart-icon"  to="/cart" onClick={closeNavbar} className={`block py-2 px-3 sm:text-lg rounded hover:bg-green-100 md:hover:bg-transparent md:border-0 md:hover:text-[#4BAF47] md:p-0 Ddark:hover:text-green-500 Ddark:hover:bg-green-700 md:Ddark:hover:bg-transparent ${location.pathname === '/contact' ? 'text-green-600' : 'text-green-900'}`}>
                  <div className="relative py-2">
                    <div className="-mt-4 absolute left-3">
                      <p className="flex h-2 w-2 items-center justify-center rounded-full bg-[#4BAF47] p-3 text-xs text-white">
                        {cart && cart.items.length}</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="file: mtk-4 h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                  </div>
                </Link>
            </li>


          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;





const UserProfileDropdown = ({ current_user, closeNavbar }) => {
 
  const {logout} = useContext(AuthContext)
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Ref for the dropdown container to detect clicks outside of it
  const dropdownRef = useRef(null);

  // Function to toggle the dropdown
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdown when a link inside is clicked
  const handleLinkClick = () => {
    setDropdownOpen(false);
    closeNavbar(); // Close the navbar when a link is clicked
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Link
        to="/profile"
        onClick={(e) => {
          e.preventDefault(); // Prevent the default link behavior
          toggleDropdown(); // Toggle dropdown visibility on profile icon click
        }}
        className="flex items-center gap-2 py-2 px-3 sm:text-lg rounded hover:bg-green-100 md:hover:bg-transparent md:border-0 md:hover:text-[#4BAF47] md:p-0 Ddark:hover:text-green-500 Ddark:hover:bg-green-700 md:Ddark:hover:bg-transparent"
      >
        <span className="flex justify-center items-center w-8 h-8 text-white bg-[#4BAF47] rounded-full uppercase">
          {current_user && current_user.email[0]}
        </span>
        <span className='block md:hidden'>Profile</span>
      </Link>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-10">
          <ul className="text-black">
          <li>
              <Link
                to="/orders"
                onClick={handleLinkClick}
                className="block py-2 px-4 hover:bg-gray-100"
              >
                Orders
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                onClick={handleLinkClick}
                className="block py-2 px-4 hover:bg-gray-100"
              >
                Profile
              </Link>
            </li>
            <li>
              <span
                onClick={()=>logout()}
                className="block py-2 px-4 hover:bg-gray-100"
              >
                Logout
              </span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};