// pages/dashboard.tsx
import { useState } from "react";
import Link from "next/link";
import { useLogout } from "@/api/auth/login/api";

export default function Layout({ children }: any) {
  const [menuOpen, setMenuOpen] = useState(false);

  const { mutate } = useLogout();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    mutate();
  };

  return (
    <div className="min-h-screen min-w-screen md:w-full bg-gray-100 flex">
      {/* Sidebar */}
      <div
        className={`fixed z-10 inset-y-0 left-0 bg-blue-600 text-white w-64 transform ${
          menuOpen ? "translate-x-0" : "-translate-x-3/4"
        } md:translate-x-0 transition-transform duration-300 ease-in-out shadow-lg`}
      >
        <div className="p-4 text-xl font-bold">My Dashboard</div>
        <nav className="mt-4 space-y-2">
          <Link
            href="/dashboard"
            className="block py-2 px-4 hover:bg-blue-500 rounded"
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/class"
            className="block py-2 px-4 hover:bg-blue-500 rounded"
          >
            Class
          </Link>
          <Link href="" className="block py-2 px-4 hover:bg-blue-500 rounded">
            Materials
          </Link>
          <Link href="#" className="block py-2 px-4 hover:bg-blue-500 rounded">
            Modules
          </Link>
          <Link href="#" className="block py-2 px-4 hover:bg-blue-500 rounded">
            Settings
          </Link>
          <button
            onClick={handleLogout}
            className="block py-2 w-full px-4 text-start hover:bg-blue-500 rounded"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Header */}
        <header className="bg-white shadow p-4 pl-24 md:pl-4 flex justify-between items-center">
          <button
            onClick={toggleMenu}
            className={`md:hidden bg-white shadow-lg rounded-full p-2 text-blue-600 absolute z-20 ${
              menuOpen ? "left-60" : "left-12"
            } transition-all duration-500 ease-in-out`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="hidden md:flex space-x-4 items-center">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Search
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 pl-20 md:pl-8 md:pr-8">{children}</main>
      </div>
    </div>
  );
}
