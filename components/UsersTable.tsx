"use client";

import { useUpdateUserProfileMutation } from "@/redux/features/auth/authApi";
import { User } from "@/redux/features/auth/authSlice";
import { useState } from "react";

export type Item = {
  id: string;
  name: string;
  description: string;
  price: number;
};

interface UsersTableProps {
  users: User[];
  refetch: () => void;
}

export const UsersTable: React.FC<UsersTableProps> = ({ users, refetch }) => {
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editedItem, setEditedItem] = useState<User | null>(null);

  const [updateUserProfile] = useUpdateUserProfileMutation();

  const handleSaveEdit = async () => {
    if (editedItem) {
      try {
        await updateUserProfile({ formData: editedItem, id: editedItem.id });
        refetch();
        setEditingItemId(null);
        setEditedItem(null);
      } catch (err) {
        alert("Failed update user");
        console.error(err);
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: keyof User
  ) => {
    if (editedItem) {
      const value = e.target.value;
      setEditedItem({
        ...editedItem,
        [field]: value,
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingItemId(null);
    setEditedItem(null);
  };
  const handleEdit = (user: User) => {
    setEditingItemId(user.id);
    setEditedItem(user);
  };
  return (
    <div className="w-full p-4 box-border">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">
              Email
            </th>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">
              First Name
            </th>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">
              Last Name
            </th>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">
              Role
            </th>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border border-gray-300 px-4 py-2">
                {" "}
                {editingItemId === user.id ? (
                  <input
                    type="text"
                    value={editedItem?.email || ""}
                    onChange={(e) => handleInputChange(e, "email")}
                    className="border px-2 py-1"
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {editingItemId === user.id ? (
                  <input
                    type="text"
                    value={editedItem?.first_name || ""}
                    onChange={(e) => handleInputChange(e, "first_name")}
                    className="border px-2 py-1"
                  />
                ) : (
                  user.first_name
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {editingItemId === user.id ? (
                  <input
                    type="text"
                    value={editedItem?.last_name || "none"}
                    onChange={(e) => handleInputChange(e, "last_name")}
                    className="border px-2 py-1"
                  />
                ) : (
                  `${user.last_name}`
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {editingItemId === user.id ? (
                  <select
                    value={editedItem?.role || "user"}
                    onChange={(e) => handleInputChange(e, "role")}
                    className="border px-2 py-1"
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                ) : (
                  `${user.role}`
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {editingItemId === user.id ? (
                  <>
                    <button
                      onClick={handleSaveEdit}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 ml-2"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
