import Link from 'next/link';

export default function navbar() {
    return (
        <div>
            <nav className="bg-yellow-300 border-gray-200 py-2.5 dark:bg-blue-900">
                <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
                    <Link href="#" className="flex items-center">
                        <img src="https://www.svgrepo.com/show/499962/music.svg" className="h-6 mr-3 sm:h-9" alt="Landwind Logo"/>
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Landwind</span>
                    </Link>
                    <div className="items-center justify-between w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <Link href="/Homepage" className="block py-2 pl-3 pr-4 text-white bg-purple-700 rounded lg:bg-transparent lg:text-purple-700 lg:p-0 dark:text-white" aria-current="page">Home</Link>
                            </li>
                            <li>
                                <Link href="/AddEmployee" className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Create Employee</Link>
                            </li>
                            <li>
                                <Link href="/EmployeeList" className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">List Employee</Link>
                            </li>
                            <li>
                                <Link href="/createProject" className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Create Project</Link>
                            </li>
                            <li>
                                <Link href="/Team" className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Team</Link>
                            </li>
                            <li>
                                <Link href="/Contact" className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Contact</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <script src="https://unpkg.com/flowbite@1.4.1/dist/flowbite.js"></script>
        </div>
    );
}