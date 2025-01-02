"use client";

import { apiSlice, useLogoutMutation } from "@/redux/features/auth/authApi";
import { selectUser } from "@/redux/features/auth/authSelector";
import { clearUser } from "@/redux/features/auth/authSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const user = useSelector(selectUser);
  const [logout] = useLogoutMutation();
  const router = useRouter();
  const dispatch = useDispatch();
  const isAdmin = user && user.role === "admin";
  const linkStyle =
    "block p-3 rounded-md text-lg hover:bg-gray-700 transition-all duration-300";

  const handleLogout = async () => {
    await logout();
    dispatch(clearUser());
    dispatch(apiSlice.util.resetApiState());
    router.push("/login");
  };

  return (
    <div className="w-[200px] h-[100vh] bg-[#2c3e50] flex flex-col p-4 fixed">
      <nav className="flex flex-col space-y-4 text-white">
        {" "}
        <Link href="/orders" className={linkStyle}>
          Orders
        </Link>
        {isAdmin && (
          <Link href="/users" className={linkStyle}>
            Users
          </Link>
        )}
        <Link href="/items" className={linkStyle}>
          Items
        </Link>
        <Link href="/profile" className={linkStyle}>
          Profile
        </Link>
        <button
          onClick={handleLogout}
          className="mt-6 p-3 w-full bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-all duration-300"
        >
          Log out
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
