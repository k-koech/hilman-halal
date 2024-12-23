import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import Address from '../components/Address';
import AddressView from '../components/AddressView';
import toast from 'react-hot-toast';

export default function Profile() {
    const {current_user, updatePassword} = useContext(AuthContext)

    // const [email, setEmail] = useState("kelvin");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
    const handlePasswordVisibility = () => {
      setIsPasswordVisible((prev) => !prev);
    };
  
    const handlePasswordChange = (e) => {
      setNewPassword(e.target.value);
    };
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };


    // Update password
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [verifyNewPassword, setVerifyNewPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if(newPassword != verifyNewPassword){
          toast.error("Password doesn't match!")
        }
        else{
        const data = { oldpassword: oldPassword, newpassword: newPassword };
        updatePassword(data);
        }


      } 

      
  
    return (
      <section className="bg-white  py-8 antialiased Ddark:bg-gray-900 md:py-8">
        <div className="mx-auto max-w-screen-lg px-4 2xl:px-8 shadow-xl lg:p-4">
         
          <h2 className="mb-4 text-xl font-semibold text-gray-900 Ddark:text-white sm:text-2xl md:mb-6">Profile</h2>

          <div className="py-4 md:py-8">
            <div className="mb-4 grid gap-4 sm:grid-cols-2 sm:gap-8 lg:gap-16">
              <div className="space-y-4">
                <div className="flex space-x-4 items-center">
                     <img class="w-20 rounded-full" src={ (current_user.profile.picture? IMAGES_URL + current_user.profile.picture: current_user.profile.google_profile_image? current_user.profile.google_profile_image : './images/defaultuser.png') } alt="profile avatar" />
                  <div>
                    <h2 className="capitalize flex items-center text-xl font-bold leading-none text-gray-900 Ddark:text-white sm:text-2xl">
                      {current_user && current_user.email.split("@")[0].split(".").join(" ")}
                    </h2>
                  </div>
                </div>
                <dl className="">
                  <dt className="font-semibold text-gray-900 Ddark:text-white">Email Address</dt>
                  <dd className="text-gray-500 Ddark:text-gray-400">{current_user && current_user.email}</dd>
                </dl>
                <dl>
                  <h3 className='font-bold text-xl'>Update Password</h3>
                  <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2"
                      >
                        Old Password
                      </label>
                      <input type="password"  id="oldPassword"  value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)} required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2" >
                        New Password
                      </label>
                      <input type="password" id="newPassword" value={newPassword}  onChange={(e) => setNewPassword(e.target.value)} required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" >
                          Verify New Password
                        </label>
                        <input type="password" id="newPassword" value={verifyNewPassword}  onChange={(e) => setVerifyNewPassword(e.target.value)} required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-[#4BAF47] text-white font-medium rounded-md hover:bg-[#56c852] focus:outline-none focus:ring-2 focus:ring-[#97f894] focus:ring-offset-1"
                    >
                      Update Password
                    </button>
                  </form>


                </dl>
              </div>
              <div className="space-y-4">
                {/* <dl>
                  <dt className="font-semibold text-gray-900 Ddark:text-white">Phone Number</dt>
                  <dd className="text-gray-500 Ddark:text-gray-400">+1234 567 890 / +12 345 678</dd>
                </dl> */}
                <dl>
                  {current_user && !current_user.is_admin &&
                    <AddressView/>
                  }
                </dl>
                
              </div>
            </div>

            {/* <button type="button" data-modal-target="accountInformationModal2" data-modal-toggle="accountInformationModal2" className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 Ddark:bg-primary-600 Ddark:hover:bg-primary-700 Ddark:focus:ring-primary-800 sm:w-auto">
              <svg className="-ms-0.5 me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"></path>
              </svg>
              Edit your data
            </button> */}
          </div>
        </div>

      </section>
    );
}







          
// <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 Ddark:border-gray-700 Ddark:bg-gray-800 md:p-8">
// <h3 className="mb-4 text-xl font-semibold text-gray-900 Ddark:text-white">Latest orders</h3>
// <div className="flex flex-wrap items-center gap-y-4 border-b border-gray-200 pb-4 Ddark:border-gray-700 md:pb-5">
//   <dl className="w-1/2 sm:w-48">
//     <dt className="text-base font-medium text-gray-500 Ddark:text-gray-400">Order ID:</dt>
//     <dd className="mt-1.5 text-base font-semibold text-gray-900 Ddark:text-white">
//       <a href="#" className="hover:underline">#FWB12546798</a>
//     </dd>
//   </dl>

