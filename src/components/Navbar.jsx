"use client";
import { useClerk } from "@clerk/nextjs";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

export default function Navbar({ children }) {
  const { signOut, user } = useClerk();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [loadingVisible, setLoadingVisible] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setLoadingVisible(true);

    await signOut();

    setLoadingVisible(false);
    setIsLoggingOut(false);
  };
  const username = user?.username || user?.id;

  return (
    <div className="flex min-h-screen">
      <aside className="hidden lg:flex lg:flex-col bg-base-100 text-white w-60 h-screen sticky top-0 p-4">
        <nav className="flex flex-col space-y-4">
          <br />
          <Link
            href="/"
            className="text-xl items-center font-bold normal-case"
            style={{
              backgroundImage: `linear-gradient(
                90deg,
                oklch(var(--s)) 4%,
                color-mix(in oklch, oklch(var(--s)), oklch(var(--er))) 22%,
                oklch(var(--p)) 45%,
                color-mix(in oklch, oklch(var(--p)), oklch(var(--a))) 67%,
                oklch(var(--a)) 100%
              )`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          >
            Snap Space
          </Link>

          <br />
          <ul className="space-y-2">
            <li>
              <Link href="/" className="flex items-center text-lg gap-2">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.07926 0.222253C7.31275 -0.007434 7.6873 -0.007434 7.92079 0.222253L14.6708 6.86227C14.907 7.09465 14.9101 7.47453 14.6778 7.71076C14.4454 7.947 14.0655 7.95012 13.8293 7.71773L13 6.90201V12.5C13 12.7761 12.7762 13 12.5 13H2.50002C2.22388 13 2.00002 12.7761 2.00002 12.5V6.90201L1.17079 7.71773C0.934558 7.95012 0.554672 7.947 0.32229 7.71076C0.0899079 7.47453 0.0930283 7.09465 0.32926 6.86227L7.07926 0.222253ZM7.50002 1.49163L12 5.91831V12H10V8.49999C10 8.22385 9.77617 7.99999 9.50002 7.99999H6.50002C6.22388 7.99999 6.00002 8.22385 6.00002 8.49999V12H3.00002V5.91831L7.50002 1.49163ZM7.00002 12H9.00002V8.99999H7.00002V12Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
                Home
              </Link>
            </li>
            <li>
              <Link href="/posts" className="flex items-center text-lg gap-2">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.69667 0.0403541C8.90859 0.131038 9.03106 0.354857 8.99316 0.582235L8.0902 6.00001H12.5C12.6893 6.00001 12.8625 6.10701 12.9472 6.27641C13.0319 6.4458 13.0136 6.6485 12.8999 6.80001L6.89997 14.8C6.76167 14.9844 6.51521 15.0503 6.30328 14.9597C6.09135 14.869 5.96888 14.6452 6.00678 14.4178L6.90974 9H2.49999C2.31061 9 2.13748 8.893 2.05278 8.72361C1.96809 8.55422 1.98636 8.35151 2.09999 8.2L8.09997 0.200038C8.23828 0.0156255 8.48474 -0.0503301 8.69667 0.0403541ZM3.49999 8.00001H7.49997C7.64695 8.00001 7.78648 8.06467 7.88148 8.17682C7.97648 8.28896 8.01733 8.43723 7.99317 8.5822L7.33027 12.5596L11.5 7.00001H7.49997C7.353 7.00001 7.21347 6.93534 7.11846 6.8232C7.02346 6.71105 6.98261 6.56279 7.00678 6.41781L7.66968 2.44042L3.49999 8.00001Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
                Posts
              </Link>
            </li>
            <li>
              <Link
                href={user ? `/user/${username}` : "/user"}
                className="flex items-center text-lg gap-2"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2377 14.0749 12.5001 14.0749C12.7624 14.0749 12.9751 13.8623 12.9751 13.5999C12.9751 11.72 12.4779 10.2794 11.496 9.31167C10.7245 8.55134 9.70041 8.12901 8.50637 7.98351C10.0189 7.54738 11.125 6.15288 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM7.5 2.875C8.32843 2.875 9.07563 3.62219 9.07563 4.5C9.07563 5.37781 8.32843 6.125 7.5 6.125C6.67157 6.125 5.92437 5.37781 5.92437 4.5C5.92437 3.62219 6.67157 2.875 7.5 2.875Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
                {/* {user ? "Profile" : "Sign Up / Sign In"} */}
                Profile
              </Link>
            </li>
            {user && (
              <li>
                <Link
                  href="/createProfile"
                  className="flex items-center text-lg gap-2"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 1C7.22386 1 7 1.22386 7 1.5V6.5H1.5C1.22386 6.5 1 6.72386 1 7C1 7.27614 1.22386 7.5 1.5 7.5H7V12.5C7 12.7761 7.22386 13 7.5 13C7.77614 13 8 12.7761 8 12.5V7.5H13C13.2761 7.5 13.5 7.27614 13.5 7C13.5 6.72386 13.2761 6.5 13 6.5H8V1.5C8 1.22386 7.77614 1 7.5 1Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    />
                  </svg>
                  Create / Update Profile
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-50 bg-base-100 shadow-md">
          <div className="container mx-auto flex items-center justify-between p-2">
            <div className="flex items-center space-x-4 lg:hidden">
              <Link
                href="/"
                className="text-xl font-bold normal-case"
                style={{
                  backgroundImage: `linear-gradient(
                      90deg,
                      oklch(var(--s)) 4%,
                      color-mix(in oklch, oklch(var(--s)), oklch(var(--er))) 22%,
                      oklch(var(--p)) 45%,
                      color-mix(in oklch, oklch(var(--p)), oklch(var(--a))) 67%,
                      oklch(var(--a)) 100%
                    )`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  fontSize: "2rem",
                  fontWeight: "bold",
                }}
              >
                Snap Space
              </Link>
            </div>

            <div className="flex justify-center flex-1">
              <Link href="/" className="normal-case">
                <Image
                  src="/blogoSnapSpace.PNG"
                  alt="Logo"
                  width={90}
                  height={100}
                  className="object-contain"
                />
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <button
                className="btn btn-ghost btn-circle"
                aria-label="Search for content"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>

              <button
                className="btn btn-ghost btn-circle"
                aria-label="Notifications"
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="badge badge-xs badge-primary indicator-item"></span>
                </div>
              </button>
              {user && !loadingVisible && (
                <button
                  className={`btn btn-error mt-4 ${!user ? "disabled" : ""}`}
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                >
                  {loadingVisible && (
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="w-4 h-4 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5C100 78.285 78.285 100 50 100C21.715 100 0 78.285 0 50.5C0 22.999 21.715 1.185 50 1.185C66.826 1.185 81.888 8.773 91.583 21.338L72.125 25.127C66.803 20.292 58.928 16.949 50 16.949C34.932 16.949 22.675 29.237 22.675 44.25C22.675 59.563 33.067 68.562 49.543 68.562H70.084C70.325 69.472 70.562 70.412 70.562 71.373C70.562 75.954 66.363 79 61.339 79H50.472C31.851 79 16.947 64.07 16.947 45.1C16.947 26.463 31.932 12 50 12C60.136 12 69.687 15.422 77.164 20.283L89.346 15.203C78.813 6.138 65.673 0 50 0C22.925 0 0 22.736 0 50.5C0 78.285 22.925 101 50 101C78.285 101 101 78.285 101 50.5H100Z"
                        fill="currentFill"
                      />
                    </svg>
                  )}
                  Logout
                </button>
              )}
              {loadingVisible && <p>Loading...</p>}
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
