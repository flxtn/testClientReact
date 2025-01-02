"use client";

import { apiSlice, useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await login({ user: { email, password } }).unwrap();
      dispatch(setUser(response.user));
      dispatch(apiSlice.util.resetApiState());
      router.push("/orders");
    } catch (err) {
      alert("Login failed.");
      console.error(err);
    }
  };
  return (
    <div className="max-w-[400px] p-14 m-auto bg-gray-300 mt-40 shadow-lg">
      <h1 className="flex justify-center mb-4 font-bold text-gray-800">
        Login
      </h1>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "15px" }} className="flex flex-col gap-2">
          <label className="text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }} className="flex flex-col gap-2">
          <label className="text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>
        <button
          type="submit"
          className="my-4 py-2 w-full bg-neutral-500 bg-blue-600 hover:bg-blue-700 text-white"
        >
          Login
        </button>
        <p className="mt-4 text-center text-gray-600">
          Dont have an account?
          <Link href="/signup" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
