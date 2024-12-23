import { useContext, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaUsersCog } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import FormatDate from "../../components/utils/FormatDate";


export default function Profile() 
{
    const [formdata, setFormdata] = useState({})

    const handleChange = (e) =>
    {
      const name = e.target.name;
      const value = e.target.value;
      setFormdata(values => ({...values, [name]: value}))
    }

    const {updatePassword,updateUsername, current_user} = useContext(AuthContext)


    const handleSubmit = (e) =>{
        e.preventDefault()
        e.preventDefault();
  
        const oldpassword = formdata.oldpassword;
        const newpassword = formdata.newpassword;
        const repeatpassword = formdata.repeatpassword;
    
        if(newpassword.length < 6)
        {
          toast.error("Password should be atleast 6 characters", { theme: "colored" })
        }

        else if(newpassword !== repeatpassword)
        {
          toast.error("New Passwords do not match", { theme: "colored" })
        }
        
        else
        {
          updatePassword(oldpassword, newpassword);
          setFormdata({})
        }
    }

    // Update username
    const [username, setUsername] = useState("")
    const handleUsernameSubmit = (e) =>{
        e.preventDefault()

        updateUsername( username)
    }


  return (
    <div>
    <div className="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4 dark:bg-gray-900">
        <div className="mb-4 col-span-full xl:mb-2">
            <nav className="flex mb-5" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 text-sm font-medium md:space-x-2">
                  <li className="inline-flex items-center">
                    <Link to="/admin" className="inline-flex items-center text-gray-700 hover:text-sky-600 dark:text-gray-300 dark:hover:text-white">
                      <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                      Home
                    </Link>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                      <Link to="/admin/profile" className="ml-1 text-gray-500 hover:text-sky-600 md:ml-2 dark:text-gray-300 dark:hover:text-white">Profile</Link>
                    </div>
                  </li>
                </ol>
            </nav>
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">User settings</h1>
        </div>
        {/* <!-- Right Content --> */}
        <div className="col-span-full xl:col-auto">
            <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                <div className="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
                    <div className="px-2 flex flex-col items-center gap-2">
                        <AiOutlineUser className="w-14 h-14 rounded-full border border-gray-300" size={28} />
                        {/* <img className="mb-4 rounded-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0" src="/images/users/bonnie-green-2x.png" alt="loading..." /> */}
                        <h6 className="text-uppercase font-semibold">{current_user && current_user.username}</h6>    
                    </div>

                    <div>
                        <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">Profile picture</h3>
                        <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                            JPG, GIF or PNG. Max size of 800K
                        </div>
                        <div className="flex items-center space-x-4">
                            <button type="button" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">
                                <svg className="w-4 h-4 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z"></path><path d="M9 13h2v5a1 1 0 11-2 0v-5z"></path></svg>
                                Upload picture
                            </button>
                            {/* <button type="button" className="py-2 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                Delete
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>
            <form onSubmit={handleUsernameSubmit} className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                <h3 className="mb-4 text-xl font-semibold dark:text-white">Update Username</h3>
                <div className="mb-4">
                    <label htmlFor="settings-language" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                    <input type="text" value={username || ""} onChange={ e => setUsername(e.target.value) } className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" placeholder="Username" required />       
                </div>
                <div>
                    <button type="submit" className="text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">Save</button>
                </div>
            </form>
        
        </div>
        <div className="col-span-2">
                <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                <div className="flow-root">
                    <h3 className="text-xl font-semibold dark:text-white">Profile</h3>
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        <li className="py-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    <MdOutlineMailOutline size={24}/>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-base font-roboto text-gray-900 truncate dark:text-white">
                                        {current_user && current_user.email}
                                    </p>
                                    <p className="text-sm font-normal text-gray-500 truncate dark:text-gray-400">
                                        {/* Chrome on macOS */}
                                    </p>
                                </div>
                                <div className="inline-flex items-center">
                                    {/* <a href="#" className="px-3 py-2 mb-3 mr-3 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-sky-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Revoke</a> */}
                                </div>
                            </div>
                        </li>
                        <li className="pt-4 pb-6">
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                   <FaUsersCog size={24} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-base font-roboto text-gray-900 truncate dark:text-white">
                                        {current_user && current_user.username}
                                    </p>
                                    <p className="text-sm font-normal text-gray-500 truncate dark:text-gray-400">
                                        {/* Safari on iPhone                                 */}
                                    </p>
                                </div>
                                <div className="inline-flex items-center">
                                    {/* <a href="#" className="px-3 py-2 mb-3 mr-3 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-sky-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Revoke</a> */}
                                </div>
                            </div>
                        </li>
                        <li className="pt-4 pb-6">
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                   <MdDateRange size={24} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-base font-roboto text-gray-900 truncate dark:text-white">
                                     <FormatDate date={current_user && current_user.date_joined} />
                                    </p>
                                    <p className="text-sm font-normal text-gray-500 truncate dark:text-gray-400">
                                        {/* Safari on iPhone                                 */}
                                    </p>
                                </div>
                                <div className="inline-flex items-center">

                                </div>
                            </div>
                        </li>
                    
                    </ul>
                    <div>
                        {/* <button className="text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">See more</button> */}
                    </div>
                </div>
            </div>
            <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                <h3 className="mb-4 text-xl font-semibold dark:text-white">Password information</h3>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="current-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current password</label>
                            <input type="password" name="oldpassword" value={formdata.oldpassword || ""} onChange={handleChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" placeholder="••••••••" required />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New password</label>
                            <input name="newpassword" value={formdata.newpassword || ""} onChange={handleChange} data-popover-target="popover-password" data-popover-placement="bottom" type="password"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••" required />
                            <div data-popover id="popover-password" role="tooltip" className="absolute z-10 invisible inline-block text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
                                <div className="p-3 space-y-2">
                                    <h3 className="font-semibold text-gray-900 dark:text-white">Must have at least 6 characters</h3>
                                    <div className="grid grid-cols-4 gap-2">
                                        <div className="h-1 bg-orange-300 dark:bg-orange-400"></div>
                                        <div className="h-1 bg-orange-300 dark:bg-orange-400"></div>
                                        <div className="h-1 bg-gray-200 dark:bg-gray-600"></div>
                                        <div className="h-1 bg-gray-200 dark:bg-gray-600"></div>
                                    </div>
                                    <p>It’s better to have:</p>
                                    <ul>
                                        <li className="flex items-center mb-1">
                                            <svg className="w-4 h-4 mr-2 text-green-400 dark:text-green-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                            Upper & lower case letters
                                        </li>
                                        <li className="flex items-center mb-1">
                                            <svg className="w-4 h-4 mr-2 text-gray-300 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                            A symbol (#$&)
                                        </li>
                                        <li className="flex items-center">
                                            <svg className="w-4 h-4 mr-2 text-gray-300 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                            A longer password (min. 12 chars.)
                                        </li>
                                    </ul>
                            </div>
                            <div data-popper-arrow></div>
                            </div>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                            <input type="password" name="repeatpassword" value={formdata.repeatpassword || ""} onChange={handleChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" placeholder="••••••••" required />
                        </div>
                        <div className="col-span-6 sm:col-full">
                            <button type="submit" className="text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800" >Save</button>
                        </div>
                    </div>
                </form>
            </div>


        </div>
        
    </div>
   
    </div>
  )
}
