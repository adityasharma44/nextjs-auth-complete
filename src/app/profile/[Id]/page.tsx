"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function page() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    userName: "Na",
    email: "Na",
    _id: "Na",
  });

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/me");
      console.log(response?.data?.data);
      setUserData(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log(response);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 p-4 text-center text-white">
          <h2 className="text-3xl font-semibold">User Details</h2>
        </div>

        {/* User Information */}
        <div className="p-6 space-y-4">
          <div className="flex items-center space-x-4">
            <div className="text-gray-600 font-semibold">ID:</div>
            <div className="text-gray-800 text-lg">{userData._id}</div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-gray-600 font-semibold">Name:</div>
            <div className="text-gray-800 text-lg">{userData.userName}</div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-gray-600 font-semibold">Email:</div>
            <div className="text-gray-800 text-lg">{userData.email}</div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => handleLogout()}
            className="my-3 bg-violet-600 text-white rounded-lg px-3 py-1 text-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
