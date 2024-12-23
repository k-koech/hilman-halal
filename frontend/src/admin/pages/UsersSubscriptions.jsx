import React, { useContext, useState } from 'react'
import MassUsersMessage from '../../components/MassUsersMessage';
import { UserContext } from '../../context/UserContext';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

export default function UsersSubscriptions() 
{

  const {subscribers, deleteSubscriber, sendSubscriptionEmail} = useContext(UserContext)
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  
  const [subject, setSubject] = useState()
  const [message, setMessage] = useState()
  // Function to handle checkboxsubscibers selection
  const handleCheckboxChange = (userId) => {
      if (selectedUsers.includes(userId)) {
          setSelectedUsers(selectedUsers.filter(id => id !== userId));
      } else {
          setSelectedUsers([...selectedUsers, userId]);
      }
  };

      // Function to handle checking/unchecking all users
      const handleSelectAll = () => {
        if (selectAll) {
            setSelectedUsers([]);
        } else {
            const allUserIds = subscribers && subscribers.map(user => user.id);
            setSelectedUsers(allUserIds);
        }
        setSelectAll(!selectAll);
    };

  // Function to handle sending message
  const handleSubmit = (e) => {
     e.preventDefault()
     
     sendSubscriptionEmail(selectedUsers,subject, message)

     setMessage("")
     setSubject("")
  };

  // Disable the "Send message" button if no user is selected
  const isSendMessageDisabled = selectedUsers.length === 0;

// mass message modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


//   delete
const onDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSubscriber(id)
      
      }
    });

  }



  return (
    <>
    <div class="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div class="w-full mb-1">
            <div class="mb-4">
                <nav class="flex mb-5" aria-label="Breadcrumb">
                    <ol class="inline-flex items-center space-x-1 text-sm font-medium md:space-x-2">
                      <li class="inline-flex items-center">
                        <Link to="/admin" class="inline-flex items-center text-gray-700 hover:text-sky-600 dark:text-gray-300 dark:hover:text-white">
                          <svg class="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link to="/admin/subscriptions" class="flex items-center">
                          <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                          <span class="ml-1 text-gray-700 hover:text-sky-600 md:ml-2 dark:text-gray-300 dark:hover:text-white">Subscribers</span>
                        </Link>
                      </li>
                      {/* <li>
                        <div class="flex items-center">
                          <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                          <span class="ml-1 text-gray-400 md:ml-2 dark:text-gray-500" aria-current="page">List</span>
                        </div>
                      </li> */}
                    </ol>
                </nav>
                <h1 class="sm:text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Subscribed Users</h1>
            </div>
            <div class="flex ">
                <div class="items-center hidden mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0 dark:divide-gray-700">
                    <form class="lg:pr-3" action="#" method="GET">
                    <label for="users-search" class="sr-only">Search</label>
                    <div class="relative mt-1 lg:w-64 xl:w-96">
                        <input type="text" name="email" id="users-search" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" placeholder="Search for users" />
                    </div>
                    </form>
                    {/* <div class="flex pl-0 mt-3 space-x-1 sm:pl-2 sm:mt-0">
                        <a href="#" class="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"></path></svg>
                        </a>
                        <a href="#" class="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                        </a>
                        <a href="#" class="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                        </a>
                        <a href="#" class="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
                        </a>
                    </div> */}
                </div>
                <div class="flex items-center ml-auto space-x-2 sm:space-x-3">
                    <button
                      type="button"
                      // onClick={handleSubmit}
                      onClick={openModal}
                      disabled={isSendMessageDisabled}
                      className={`inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center rounded-lg ${isSendMessageDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-sky-700 text-white hover:bg-sky-800 focus:ring-4 focus:ring-sky-300'}`}
                    >
                        <svg className="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path>
                        </svg>
                        Send mass message
                    </button>
                    <MassUsersMessage isOpen={isModalOpen} onClose={closeModal}>
                      <h1 className="text-xl font-bold mb-4">Send Message to Subscribers</h1>
                      <form onSubmit={handleSubmit} class="max-w-2xl mx-auto">
                        <div>
                          <label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Subject</label>
                          <input value={subject || ""} onChange={ e => setSubject(e.target.value)} class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Subject" />
                        </div>
                        <div>
                            <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                            <textarea value={message || ""} onChange={ e => setMessage(e.target.value)} rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
                        </div>
                        <button type="submit" class="block w-full rounded-md bg-sky-600 mt-5 py-2 hover:bg-sky-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">
                                Send
                        </button>
                    </form>
                    </MassUsersMessage>
                    {/* <a href="#" class="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-sky-300 sm:w-auto dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                        <svg class="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clip-rule="evenodd"></path></svg>
                        Export
                    </a> */}
                </div>
            </div>
        </div>
    </div>


    <div class="flex flex-col">
        <div class="overflow-x-auto">
            <div class="inline-block min-w-full align-middle">
                <div class="w-[95vw] px-3 sm:w-full overflow- shadow">
                    <table class=" w-full  divide-y divide-gray-200 ttable-fixed dark:divide-gray-600">
                        <thead class="bg-gray-100 dark:bg-gray-700">
                            <tr>
                                <th scope="col" class="px-2 py-4">
                                    <div class="flex items-center">
                                       <input
                                          id="checkbox-all"
                                          aria-describedby="checkbox-all"
                                          type="checkbox"
                                          checked={selectAll}
                                          onChange={handleSelectAll}
                                          className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-sky-300 dark:focus:ring-sky-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                                      />                                       
                                      <label for="checkbox-all" class="sr-only">checkbox</label>
                                    </div>
                                </th>
                              
                                <th scope="col" class="px-2 py-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                    Email
                                </th>
                                <th scope="col" class="px-2 py-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                          {subscribers &&  subscribers.map && subscribers.map((user)=>(
                            <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                                <td class="w-4 px-2 py-4">
                                    <div class="flex items-center">
                                    <input
                                        id={`checkbox-${user.id}`}
                                        aria-describedby={`checkbox-${user.id}`}
                                        type="checkbox"
                                        checked={selectedUsers.includes(user.id)}
                                        onChange={() => handleCheckboxChange(user.id)}
                                        className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-sky-300 dark:focus:ring-sky-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                        {/* <input id="checkbox-{{ .id }}" aria-describedby="checkbox-1" type="checkbox" class="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-sky-300 dark:focus:ring-sky-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" /> */}
                                        <label for="checkbox-{{ .id }}" class="sr-only">checkbox</label>
                                    </div>
                                </td>
                               
                                <td class="px-2 py-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
                                    <div class="text-sm font-normal text-gray-500 dark:text-gray-400">{user.email}</div>
                                </td>
                                <td class="px-2 py-4 space-x-2 whitespace-nowrap">
                                    <button type="button" data-modal-target="edit-user-modal" data-modal-toggle="edit-user-modal" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">
                                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
                                        Send user
                                    </button>
                                    <button onClick={()=>onDelete(user.id)} type="button" data-modal-target="delete-user-modal" data-modal-toggle="delete-user-modal" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900">
                                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                                        Delete user
                                    </button>
                                </td>
                            </tr>))
                          }
              
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>


 </>
  
   
    
   
  )
}
