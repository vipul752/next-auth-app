"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
// Shimmer component for loading effect
const Shimmer = () => (
  <div className="animate-pulse flex flex-col space-y-6">
    <div className="bg-gray-700 h-10 rounded w-3/4"></div>
    <div className="bg-gray-700 h-10 rounded w-full"></div>
    <div className="bg-gray-700 h-10 rounded w-full"></div>
    <div className="bg-gray-700 h-12 rounded w-full"></div>
  </div>
);

export default function SignupPage() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const onSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/user/signup", user);
      toast.success("Signup successful! Redirecting to login...", {
        duration: 2000,
      });
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error) {
      toast.error("Signup failed! Please try again.", {
        duration: 2000,
      });
      console.error("Error during signup:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="bg-gray-900 p-10 rounded-lg shadow-2xl max-w-md w-full">
          <Shimmer />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <Toaster />
      <div className="bg-gray-900 p-10 rounded-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-gray-100 mb-8">
          Create an Account
        </h1>
        <form>
          <div className="mb-6">
            <label
              htmlFor="username"
              className="block text-lg font-medium text-gray-400"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="mt-2 block w-full px-4 py-3 border border-gray-700 bg-gray-800 text-gray-200 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
              placeholder="Alex"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              required
            />
          </div>
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
              value={user.email}
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
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
            />
          </div>
          <button
            onClick={onSignup}
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:translate-y-1 hover:scale-105 transition-all duration-300 text-lg font-semibold"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
