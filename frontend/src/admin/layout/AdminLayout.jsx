import { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { AiOutlineClose, AiOutlineLogout, AiOutlineMenu, AiOutlineUser } from "react-icons/ai";
import { Toaster } from 'react-hot-toast';
import logo from '../../assets/logo.png';
import defaultUser from "../../images/defaultUser.png"
import { FaBlog, FaJediOrder, FaUsers } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { FaCalendarDays } from "react-icons/fa6";
import { LuUser } from "react-icons/lu";
import { AuthContext } from "../../context/AuthContext";

export default function AdminLayout() {
  const {current_user, logout} = useContext(AuthContext)

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Dashboard");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSetActiveLink = (link) => {
    setActiveLink(link);
  };

  //  User icon dropdown
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  
  return (
    <div className="xflex bg-[#4BAF47]">
      {/* Navbar */}
      <nav className="pt-4 pb-4 px-2 bg-gray-100">
        <div className="container mx-auto sm:mx-auto flex flex-wrap items-center justify-between p-2 ">
          <Link to="/admin" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-10 md:h-20" alt="Halal Logo" />
          </Link>

          { current_user && current_user ?
          <div className="flex items-center">
            <div className="flex flex-col gap-1 items-center mx-2 hover:cursor-pointer">
               <div  onClick={toggleDropdown} >
                <div className="p-1 bg-white rounded-full focus:outline-none focus:ring">
                    {/* <img className="w-8 h-8 rounded-full" src="https://laravelui.spruko.com/tailwind/ynex/build/assets/images/faces/9.jpg" alt=""/> */}
                    <AiOutlineUser size={28} />
                    {/* <div className="top-0 left-7 absolute w-3 h-3 bg-lime-400 border-2 border-white rounded-full animate-ping"></div>
                    <div className="top-0 left-7 absolute w-3 h-3 bg-lime-500 border-2 border-white rounded-full"></div> */}
                </div>                  
                <p className="hidden sm:block">
                Kip  {/* {current_user && (current_user.username).length > 5 ? (current_user && current_user.username).slice(0, 4) + "..." : current_user && current_user.username}  */}
                </p>
                </div>
                {isOpen && (
                <div
                  className="origin-top-right absolute right-3 mt-12 sm:mt-16 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <div className="py-1" role="none">
                   
                    <Link
                      to="/admin/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                      tabIndex="-1"
                      id="options-menu-item-1"
                      onClick={toggleDropdown}
                    >
                      Profile
                    </Link>
                    <p
                      className="block px-4 py-2 text-sm text-gray-700 hover:cursor-pointer hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                      tabIndex="-1"
                      id="options-menu-item-2"
                      onClick={()=> {toggleDropdown(),logout()} }
                    >
                      Logout
                    </p>
                  </div>
                </div>
              )}



            </div>
            <div>
              <AiOutlineMenu className="md:hidden" onClick={()=>toggleSidebar()}/>
              </div>
          </div>
          :
          <Link to="/admin"
          className="py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-sky-600 shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="submit"
          data-ripple-light="true"
        >
          Sign In
        </Link>
          }
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        {current_user && (
          <div className={`fixed inset-y-0 left-0 z-50 w-80 p-4 bg-[#4BAF47] sp-4 transform transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
            <div className="h-full flex flex-row">
              <div id="sidebar" className="bg-white h-screen md:block shadow-xl px-3 w-30md:w-60lg: w-full overflow-x-hidden transition-transform duration-300 ease-in-out">
                <div className="mt-10">
                  {/* <div id="profile" className="space-y-3">
                    <img src={defaultUser} alt="Avatar user" className="w-10 md:w-16 rounded-full mx-auto" />
                    <div>
                      <h2 className="font-medium text-xs md:text-sm text-center text-sky-500">{current_user && current_user.email}</h2>
                      <p className="text-xs text-gray-500 text-center">{current_user.is_admin ? "Administrator" : "User"}</p>
                    </div>
                  </div> */}

                  <div id="menu" className="flex flex-col space-y-10 mt-6">
                    <Link
                      to="/admin"
                      className={`flex items-center gap-4 text-sm font-medium py-2 px-2 hover:bg-[#4BAF47] hover:text-white hover:text-base transition duration-150 ease-in-out ${activeLink === "Dashboard" ? "bg-[#4BAF47] text-white" : "text-gray-700"}`}
                      onClick={() =>  {toggleSidebar(),handleSetActiveLink("Dashboard") }}
                    >
                      <MdSpaceDashboard />
                      <span>Dashboard</span>
                    </Link>

                    <Link
                      to="/admin/products"
                      className={`flex items-center gap-4 text-sm font-medium py-2 px-2 hover:bg-[#4BAF47] hover:text-white hover:scale-105 transition duration-150 ease-in-out ${activeLink === "Blog" ? "bg-[#4BAF47] text-white" : "text-gray-700"}`}
                      onClick={() =>  {toggleSidebar(),handleSetActiveLink("Blog") }}
                    >
                      <FaBlog />
                      <span>Products</span>
                    </Link>

                    <Link
                      to="/admin/categories"
                      className={`flex items-center gap-4 text-sm font-medium py-2 px-2 hover:bg-[#4BAF47] hover:text-white hover:scale-105 transition duration-150 ease-in-out ${activeLink === "Events" ? "bg-[#4BAF47] text-white" : "text-gray-700"}`}
                      onClick={() =>  {toggleSidebar(),handleSetActiveLink("Events") }}
                    >
                      <FaCalendarDays />
                      <span>Categories</span>
                    </Link>
{/* 
                    <Link
                      to="/admin/orders"
                      className={`flex items-center gap-4 text-sm font-medium py-2 px-2 hover:bg-[#4BAF47] hover:text-white hover:scale-105 transition duration-150 ease-in-out ${activeLink === "Subscriptions" ? "bg-[#4BAF47] text-white" : "text-gray-700"}`}
                      onClick={() =>  {toggleSidebar(),handleSetActiveLink("Orders")}}
                    >
                      <FaJediOrder />
                      <span>Orders</span>
                    </Link> */}

                    <Link
                      to="/admin/profile"
                      className={`flex gap-4 items-center text-sm font-medium py-2 px-2 hover:bg-[#4BAF47] hover:text-white hover:scale-105 transition duration-150 ease-in-out ${activeLink === "Profile" ? "bg-[#4BAF47] text-white" : "text-gray-700"}`}
                      onClick={() =>  {toggleSidebar(),handleSetActiveLink("Profile") }}
                    >
                      <LuUser />
                      <span>Profile</span>
                    </Link>

                    <button
                      onClick={() => { logout(); toggleSidebar(); }}
                      className={`flex gap-4 items-center text-sm font-medium py-2 px-2 hover:bg-[#4BAF47] hover:text-white hover:scale-105 transition duration-150 ease-in-out`}
                      // className="flex items-center gap-4 text-sm font-medium py-useContext2 px-2 hover:bg-[#4BAF47] hover:text-white hover:scale-105 transition duration-150 ease-in-out"
                    >
                      <AiOutlineLogout />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 my-4 dml-64">
          <div className="bg-gray-50 p-1 sm:p-3 md:p-6 rounded-xl container min-h-[100vh] mx-auto py-8">
            <Outlet />
            <Toaster position="top-center" />
          </div>
        </div>
      </div>
    </div>
  );
}
