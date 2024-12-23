import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

export default function Layout() 
{
  return (
    <div>
        <NavBar/>

<div className="font-poppins min-h-[97vh] containerdmx-auto">
  <Outlet/>
  <Toaster position="top-center" />

</div>
        

        <Footer/>
      
    </div>
  )
}
