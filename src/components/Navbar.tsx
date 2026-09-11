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

import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../useAuth";

type NavbarProps ={
 className?: string;
}

function Navbar({className}:NavbarProps) {
  //const [showMenu, setShowMenu] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const { isSignedIn } = useAuth();
  const location = useLocation();
  
  const isHome = location.pathname === "/"
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  
  return (
    <>
      <nav className={`${className} fixed top-0 left-0 w-full bg-[#fbf9f8] py-4 px-4 md:px-14 flex items-center justify-between h-[80px]  z-50`}>
        {/* 1 */}
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className=" text-5xl font-bold"
          >
            BIL
          </Link>
        </div>
        

        {/* 2 */}
        <div className="flex items-center gap-1">

          {/* Search */}
          {!isHome && (
            <div className="flex items-center gap-2">

            {showSearchBar && (
              <input
                type="search"
                placeholder="Search..."
                onChange = {(e) => setSearchQuery(e.target.value)}
                onFocus = {() => setSearchFocused(true)}
                className="border-b border-black  p-2 outline-none text-xs absolute left-1/2 -translate-x-1/2 animate-search  md:w-[700px]"
              />
            )}

            {showSearchBar && searchFocused && (
              <div className="flex flex-col bg-[#272525]  md:w-[700px] h-auto absolute top-[56px] left-1/2 -translate-x-1/2 rounded-xl shadow-lg p-2 gap-2 ">
                {/* SUGGESTIONS */}
                {!searchQuery && (
                  <div className="flex flex-row gap-2 flex-wrap ">
                    <div className="border border-white text-white rounded-2xl p-2 text-[10px]  hover:opacity-80 active:opacity-80 ">
                      <p>Entertainment Stories</p>
                    </div>
                    <div className="border border-white text-white rounded-2xl p-2 text-[10px]  hover:opacity-80 active:opacity-80">
                      <p>The Wealth of Africa</p>
                    </div>
                    <div className="border border-white text-white rounded-2xl p-2 text-[10px]  hover:opacity-80 active:opacity-80">
                      <p>Aesthetics</p>
                    </div>
                  
                  </div>
                )}

                {/* Searches */}
                {searchQuery && (
                  <div className="flex flex-col">
                    <div className="flex flex-row text-white p-2 text-[10px]  hover:opacity-80 active:opacity-80 items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" height="10px" viewBox="0 -960 960 960" width="10px" fill="currentColor"><path d="M704-240 320-624v344h-80v-480h480v80H376l384 384-56 56Z"/></svg>
                      <p>Aesthetics</p>
                    </div>

                    <div className="flex flex-row text-white p-2 text-[10px]  hover:opacity-80 active:opacity-80 items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" height="10px" viewBox="0 -960 960 960" width="10px" fill="currentColor"><path d="M704-240 320-624v344h-80v-480h480v80H376l384 384-56 56Z"/></svg>
                      <p>Aesthetics</p>
                    </div>

                    <div className="flex flex-row text-white p-2 text-[10px]  hover:opacity-80 active:opacity-80 items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" height="10px" viewBox="0 -960 960 960" width="10px" fill="currentColor"><path d="M704-240 320-624v344h-80v-480h480v80H376l384 384-56 56Z"/></svg>
                      <p>Aesthetics</p>
                    </div>
                  </div>
                )}

              </div>
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
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>
          )}
          
          {isSignedIn ? (
            // Profile Icon
            <Link to="/user-profile" className="flex md:items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </Link>
          ) : (
            <div className="md:flex">
              <Link to="/signin" className="text-white bg-black border border-white hover:opacity-80 active:opacity-80 text-sm px-3 py-1 rounded-2xl text-center">
                Sign In
              </Link>
            </div>
          )}

          {/* Hamburger Button */}
          {/* <button
            type="button"
            className="md:hidden"
            onClick={() => setShowMenu(!showMenu)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
              fill="currentColor"
            >
              <path d="M120-680v-80h720v80H120Zm0 480v-80h720v80H120Zm0-240v-80h720v80H120Z" />
            </svg>
          </button> */}

        </div>
      </nav>

      
      {/* {showMenu && 
        <div className="md:hidden bg-white flex flex-col items-center gap-4 p-4 fixed top-[80px] right-0 z-40">

          

          {!isHome && (
            <div className="md:flex md:items-c">
              <Link to="/new-story" className="text-sm p-2 hover:underline active:underline hover:opacity-80 active:opacity-80">
                Add Story
              </Link>
            </div>
          )}

          {!isSignedIn && (
            <div className="flex">
              <Link to="/signin" className="hover:opacity-80 active:opacity-80 bg-[#1a1a1a] text-sm p-1 text-white">
                Sign In
              </Link>
            </div>
          )}

          

        </div>
      } */}
    </>
  );
}

export default Navbar;
