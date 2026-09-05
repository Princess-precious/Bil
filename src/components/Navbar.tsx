/**
    * @description      : 
    * @author           : HP
    * @group            : 
    * @created          : 02/09/2026 - 14:26:50
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 02/09/2026
    * - Author          : HP
    * - Modification    : 
**/

import { Link } from "react-router-dom";
import { useState } from "react";


function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showCategory, setShowCategory] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-[#fbf9f8] py-4 px-4 md:px-14 flex items-center justify-between h-[80px] border-b border-[#dbdad9] z-50">
        {/* 1 */}
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="text-[#1a1a1a] text-5xl font-bold"
          >
            BIL
          </Link>
        </div>
        {/* 2 */}
        <div className="hidden  md:flex md:items-center md:gap-6 md:text-lg text-[#1a1a1a] md:absolute left-1/2 -translate-x-1/2">
          <Link
            to="/feed"
            className="hover:underline active:underline hover:opacity-80 active:opacity-80"
          >
            Feed
          </Link>
          {/* CATEGORY */}
          <div className="relative group">
            <button
            className="flex items-center gap-1 hover:underline active:underline hover:opacity-80 active:opacity-80"
            >
              Category
              <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              >
              <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 hidden group-hover:flex flex-col bg-white items-center gap-4 p-4 z-40">
              <Link to="" className="text-xs">Design</Link>
              <Link to="" className="text-xs">Fashion</Link>
              <Link to="" className="text-xs">Entertainment</Link>
            </div>
          </div>
          
          

        </div>

        {/* 3 */}
        <div className="flex items-center gap-2">

          {/* Search */}
          <div className="relative flex items-center gap-2">

            {showSearchBar && (
              <input
                type="search"
                placeholder="Search..."
                className={`border-b border-black p-2 outline-none text-xs absolute right-10  ${showSearchBar ? "w-48 opacity-100" : "w-0 opacity-0"} `}
              />
            )}
            <button
              type="button"
              onClick={() => setShowSearchBar(!showSearchBar)}
              className="cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1a1a1a"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>

          <div className=" hidden md:flex md:items-c">
            <button className="text-sm p-2">
              Add Story
            </button>
          </div>

          <Link to="/signin" className=" md:flex md:items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </Link>

          <div className=" hidden md:flex md:items-c">
            <button className="hover:opacity-80 active:opacity-80 bg-[#1a1a1a] text-sm p-1 text-white">
              Sign In
            </button>
          </div>

          {/* Hamburger Button */}
          <button
            type="button"
            className="md:hidden"
            onClick={() => setShowMenu(!showMenu)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
              fill="#1a1a1a"
            >
              <path d="M120-680v-80h720v80H120Zm0 480v-80h720v80H120Zm0-240v-80h720v80H120Z" />
            </svg>
          </button>

        </div>
      </nav>

      
      {showMenu && 
        <div className="md:hidden bg-white flex flex-col items-center gap-4 p-4 fixed top-[80px] right-0 z-40">

          <div className="flex flex-col items-center gap-6 text-sm text-black">
            <Link
              to="/feed"
              className="hover:underline active:underline"
            >
              Feed
            </Link>

            {/* CATEGORY */}
            <div className="relative group">
              <button
              className="flex items-center gap-1 hover:underline active:underline   hover:opacity-80 active:opacity-80"
              >
                Category
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1a1a1a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                >
                <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
          
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 hidden group-hover:flex flex-col bg-white items-center gap-4 p-4 z-40">
                <Link to="" className="text-xs">Design</Link>
                <Link to="" className="text-xs">Fashion</Link>
                <Link to="" className="text-xs">Entertainment</Link>
              </div>
            </div>
            
          </div>

          <button className="text-xs p-1">
            Add Story
          </button>
          
          <button className="hover:opacity-80 active:opacity-80 bg-[#1a1a1a] w-full text-white text-xs p-1">
            Sign In
          </button>

        </div>
      }
    </>
  );
}

export default Navbar;
