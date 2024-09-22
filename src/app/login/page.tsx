"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/user/login", user);
      toast.success("Login successful! Redirecting to profile...", {
        duration: 2000,
      });
      setTimeout(() => {
        router.push("/profile");
      }, 1000);
    } catch (error) {
      toast.error("Login failed! Please try again.", {
        duration: 2000,
      });
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <Toaster />
      <div className="bg-gray-900 p-10 rounded-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-gray-100 mb-8">
          Log In
        </h1>
        <form onSubmit={onLogin}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-400"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-2 block w-full px-4 py-3 border border-gray-700 bg-gray-800 text-gray-200 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
              placeholder="you@example.com"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-lg font-medium text-gray-400"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-2 block w-full px-4 py-3 border border-gray-700 bg-gray-800 text-gray-200 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
              placeholder="••••••••"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:translate-y-1 hover:scale-105 transition-all duration-300 text-lg font-semibold"
          >
            Log In
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-400">
            create account?{" "}
            <Link href="/signup" className="text-indigo-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
