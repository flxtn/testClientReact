"use client";

import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirmed] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [register] = useRegisterMutation();
  const router = useRouter();

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await register({
        user: {
          email,
          password,
          password_confirmed: passwordConfirm,
          first_name: firstName,
          last_name: lastName,
        },
      }).unwrap();
      alert("Registered successfully!");
      router.push("/login");
    } catch (err) {
      alert("Register failed.");
      console.error(err);
    }
  };
  return (
    <div className="max-w-[400px] p-14 m-auto bg-gray-300 mt-40 shadow-lg">
      <h1 className="flex justify-center mb-4 font-bold text-gray-800">
        Register
      </h1>
      <form onSubmit={handleRegister}>
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
        <div style={{ marginBottom: "15px" }} className="flex flex-col gap-2">
          <label className="text-gray-700">Password confirmation</label>
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirmed(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }} className="flex flex-col gap-2">
          <label className="text-gray-700">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }} className="flex flex-col gap-2">
          <label className="text-gray-700">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>
        <button
          type="submit"
          className="my-4 py-2 w-full  bg-blue-600 hover:bg-blue-700 text-white"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
