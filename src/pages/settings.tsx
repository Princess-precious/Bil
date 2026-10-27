import Footer from "../components/footer";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { deleteAccount } from "../lib/api/users";
import { useAuth } from "../../src/useAuth";
import { AuthService } from "../lib/Auth/AuthService";

function Settings() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showToast] = useState(false);
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

  return (
    <>
      <Navbar />

      {/* Content column: 16px side padding on mobile (matches nav), capped width on larger screens */}
      <div className="mx-auto mt-[80px] w-full max-w-2xl px-4 font-hanken">
        <section className="flex flex-col gap-2 py-8">
          <p className="flex items-center gap-1.5 text-xs font-bold text-[#b35d52]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#b35d52]"></span>
            Account & Security
          </p>
          <h1 className="font-playfair text-3xl font-bold md:text-4xl">
            Account Settings
          </h1>
          <p className="text-sm text-gray-700">
            Manage your Bil member credentials, session authentication, and
            account sovereignty.
          </p>
        </section>

        <div className="flex flex-col gap-4 pb-10">
          {/* Password & Security */}
          <section className="flex flex-col gap-5 border border-black/5 bg-white p-5 md:flex-row md:items-center md:justify-between md:p-8">
            <div className="flex flex-col gap-2">
              <h2 className="flex items-center gap-2 font-playfair text-xl font-bold md:text-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  fill="#1f1f1f"
                  className="shrink-0"
                >
                  <path d="M480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q97-30 162-118.5T718-480H480v-315l-240 90v207q0 7 2 18h238v316Z" />
                </svg>
                Password & Security
              </h2>
              <p className="text-sm text-gray-700">
                Update your login passphrase or configure two-factor
                authentication to secure your editorial drafts.
              </p>
            </div>
            <Link
              to="/change-password"
              className="w-full whitespace-nowrap bg-black px-5 py-3 text-center text-sm text-white hover:opacity-80 focus:opacity-80 md:w-auto md:shrink-0"
            >
              Change Password
            </Link>
          </section>

          {/* Session Management */}
          <section className="flex flex-col gap-5 border border-black/5 bg-white p-5 md:flex-row md:items-center md:justify-between md:p-8">
            <div className="flex flex-col gap-2">
              <h2 className="flex items-center gap-2 font-playfair text-xl font-bold md:text-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  fill="#1f1f1f"
                  className="shrink-0"
                >
                  <path d="M480-120q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-480q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-840v80q-117 0-198.5 81.5T200-480q0 117 81.5 198.5T480-200v80Zm160-160-56-57 103-103H360v-80h327L584-624l56-56 200 200-200 200Z" />
                </svg>
                Session Management
              </h2>
              <p className="text-sm text-gray-700">
                Safely terminate your current active session on this workstation
                or invalidate authorizations across all devices.
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full whitespace-nowrap border border-black bg-transparent px-5 py-3 text-sm text-black hover:bg-black hover:text-white focus:bg-black focus:text-white md:w-auto md:shrink-0"
            >
              Log out
            </button>
          </section>

          {/* Account Sovereignty (danger zone) */}
          <section className="flex flex-col gap-5 border border-[#b35d52]/40 bg-[#b35d52]/5 p-5 md:flex-row md:items-center md:justify-between md:p-8">
            <div className="flex flex-col gap-2">
              <h2 className="flex items-center gap-2 font-playfair text-xl font-bold text-[#8f433a] md:text-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  fill="#b35d52"
                  className="shrink-0"
                >
                  <path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z" />
                </svg>
                Account Sovereignty
              </h2>
              <p className="text-sm text-gray-700">
                Permanently delete your profile, published essays, drafts, and
                membership records. Data erasure begins within 72 hours.
              </p>
            </div>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="w-full whitespace-nowrap bg-[#b35d52] px-5 py-3 text-sm text-white hover:opacity-80 focus:opacity-80 md:w-auto md:shrink-0"
            >
              Delete Account
            </button>
          </section>
        </div>

        {showDeleteModal && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4"
          >
            <div className="w-full max-w-md bg-[#fbf9f8] p-6 shadow-lg">
              <h2 className="font-playfair text-2xl font-bold">
                Delete Account?
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                Are you sure you want to permanently delete your account? This
                action cannot be undone.
              </p>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="bg-[#eeebeb] px-5 py-3 text-sm hover:opacity-80"
                >
                  No
                </button>

                <button
                  onClick={handleDeleteAccount}
                  className="bg-[#b35d52] px-5 py-3 text-sm text-white hover:opacity-80"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {showToast && (
        <div className="fixed bottom-6 right-6 z-[200] bg-black px-5 py-3 text-white shadow-lg">
          <p className="text-xs">Account deleted successfully.</p>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Settings;