import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { FaFacebookSquare, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";

import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { FaXTwitter } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";

const Footer = () => 
{
  const [email, setEmail] = useState()
  const {subscribe} = useContext(UserContext)

  const handleSubmit = (e) => {
         e.preventDefault()

         subscribe(email)
         setEmail("")
  }

  return (
<footer style={{ bxackground: 'url(https://www.transparenttextures.com/patterns/diag-stripes.png) repeat', 
    backgroundSize: '100px 100px' }} className="py-6 bg-gray-900 text-white min-h-[60vh] md:h-[60vh] Ddark:text-gray-900">
  	<div className="font-poppins container mx-auto flex flex-col justify-around h-full">
      <div className="px-6  space-y-6 divide-y Ddark:divide-gray-600 md:space-y-12 divide-opacity-50">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="pb-6 col-span-full md:pb-0 md:col-span-6">
            <Link to="/" rel="noopener noreferrer" href="#" className="">
              <div className="flexitems-centerjustify-center rounded-full">
                 <img src={logo} className="h-20 sm:h-32 w-auto" />
              </div>
            </Link>
            <div className='flex items-center gap-10'>
              <a href=""><FaXTwitter size={24}/> </a>
              <a href=""><AiFillInstagram size={24}/> </a>
              <a href=""><FaFacebookSquare size={24}/> </a>
            </div>
          </div>
          <div className="col-span-6  md:text-left md:col-span-3">
            <div className="relative inline-block">
              <span className="font-bold text-xl">
                Quick Links
              </span>
              <div className="absolute left-0 top-full mt-1 w-[75%] border-b-[6px] rounded-full border-[#4BAF47]"></div>
              <div className="absolute top-full left-[75%] flex items-center justify-center w-[25%] text-[#4BAF47] h-[4px]">
                .
              </div>
            </div>

            <ul className="flex flex-col gap-6 mt-6">
              <li>
                <Link to="" className="hover:Ddark:text-[#4BAF47]">Shop</Link>
              </li>
              <li>
                <Link to="" className="hover:Ddark:text-[#4BAF47]">Services</Link>
              </li>
              <li>
                <Link to="" className="hover:Ddark:text-[#4BAF47]">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="col-span-6 md:text-left md:col-span-3 mt-4 md:mt-0">
            <div className="relative inline-block">
              <span className="font-bold text-xl">
                Contact
              </span>
              <div className="absolute left-0 top-full mt-1 w-[75%] border-b-[6px] rounded-full border-[#4BAF47]"></div>
              <div className="absolute top-full left-[75%] flex items-center justify-center w-[25%] text-[#4BAF47] h-[4px]">
                .
              </div>
            </div>
            <ul className="flex flex-col gap-6 mt-6">
              <li className="flex items-center gap-4">
                <FaPhoneAlt />
                <a rel="noopener noreferrer" href="#" className="hover:Ddark:text-violet-600">+254 793 622106</a>
              </li>
              <li className="flex items-center gap-4">
                <MdOutlineEmail />
                <a rel="noopener noreferrer" href="#" className="hover:Ddark:text-violet-600">hilmanhalalfoods@gmail.com</a>
              </li>
              <li className="flex items-center gap-4 ">
                <IoLocationOutline />
                <a rel="noopener noreferrer" href="#" className="hover:Ddark:text-violet-600"> 
                Kivi Suites, Kilimani, Nairobi Kenya
                  </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

     
      <div className="flex flex-col md:flex-row  md:items-center md:justify-center lg:justify-around ">
          <div className="flex justify-center my-3 pt-4 space-x-4 lg:pt-0">
              © All Copyright 2024 by 
             <a className="ml-2" href="https://developerske.org "> developerske.org</a>
          </div>
          <div className="flex justify-center my-3 md:justify-start items-center flex-row text-sm text-center  md:space-x-6">
            <a rel="noopener noreferrer" href="#">
              <span>About us</span>
            </a>
            <div className="border-l-2 border-gray-300 h-4 mx-4"></div>
            <a rel="noopener noreferrer" href="#">
              <span>Terms of use</span>
            </a>
          </div>

        </div>
</div>
</footer>
  );
};

export default Footer;
