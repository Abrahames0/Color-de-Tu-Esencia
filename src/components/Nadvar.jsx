// Navbar.js
import React from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import Logo from "../assets/img/Logo 1.png";
import { FaBars, FaRegCircleXmark } from "react-icons/fa6";
import { MdOutlineWbSunny, } from 'react-icons/md';
import { FaMoon } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function Navbar({ toggleDarkMode, darkMode }) {
  return (
    <Disclosure as="nav" className="bg-customColor z-100">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="bg-customColor group relative inline-flex items-center justify-center rounded-md p-2 text-gray-950 hover:text-dark focus:outline-none focus:ring-2 focus:ring-inset focus:ring-dark">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Abrir Menu</span>
              <FaBars aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <FaRegCircleXmark aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link to='/'>
              <img
                alt="Color de tu esencia"
                src={Logo}
                className="h-8 w-auto"
                />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block relative w-full">
              <div className="flex justify-end space-x-4">
                <li className="list-none mx-5 hover:border-b-4 border-indigo-800 cursor-pointer p-2 transition-all">
                  <button onClick={toggleDarkMode} className="text-center justify-center flex">
                    {darkMode ? <FaMoon size={25} /> : <MdOutlineWbSunny size={25} />}
                  </button>
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden flex flex-col items-center">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <li className="list-none mx-5 hover:border-b-4 border-indigo-600 cursor-pointer p-2 transition-all flex justify-center">
            <button onClick={toggleDarkMode} className="text-center flex items-center justify-center">
              {darkMode ? <FaMoon size={25} /> : <MdOutlineWbSunny size={25} />}
            </button>
          </li>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