//   <dl className="w-1/2 sm:w-1/4 md:flex-1 lg:w-auto">
//     <dt className="text-base font-medium text-gray-500 Ddark:text-gray-400">Date:</dt>
//     <dd className="mt-1.5 text-base font-semibold text-gray-900 Ddark:text-white">11.12.2023</dd>
//   </dl>

//   <dl className="w-1/2 sm:w-1/5 md:flex-1 lg:w-auto">
//     <dt className="text-base font-medium text-gray-500 Ddark:text-gray-400">Price:</dt>
//     <dd className="mt-1.5 text-base font-semibold text-gray-900 Ddark:text-white">$499</dd>
//   </dl>

//   <dl className="w-1/2 sm:w-1/4 sm:flex-1 lg:w-auto">
//     <dt className="text-base font-medium text-gray-500 Ddark:text-gray-400">Status:</dt>
//     <dd className="me-2 mt-1.5 inline-flex shrink-0 items-center rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 Ddark:bg-yellow-900 Ddark:text-yellow-300">
//       <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
//         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"></path>
//       </svg>
//       In transit
//     </dd>
//   </dl>

//   <div className="w-full sm:flex sm:w-32 sm:items-center sm:justify-end sm:gap-4">
//     <button
//       id="actionsMenuDropdownModal10"
//       data-dropdown-toggle="dropdownOrderModal10"
//       type="button"
//       className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 Ddark:border-gray-600 Ddark:bg-gray-800 Ddark:text-gray-400 Ddark:hover:bg-gray-700 Ddark:hover:text-white Ddark:focus:ring-gray-700 md:w-auto"
//     >
//       Actions
//       <svg className="-me-0.5 ms-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
//         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"></path>
//       </svg>
//     </button>
//     <div id="dropdownOrderModal10" className="z-10 hidden w-40 divide-y divide-gray-100 rounded-lg bg-white shadow Ddark:bg-gray-700" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom">
//       <ul className="p-2 text-left text-sm font-medium text-gray-500 Ddark:text-gray-400" aria-labelledby="actionsMenuDropdown10">
//         <li>
//           <a href="#" className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 Ddark:text-gray-400 Ddark:hover:bg-gray-600 Ddark:hover:text-white">
//             <svg className="me-1.5 h-4 w-4 text-gray-400 group-hover:text-gray-900 Ddark:text-gray-400 Ddark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
//               <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"></path>
//             </svg>
//             <span>Order again</span>
//           </a>
//         </li>
//         <li>
//           <a href="#" className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 Ddark:text-gray-400 Ddark:hover:bg-gray-600 Ddark:hover:text-white">
//             <svg className="me-1.5 h-4 w-4 text-gray-400 group-hover:text-gray-900 Ddark:text-gray-400 Ddark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
//               <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"></path>
//               <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
//             </svg>
//             Order details
//           </a>
//         </li>
//         <li>
//           <a href="#" data-modal-target="deleteOrderModal" data-modal-toggle="deleteOrderModal" className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-red-600 hover:bg-gray-100 Ddark:hover:bg-gray-600 Ddark:hover:text-white">
//             <svg className="me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
//               <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"></path>
//             </svg>
//             Cancel order
//           </a>
//         </li>
//       </ul>
//     </div>
//   </div>
// </div>
// <div className="flex flex-wrap items-center gap-y-4 border-b border-gray-200 py-4 pb-4 Ddark:border-gray-700 md:py-5">
//   <dl className="w-1/2 sm:w-48">
//     <dt className="text-base font-medium text-gray-500 Ddark:text-gray-400">Order ID:</dt>
//     <dd className="mt-1.5 text-base font-semibold text-gray-900 Ddark:text-white">
//       <a href="#" className="hover:underline">#FWB12546777</a>
//     </dd>
//   </dl>

//   <dl className="w-1/2 sm:w-1/4 md:flex-1 lg:w-auto">
//     <dt className="text-base font-medium text-gray-500 Ddark:text-gray-400">Date:</dt>
//     <dd className="mt-1.5 text-base font-semibold text-gray-900 Ddark:text-white">10.11.2024</dd>
//   </dl>

//   <dl className="w-1/2 sm:w-1/5 md:flex-1 lg:w-auto">
//     <dt className="text-base font-medium text-gray-500 Ddark:text-gray-400">Price:</dt>
//     <dd className="mt-1.5 text-base font-semibold text-gray-900 Ddark:text-white">$3,287</dd>
//   </dl>

