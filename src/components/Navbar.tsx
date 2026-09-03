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
import Button from "../ui/button";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

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
        <div className="hidden md:flex md:items-center md:gap-6 md:text-lg text-[#1a1a1a]">
          <Link
            to="/feed"
            className="hover:underline active:underline hover:opacity-80 active:opacity-80"
          >
            Feed
          </Link>
        </div>

        {/* 3 */}
        <div className="flex items-center gap-2">

          {/* Search */}
          <div className="flex items-center gap-2">

            {showSearchBar && (
              <input
                type="search"
                placeholder="Search..."
                className="border border-[#dbdad9] rounded-md p-2 outline-none"
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

          <div className="hidden md:flex md:items-center md:gap-4">
            <Button className="text-sm p-2">
              WRITE A STORY
            </Button>
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

      
      {showMenu && (
        <div className="md:hidden bg-white flex flex-col items-center gap-4 p-4 fixed top-[80px] right-0 z-40">

          <div className="flex flex-col items-center gap-6 text-sm text-black">
            <Link
              to="/feed"
              className="hover:underline active:underline"
            >
              Feed
            </Link>
          </div>

          <Button className="text-xs p-1">
            WRITE A STORY
          </Button>

        </div>
      )}
    </>
  );
}

export default Navbar;
