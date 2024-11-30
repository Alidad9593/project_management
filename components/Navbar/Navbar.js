import Link from 'next/link';
import classes from './Navbar.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import PasswordPopup from '../PasswordPopUp/Passwordpopup';

export default function navbar() {
    const [passwordError, setPasswordError] = useState(''); // State for password error
    const [showPopup, setShowPopup] = useState(false); // State for showing the password popup
    const [targetPage, setTargetPage] = useState('');
    const router = useRouter();

    const handleRestrictedNavigation = async (userPassword) => {
        setShowPopup(false);
        // const userPassword = prompt('Enter the password to access this page:');

        const response = await fetch('/api/admin-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: userPassword }),
        }).then((res) => res.json()).then((data) => {
            if (data.valid) {
                setPasswordError('');
                router.push(targetPage);
            } else {
                setPasswordError('Incorrect password. Please try again.');
            }
        });
    };

    const handlePopupOpen = (page) => {
        setTargetPage(page); // Set the target page
        setShowPopup(true); // Show the popup
    };

    return (
        <div>
            <nav className="bg-blue-200 border-gray-200 py-2.5 dark:bg-blue-900">
                <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
                    <Link href="#" className="flex items-center">
                        <img src="https://www.svgrepo.com/show/499962/music.svg" className="h-6 mr-3 sm:h-9" alt="Landwind Logo" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Landwind</span>
                    </Link>
                    <div className="items-center justify-between w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                {/* <button onClick={() => router.push("/Homepage")} className="block py-2 pl-3 pr-4 text-white bg-purple-700 rounded lg:bg-transparent lg:text-purple-700 lg:p-0 dark:text-white" aria-current="page">Home</button>
                                 */}
                                <button onClick={() => router.push("/Homepage")} className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Home</button>
                            </li>
                            <li>
                                <button onClick={() => router.push("/AddEmployee")} className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Add Employee</button>
                            </li>
                            <li>
                                <button onClick={() => handlePopupOpen("/EmployeeList")} className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">List Employee</button>
                            </li>
                            <li>
                                <button onClick={() => handlePopupOpen("/createProject")} className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Create Project</button>
                            </li>
                            <li>
                                <button onClick={() => handlePopupOpen("/Listproject")} className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">List Project</button>
                            </li>
                            {/* <li>
                                <Link href="/Team" className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Team</Link>
                            </li>
                            <li>
                                <Link href="/Contact" className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Contact</Link>
                            </li> */}

                        </ul>

                    </div>
                </div>
            </nav>
            {showPopup && (
                <PasswordPopup
                    onClose={() => setShowPopup(false)}
                    onSubmit={handleRestrictedNavigation}
                />
            )}


            {passwordError && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-md text-center">
                        <p className="text-red-500 text-lg font-semibold">{passwordError}</p>
                        <button
                            onClick={() => setPasswordError('')}
                            className="mt-4 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            <script src="https://unpkg.com/flowbite@1.4.1/dist/flowbite.js"></script>
        </div>
    );
}




//SEE this
// import Link from 'next/link';
// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import PasswordPopup from '../PasswordPopUp/Passwordpopup';
// import PasswordVerifier from '../Passwordverifier/Passwordverifier';

// export default function Navbar() {
//     const [showPopup, setShowPopup] = useState(false);
//     const [targetPage, setTargetPage] = useState('');
//     const router = useRouter();

//     const handlePopupOpen = (page) => {
//         setTargetPage(page);
//         setShowPopup(true);
//     };

//     const handlePasswordSuccess = (page) => {
//         setShowPopup(false); // Close the popup
//         router.push(page); // Navigate to the target page
//     };

//     const handlePasswordError = () => {
//         setShowPopup(false); // Optionally close the popup on error
//     };

//     return (
//         <div>
//             <nav className="bg-blue-200 border-gray-200 py-2.5 dark:bg-blue-900">
//                 <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
//                     <Link href="#" className="flex items-center">
//                         <img src="https://www.svgrepo.com/show/499962/music.svg" className="h-6 mr-3 sm:h-9" alt="Landwind Logo" />
//                         <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Landwind</span>
//                     </Link>
//                     <div className="items-center justify-between w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
//                         <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
//                             <li>
//                                 <button
//                                     onClick={() => router.push('/Homepage')}
//                                     className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
//                                 >
//                                     Home
//                                 </button>
//                             </li>
//                             <li>
//                                 <button
//                                     onClick={() => handlePopupOpen('/AddEmployee')}
//                                     className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
//                                 >
//                                     Add Employee
//                                 </button>
//                             </li>
//                             <li>
//                                 <button
//                                     onClick={() => handlePopupOpen('/EmployeeList')}
//                                     className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
//                                 >
//                                     List Employee
//                                 </button>
//                             </li>
//                             <li>
//                                 <button
//                                     onClick={() => handlePopupOpen('/createProject')}
//                                     className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
//                                 >
//                                     Create Project
//                                 </button>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </nav>
//             {showPopup && (
//                 <PasswordPopup
//                     onClose={() => setShowPopup(false)}
//                     onSubmit={(password) => (
//                         <PasswordVerifier
//                             targetPage={targetPage}
//                             onSuccess={handlePasswordSuccess}
//                             onError={handlePasswordError}
//                             password={password}
//                         />
//                     )}
//                 />
//             )}
//         </div>
//     );
// }
