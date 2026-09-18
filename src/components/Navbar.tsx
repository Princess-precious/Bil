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

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthService } from "../lib/Auth/AuthService";
import { useAuth } from "../useAuth";
import { getStories } from "../../src/lib/api/stories";
import type { Story } from "../../src/lib/api/stories";

type NavbarProps ={
 className?: string;
}

function Navbar({className}:NavbarProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  
  const location = useLocation();
  const isProfile = location.pathname === "/user-profile"
  const isHome = location.pathname === "/"
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState<Story[]>([]);
  const { setIsSignedIn } = useAuth();
  const navigate = useNavigate();

  const handleSearch = async (value: string) => {
    setSearchQuery(value);

    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const results = await getStories(value);
      setSearchResults(results);
    } catch (error) {
      console.error("Search failed:", error);
      setSearchResults([]);
    }
  };  

    const handleLogout = async () => {
      try {
        await AuthService.logout();
      } catch (error) {
        console.error("Logout API failed:", error);
      } finally {
        setIsSignedIn(false);
        navigate("/");
      }
    };

  
  
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
        <div className="flex items-center gap-6">

          {/* Search */}
          {!isHome && (
            <div className="flex items-center gap-2">

            {showSearchBar && (
              <input
                type="search"
                placeholder="Search..."
                onChange={(e) => handleSearch(e.target.value)}
                onFocus = {() => setSearchFocused(true)}
                className="border-b border-black  p-2 outline-none text-xs absolute left-1/2 -translate-x-1/2 animate-search  md:w-[700px]"
              />
            )}

            {showSearchBar && searchFocused && (
              <div className="flex flex-col bg-[#F0EDE8] border border-[#D6D0C8] md:w-[700px] h-auto absolute top-[65px] left-1/2 -translate-x-1/2 rounded-xl shadow-lg p-2 gap-2 ">
                {/* SUGGESTIONS */}
                {/* {!searchQuery && (
                  <div className="flex flex-row gap-2 flex-wrap ">
                    <div className="border border-[#AFA8A0] bg-[#E5E0D9] text-[#252321] rounded-2xl p-2 text-[10px]  hover:opacity-80 active:opacity-80 ">
                      <p>Entertainment Stories</p>
                    </div>
                    <div className="border border-[#AFA8A0] bg-[#E5E0D9] text-[#252321] rounded-2xl p-2 text-[10px]  hover:opacity-80 active:opacity-80">
                      <p>The Wealth of Africa</p>
                    </div>
                    <div className="border border-[#AFA8A0] bg-[#E5E0D9] text-[#252321] rounded-2xl p-2 text-[10px]  hover:opacity-80 active:opacity-80">
                      <p>Aesthetics</p>
                    </div>
                    <div className="border border-[#AFA8A0] bg-[#E5E0D9] text-[#252321] rounded-2xl p-2 text-[10px]  hover:opacity-80 active:opacity-80 ">
                      <p>Entertainment Stories</p>
                    </div>
                    <div className="border border-[#AFA8A0] bg-[#E5E0D9] text-[#252321] rounded-2xl p-2 text-[10px]  hover:opacity-80 active:opacity-80">
                      <p>The Wealth of Africa</p>
                    </div>
                    <div className="border border-[#AFA8A0] bg-[#E5E0D9] text-[#252321] rounded-2xl p-2 text-[10px]  hover:opacity-80 active:opacity-80">
                      <p>Aesthetics</p>
                    </div>
                  
                  </div>
                )} */}

                {/* Searches */}
                {searchQuery && (
                  <div className="flex flex-col">
                    {searchResults.length > 0 ? (
                      searchResults.map((story) => (
                        <div
                          key={story.id}
                          className="flex flex-row text-[#252321] p-2 text-[10px] hover:opacity-80 active:opacity-80 items-center gap-1 cursor-pointer"
                          onClick={() => navigate(`/story/${story.id}`)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="10px"
                            viewBox="0 -960 960 960"
                            width="10px"
                            fill="currentColor"
                          >
                            <path d="M704-240 320-624v344h-80v-480h480v80H376l384 384-56 56Z" />
                          </svg>

                          <p>{story.title}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-[#252321] p-2 text-[10px]">
                        No articles found.
                      </p>
                    )}
                  </div>
                )}

              </div>
            )} 

            <button
              className="cursor-pointer"
              type="button"
              onClick={() =>{ 
                setShowSearchBar(!showSearchBar)
                setSearchFocused(false);
                setSearchQuery("");
              }
            } 
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
          
          {isHome ? (
            <div className="flex">
              <Link to="/signup" className="text-white bg-black border border-white hover:opacity-80 active:opacity-80 text-sm px-3 py-1 rounded-2xl text-center">
                Sign Up
              </Link>
            </div>
            
          ) : (
            //Profile Icon
            <Link to="/user-profile" className="group flex md:items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isProfile ? "#b35d52" : "#000000"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="group-focus:stroke-[#b35d52]">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </Link>
          )}

          {/* Hamburger Button */}
          {!isHome && (
            
          
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
              fill="currentColor"
            >
              <path d="M120-680v-80h720v80H120Zm0 480v-80h720v80H120Zm0-240v-80h720v80H120Z" />
            </svg>
          </button>
          )}
           

        </div>
      </nav>

      
       {showMenu && 
        <div className="md:hidden bg-white flex flex-col items-center gap-4 p-4 fixed top-[80px] right-0 z-40">
          <Link to="/" className="text-sm hover:text-[#b35d52] focus:text-[#b35d52]">Edit Profile</Link>  

          {/* Settings */}
          <Link to="/settings" className="flex items-center gap-1 text-sm hover:text-[#b35d52] focus:text-[#b35d52]">
            <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="15px" fill="currentcolor"><path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"/></svg>
            Settings
          </Link>
          <button onClick={handleLogout}  className="text-sm hover:text-[#b35d52]">
            Log Out
          </button>

          {/* {!isSignedIn && (
            
              <Link to="/signin" className="  hover:opacity-80 active:opacity-80 bg-[#1a1a1a] text-sm p-1 text-white">
                Sign In
              </Link>
            
          )} */}

          

        </div>
      } 
    </>
  );
}

export default Navbar;
