"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function page() {
  const [token, setToken] = useState("");
  const verifyEmail = async () => {
    try {
        const response = await axios.post("/api/users/verifyemail",{token})
        console.log(response)
    } catch (error:any) {
        console.log("error",error)
    }
  };

  useEffect(() => {
    const searchPath = window.location.search;
    const tokenData = searchPath.split("=")[1];
    if (tokenData) {
      setToken(tokenData);
    }
  }, [window.location]);
  return (
    <div className="flex h-[90vh] flex-col justify-center items-center">
      <h1 className="text-2xl">Verify Your Email</h1>
      <button
        onClick={verifyEmail}
        className="bg-violet-600 text-white rounded-md px-3 py-1 my-3 text-lg"
      >
        Click Here
      </button>
    </div>
  );
}
