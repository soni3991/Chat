import Link from "next/link";
import { createClient } from "../../supabase/server";
import { Button } from "./ui/button";
import { UserCircle, RefreshCw, MessageSquare, Users } from "lucide-react";
import UserProfile from "./user-profile";

export default async function Navbar() {
  const supabase = createClient();

  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  return (
    <nav className="w-full border-b border-gray-200 bg-white py-3">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link
            href="/"
            prefetch
            className="text-xl font-bold text-blue-600 flex items-center"
          >
            <span className="mr-2 text-2xl">₹¥</span>
            <span>RMB-INR Exchange</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="#"
            className="text-gray-600 hover:text-blue-600 font-medium"
          >
            Exchange Rates
          </Link>
          <Link
            href="#"
            className="text-gray-600 hover:text-blue-600 font-medium"
          >
            How It Works
          </Link>
          <Link
            href="#"
            className="text-gray-600 hover:text-blue-600 font-medium"
          >
            Referral Program
          </Link>
          <Link
            href="#"
            className="text-gray-600 hover:text-blue-600 font-medium"
          >
            Support
          </Link>
        </div>

        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
              >
                Dashboard
              </Link>
              <UserProfile />
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
