/**
    * @description      : 
    * @author           : HP
    * @group            : 
    * @created          : 13/09/2026 - 20:06:38
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 13/09/2026
    * - Author          : HP
    * - Modification    : 
**/
import Footer from "../components/footer";
import Navbar from "../components/Navbar"
import {Link, useNavigate} from "react-router-dom"
import { useState } from "react";
import { deleteAccount } from "../lib/api/users";
import { useAuth } from "../../src/useAuth";
import { AuthService } from "../lib/Auth/AuthService";

function Settings(){
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const { setIsSignedIn } = useAuth();

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

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();

      setShowDeleteModal(false);
      setIsSignedIn(false);
      navigate("/");
    } catch (error) {
      console.error("Failed to delete account:", error);
    }
  };

  return(
    <>
      <Navbar/>
      <div className="flex flex-col items-center justify-center mt-[80px] px-14 md:px-90 font-hanken">
        <section className="flex flex-col gap-2 py-8">
          <p className="text-xs font-bold text-[#b35d52]">
            <span className="inline-block w-1.5 h-1.5 bg-[#b35d52] rounded-full"></span> Account & Security
          </p>
          <h1 className="text-2xl md:text-4xl font-playfair font-bold">Account Settings</h1>
          <p className="text-xs">
            Manage your Bil member credentials, session authentication, and account sovereignty.
          </p>
        </section>

        <section className="flex md:flex-row flex-col  gap-4 p-8 bg-white">
          <div className="flex flex-col gap-1">
            <h1 className="flex text-xl md:text-2xl font-playfair font-bold items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#1f1f1f"><path d="M480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q97-30 162-118.5T718-480H480v-315l-240 90v207q0 7 2 18h238v316Z"/></svg>
              Password & Security
            </h1>
            <p className="text-xs">Update your login passphrase or configure two-factor authentication to secure your editorial drafts.</p>
          </div>
          <div className="flex items-center">
            <Link to="/change-password" className="text-white text-xs whitespace-nowrap  bg-black px-4 py-2 hover:opacity-80 focus:opacity-80">Change Password</Link>
          </div>
        </section>

        <section className="flex flex-col md:flex-row gap-4 p-8 bg-white mt-10">
          <div className="flex flex-col gap-1">
            <h1 className="flex text-xl md:text-2xl font-playfair font-bold items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#1f1f1f"><path d="M480-120q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-480q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-840v80q-117 0-198.5 81.5T200-480q0 117 81.5 198.5T480-200v80Zm160-160-56-57 103-103H360v-80h327L584-624l56-56 200 200-200 200Z"/></svg>
              Session Management
            </h1>
            <p className="text-xs">
              Safely terminate your current active session on this workstation or invalidate authorizations across all devices.
            </p>
          </div>
          <div className="flex items-center">
            <button onClick={handleLogout} className="text-black text-xs whitespace-nowrap  bg-[#eeebeb] px-4 py-2 hover:opacity-80 focus:opacity-80">LOG OUT</button>
          </div>
        </section>

        <section className="flex flex-col md:flex-row gap-4 p-8 bg-[#eeebeb] mt-10 mb-10">
          <div className="flex flex-col gap-1">
            <h1 className="flex text-xl md:text-2xl font-playfair font-bold items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#b35d52"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"/></svg>
              Account Sovereignty
            </h1>
            <p className="text-xs">
              Permanently delete your profile, published essays, drafts, and membership records. Data erasure begins within 72 hours.
            </p>
          </div>
          <div className="flex items-center">
            <button 
            onClick={() => setShowDeleteModal(true)}
            className="text-white text-xs whitespace-nowrap  bg-[#b35d52] px-4 py-2 hover:opacity-80 focus:opacity-80">Delete Account</button>
          </div>
        </section>

        {showDeleteModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">

            <div className="w-full max-w-md bg-[#fbf9f8] p-6 shadow-lg">

              <h2 className="font-playfair text-2xl font-bold">
                Delete Account?
              </h2>

              <p className="mt-2 text-xs text-gray-600">
                Are you sure you want to permanently delete your account?
                This action cannot be undone.
              </p>

              <div className="mt-6 flex justify-end gap-3">

                <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-xs bg-[#eeebeb] hover:opacity-80"
                >
                 No
                </button>

                <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 text-xs text-white bg-[#b35d52] hover:opacity-80"
                >
                  Yes, Delete
                </button>

              </div>

            </div>

          </div>
        )}
      </div>
      {showToast && (
        <div className="fixed bottom-6 right-6 z-[200] bg-black text-white px-5 py-3 shadow-lg">
          <p className="text-xs">
            Account deleted successfully.
          </p>
        </div>
      )}
      <Footer/>
    </>
  );
}

export default Settings;