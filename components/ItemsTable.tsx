"use client";

import { selectUser } from "@/redux/features/auth/authSelector";
import { useUpdateItemMutation } from "@/redux/features/items/itemApi";
import { useState } from "react";
import { useSelector } from "react-redux";

export type Item = {
  id: string;
  name: string;
  description: string;
  price: number;
};

interface ItemsTableProps {
  items: Item[];
  setSelectedItem: React.Dispatch<
    React.SetStateAction<{ item: Item; quantity: number }[]>
  >;
  refetch: () => void;
}

export const ItemsTable: React.FC<ItemsTableProps> = ({
  items,
  setSelectedItem,
  refetch,
}) => {
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editedItem, setEditedItem] = useState<Item | null>(null);
  const user = useSelector(selectUser);
  const isAdmin = user && user.role === "admin";
  const [updateItem] = useUpdateItemMutation();
  const handleAddToCart = (item: Item) => {
    setSelectedItem((prev) => {
      const existingItem = prev.find((i) => i.item.id === item.id);
      if (existingItem) {
        return prev.map((i) =>
          i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const handleSaveEdit = async () => {
    if (editedItem) {
      try {
        await updateItem({ editedItem: editedItem, id: editedItem.id });
        refetch();
        setEditingItemId(null);
        setEditedItem(null);
      } catch (err) {
        alert("Failed update item");
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Item
  ) => {
    if (editedItem) {
      setEditedItem({
        ...editedItem,
        [field]:
          field === "price" ? parseFloat(e.target.value) : e.target.value,
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingItemId(null);
    setEditedItem(null);
  };
  const handleEdit = (item: Item) => {
    setEditingItemId(item.id);
    setEditedItem(item);
  };
  return (
    <div className="w-full p-4 box-border">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">
              Name
            </th>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">
              Description
            </th>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">
              Price
            </th>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="border border-gray-300 px-4 py-2">
                {" "}
                {editingItemId === item.id ? (
                  <input
                    type="text"
                    value={editedItem?.name || ""}
                    onChange={(e) => handleInputChange(e, "name")}
                    className="border px-2 py-1"
                  />
                ) : (
                  item.name
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {editingItemId === item.id ? (
                  <input
                    type="text"
                    value={editedItem?.description || ""}
                    onChange={(e) => handleInputChange(e, "description")}
                    className="border px-2 py-1"
                  />
                ) : (
                  item.description
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {editingItemId === item.id ? (
                  <input
                    type="number"
                    value={editedItem?.price || 0}
                    onChange={(e) => handleInputChange(e, "price")}
                    className="border px-2 py-1"
                  />
                ) : (
                  `$${item.price}`
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {editingItemId === item.id ? (
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
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add
                    </button>
                    {isAdmin && (
                      <button
                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 ml-2"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                    )}
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
