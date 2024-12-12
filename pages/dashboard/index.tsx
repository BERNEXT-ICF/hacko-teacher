// pages/dashboard.tsx
import { useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 bg-blue-600 text-white w-64 transform ${menuOpen ? "translate-x-0" : "-translate-x-3/4"} md:translate-x-0 transition-transform duration-300 ease-in-out shadow-lg`}>
        <div className="p-4 text-xl font-bold">My Dashboard</div>
        <nav className="mt-4 space-y-2">
          <Link href="/dashboard" className="block py-2 px-4 hover:bg-blue-500 rounded">Dashboard</Link>
          <Link href="/dashboard/class" className="block py-2 px-4 hover:bg-blue-500 rounded">Class</Link>
          <Link href="" className="block py-2 px-4 hover:bg-blue-500 rounded">Materials</Link>
          <Link href="#" className="block py-2 px-4 hover:bg-blue-500 rounded">Modules</Link>
          <Link href="#" className="block py-2 px-4 hover:bg-blue-500 rounded">Settings</Link>
          <Link href="#" className="block py-2 px-4 hover:bg-blue-500 rounded">Logout</Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Header */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
        <button onClick={toggleMenu} className={`md:hidden bg-white rounded-full p-2 text-blue-600 absolute ${menuOpen ? "left-60" : "left-12"} transition-all duration-500 ease-in-out`}>
        <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="hidden md:flex space-x-4 items-center">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700">Search</button>
          </div>
        </header>

        {/* Content */}
        <main className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded shadow-md hover:shadow-lg">
              <h2 className="text-lg font-semibold">Card Title</h2>
              <p className="mt-2 text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
            <div className="bg-white p-6 rounded shadow-md hover:shadow-lg">
              <h2 className="text-lg font-semibold">Card Title</h2>
              <p className="mt-2 text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
            <div className="bg-white p-6 rounded shadow-md hover:shadow-lg">
              <h2 className="text-lg font-semibold">Card Title</h2>
              <p className="mt-2 text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
