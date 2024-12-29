"use client";
import Link from "next/link";
export default function Navbar() {
  return (
    <div className="bg-violet-800 px-[7%] justify-center text-white flex gap-4 items-center py-4">
      <Link href={"/user/login"}>Login</Link>
      <Link href={"/user/signup"}>Signup</Link>
      <Link href={"/profile/Id"}>Profile</Link>
    </div>
  );
}
