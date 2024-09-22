"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function UserProfile() {
  const router = useRouter();
  const [data, setData] = useState({
    username: "Loading...",
    email: "Loading...",
  });

  // Logout Function
  const logout = async () => {
    try {
      await axios.get("/api/user/logout");
      toast.success("Logout successful! Redirecting...", { duration: 1500 });
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error("Error logging out:", error);
    }
  };

  // Fetch User Details
  const getUserDetail = async () => {
    try {
      const response = await axios.get("/api/user/me");
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    getUserDetail();
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <Toaster />

      <button
        onClick={logout}
        className="absolute top-6 right-6 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition duration-300"
      >
        Logout
      </button>

      <div className="bg-gray-800 shadow-xl rounded-2xl p-10 max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold mb-4">User Profile</h1>
        <hr className="border-gray-600 mb-6" />

        <div className="space-y-4">
          <p className="text-xl font-light">
            <span className="font-semibold">Name:</span> {data.username}
          </p>
          <p className="text-xl font-light">
            <span className="font-semibold">Email:</span> {data.email}
          </p>
        </div>

        <button
          onClick={getUserDetail}
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full font-semibold transition duration-300 shadow-lg"
        >
          Refresh User Details
        </button>
      </div>

      <footer className="absolute bottom-4 text-gray-500 text-sm">
        © 2024 YourAppName. All rights reserved.
      </footer>
    </div>
  );
}