//   <dl className="w-1/2 sm:w-1/4 sm:flex-1 lg:w-auto">
//     <dt className="text-base font-medium text-gray-500 Ddark:text-gray-400">Status:</dt>
//     <dd className="mt-1.5 inline-flex items-center rounded bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 Ddark:bg-red-900 Ddark:text-red-300">
//       <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
//         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"></path>
//       </svg>
//       Cancelled
//     </dd>
//   </dl>

//   <div className="w-full sm:flex sm:w-32 sm:items-center sm:justify-end sm:gap-4">
//     <button
//       id="actionsMenuDropdownModal11"
//       data-dropdown-toggle="dropdownOrderModal11"
//       type="button"
//       className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 Ddark:border-gray-600 Ddark:bg-gray-800 Ddark:text-gray-400 Ddark:hover:bg-gray-700 Ddark:hover:text-white Ddark:focus:ring-gray-700 md:w-auto"
//     >
//       Actions
//       <svg className="-me-0.5 ms-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
//         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"></path>
//       </svg>
//     </button>
//     <div id="dropdownOrderModal11" className="z-10 hidden w-40 divide-y divide-gray-100 rounded-lg bg-white shadow Ddark:bg-gray-700" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom">
//       <ul className="p-2 text-left text-sm font-medium text-gray-500 Ddark:text-gray-400" aria-labelledby="actionsMenuDropdown11">
//         <li>
//           <a href="#" className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 Ddark:text-gray-400 Ddark:hover:bg-gray-600 Ddark:hover:text-white">
//             <svg className="me-1.5 h-4 w-4 text-gray-400 group-hover:text-gray-900 Ddark:text-gray-400 Ddark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
//               <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"></path>
//             </svg>
//             <span>Order again</span>
//           </a>
//         </li>
//         <li>
//           <a href="#" className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 Ddark:text-gray-400 Ddark:hover:bg-gray-600 Ddark:hover:text-white">
//             <svg className="me-1.5 h-4 w-4 text-gray-400 group-hover:text-gray-900 Ddark:text-gray-400 Ddark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
//               <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"></path>
//               <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
//             </svg>
//             Order details
//           </a>
//         </li>
//       </ul>
//     </div>
//   </div>
// </div>
// <div className="flex flex-wrap items-center gap-y-4 border-b border-gray-200 py-4 pb-4 Ddark:border-gray-700 md:py-5">
//   <dl className="w-1/2 sm:w-48">
//     <dt className="text-base font-medium text-gray-500 Ddark:text-gray-400">Order ID:</dt>
//     <dd className="mt-1.5 text-base font-semibold text-gray-900 Ddark:text-white">
//       <a href="#" className="hover:underline">#FWB12546846</a>
//     </dd>
//   </dl>

//   <dl className="w-1/2 sm:w-1/4 md:flex-1 lg:w-auto">
//     <dt className="text-base font-medium text-gray-500 Ddark:text-gray-400">Date:</dt>
//     <dd className="mt-1.5 text-base font-semibold text-gray-900 Ddark:text-white">07.11.2024</dd>
//   </dl>

//   <dl className="w-1/2 sm:w-1/5 md:flex-1 lg:w-auto">
//     <dt className="text-base font-medium text-gray-500 Ddark:text-gray-400">Price:</dt>
//     <dd className="mt-1.5 text-base font-semibold text-gray-900 Ddark:text-white">$111</dd>
//   </dl>

//   <dl className="w-1/2 sm:w-1/4 sm:flex-1 lg:w-auto">
//     <dt className="text-base font-medium text-gray-500 Ddark:text-gray-400">Status:</dt>
//     <dd className="mt-1.5 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 Ddark:bg-green-900 Ddark:text-green-300">
//       <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
//         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5"></path>
//       </svg>
//       Completed
//     </dd>
//   </dl>

