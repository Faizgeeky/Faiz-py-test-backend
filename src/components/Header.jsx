import { useState } from "react";
import { PopoverGroup } from "@headlessui/react";
import { Bars3Icon, HeartIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header({ searchQuery, setSearchQuery }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const saveItems = useSelector((state) => state.save.saveItems);

  return (
    <header className="bg-white m-10">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex pr-4">
          <h1 className="font-bold">GROCERIES</h1>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 " aria-hidden="true" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex items-center ">
          <div className="relative flex items-center w-[60vw] border-solid border-black/10 border-[1px] drop-shadow-lg rounded-full h-[50px]">
            <input
              className="flex-grow p-4 h-full rounded-full outline-none"
              placeholder="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <button
              className="relative z-[2] flex items-center  bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700  rounded-full"
              type="button"
              id="button-addon1"
            >
              <Bars3Icon
                className=" relative h-6 w-6 mr-4 text-gray-500"
                aria-hidden="true"
              />
            </button>
          </div>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end space-x-4">
          <p class="relative flex">
            <HeartIcon color="pink" fill="pink" height={"30px"} />
            <span class="absolute right-0 top-0 rounded-full bg-pink-400 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center">
              {saveItems?.length}
            </span>
          </p>

          <Link to="/cart">
            <li class="font-sans block mt-4 lg:inline-block lg:mt-0 lg:ml-6 align-middle text-blue hover:text-gray-700">
              <p class="relative flex">
                <svg class="flex-1 w-8 h-8 fill-current" viewbox="0 0 24 24">
                  <path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z" />
                </svg>
                <span class="absolute right-0 top-0 rounded-full bg-pink-400 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center">
                  {cartItems?.length}
                </span>
              </p>
            </li>
          </Link>
        </div>
      </nav>
    </header>
  );
}
