"use client";

import { useState } from "react";
import { selectUser } from "@/redux/features/auth/authSelector";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserProfileMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";

const ProfilePage = () => {
  const user = useSelector(selectUser);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: user?.email || "",
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
  });

  const [updateProfile, { isLoading }] = useUpdateUserProfileMutation();

  if (!user) return <p>No user found</p>;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const updatedUser = await updateProfile({
        formData: formData,
        id: user.id,
      }).unwrap();
      dispatch(setUser(updatedUser));
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="p-8 max-w-lg mx-auto bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="space-y-4">
        {isEditing ? (
          <>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
            </div>
            <button
              onClick={handleSave}
              className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 mt-4 ml-4"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-lg font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">First Name</p>
              <p className="text-lg font-medium">{user.first_name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Last Name</p>
              <p className="text-lg font-medium">{user.last_name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Role</p>
              <p className="text-lg font-medium capitalize">{user.role}</p>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
            >
              Edit Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