//   <div className="w-full sm:flex sm:w-32 sm:items-center sm:justify-end sm:gap-4">
//     <button
//       id="actionsMenuDropdownModal12"
//       data-dropdown-toggle="dropdownOrderModal12"
//       type="button"
//       className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 Ddark:border-gray-600 Ddark:bg-gray-800 Ddark:text-gray-400 Ddark:hover:bg-gray-700 Ddark:hover:text-white Ddark:focus:ring-gray-700 md:w-auto"
//     >
//       Actions
//       <svg className="-me-0.5 ms-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
//         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"></path>
//       </svg>
//     </button>
//     <div id="dropdownOrderModal12" className="z-10 hidden w-40 divide-y divide-gray-100 rounded-lg bg-white shadow Ddark:bg-gray-700" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom">
//       <ul className="p-2 text-left text-sm font-medium text-gray-500 Ddark:text-gray-400" aria-labelledby="actionsMenuDropdown12">
//         <li>
//           <a href="#" className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 Ddark:text-gray-400 Ddark:hover:bg-gray-600 Ddark:hover:text-white">
//             <svg className="me-1.5 h-4 w-4 text-gray-400 group-hover:text-gray-900 Ddark:text-gray-400 Ddark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
//               <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"></path>
//             </svg>
//             <span>Order again</span>
//           </a>
//         </li>
//         <li>
//           <a href="#" className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 Ddark:text-gray-400 Ddark:hover:bg-gray-600 Ddark:hover:text-white">
//             <svg className="me-1.5 h-4 w-4 text-gray-400 group-hover:text-gray-900 Ddark:text-gray-400 Ddark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
//               <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"></path>
//               <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
//             </svg>
//             Order details
//           </a>
//         </li>
//       </ul>
//     </div>
//   </div>
// </div>
// <div className="flex flex-wrap items-center gap-y-4 pt-4 md:pt-5">
//   <dl className="w-1/2 sm:w-48">
//     <dt className="text-base font-medium text-gray-500 Ddark:text-gray-400">Order ID:</dt>
//     <dd className="mt-1.5 text-base font-semibold text-gray-900 Ddark:text-white">
//       <a href="#" className="hover:underline">#FWB12546212</a>
//     </dd>
//   </dl>

//   <dl className="w-1/2 sm:w-1/4 md:flex-1 lg:w-auto">
//     <dt className="text-base font-medium text-gray-500 Ddark:text-gray-400">Date:</dt>
//     <dd className="mt-1.5 text-base font-semibold text-gray-900 Ddark:text-white">18.10.2024</dd>
//   </dl>

//   <dl className="w-1/2 sm:w-1/5 md:flex-1 lg:w-auto">
//     <dt className="text-base font-medium text-gray-500 Ddark:text-gray-400">Price:</dt>
//     <dd className="mt-1.5 text-base font-semibold text-gray-900 Ddark:text-white">$756</dd>
//   </dl>

//   <dl className="w-1/2 sm:w-1/4 sm:flex-1 lg:w-auto">
//     <dt className="text-base font-medium text-gray-500 Ddark:text-gray-400">Status:</dt>
//     <dd className="mt-1.5 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 Ddark:bg-green-900 Ddark:text-green-300">
//       <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
//         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5"></path>
//       </svg>
//       Completed
//     </dd>
//   </dl>

//   <div className="w-full sm:flex sm:w-32 sm:items-center sm:justify-end sm:gap-4">
//     <button
//       id="actionsMenuDropdownModal13"
//       data-dropdown-toggle="dropdownOrderModal13"
//       type="button"
//       className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 Ddark:border-gray-600 Ddark:bg-gray-800 Ddark:text-gray-400 Ddark:hover:bg-gray-700 Ddark:hover:text-white Ddark:focus:ring-gray-700 md:w-auto"
//     >
//       Actions
//       <svg className="-me-0.5 ms-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
//         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"></path>
//       </svg>
//     </button>
//     <div id="dropdownOrderModal13" className="z-10 hidden w-40 divide-y divide-gray-100 rounded-lg bg-white shadow Ddark:bg-gray-700" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom">
//       <ul className="p-2 text-left text-sm font-medium text-gray-500 Ddark:text-gray-400" aria-labelledby="actionsMenuDropdown13">
//         <li>
//           <a href="#" className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 Ddark:text-gray-400 Ddark:hover:bg-gray-600 Ddark:hover:text-white">
//             <svg className="me-1.5 h-4 w-4 text-gray-400 group-hover:text-gray-900 Ddark:text-gray-400 Ddark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
//               <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"></path>
//             </svg>
//             <span>Order again</span>
//           </a>
//         </li>
//         <li>
//           <a href="#" className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 Ddark:text-gray-400 Ddark:hover:bg-gray-600 Ddark:hover:text-white">
//             <svg className="me-1.5 h-4 w-4 text-gray-400 group-hover:text-gray-900 Ddark:text-gray-400 Ddark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
//               <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"></path>
//               <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
//             </svg>
//             Order details
//           </a>
//         </li>
//       </ul>
//     </div>
//   </div>
// </div>
// </div>