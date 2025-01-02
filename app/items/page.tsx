"use client";
import { Item, ItemsTable } from "@/components/ItemsTable";
import { useGetItemsQuery } from "@/redux/features/items/itemApi";
import { useCreateOrderMutation } from "@/redux/features/orders/orderApi";
import { useState } from "react";

const ItemsPage = () => {
  const [searchName, setSearchName] = useState("");
  const [selectedItems, setSelectedItems] = useState<
    { item: Item; quantity: number }[]
  >([]);
  const [createOrder] = useCreateOrderMutation();
  const [page, setPage] = useState(1);
  const {
    data: items,
    isLoading,
    refetch,
  } = useGetItemsQuery({ name: searchName, limit: 10, page: page });

  const handleCreateOrder = async () => {
    if (selectedItems.length < 1) {
      alert("No item selected!");
      return;
    }

    try {
      const orderData = selectedItems.reduce((acc, { item, quantity }) => {
        acc[item.id] = quantity;
        return acc;
      }, {} as Record<string, number>);

      await createOrder({ items: orderData }).unwrap();
      setSelectedItems([]);
      alert("Order placed successfully!");
    } catch (err) {
      alert("Failed to create order");
      console.error(err);
    }
  };

  const renderPagination = () => {
    if (!items || items.meta.total_pages === 1) return null;

    const pages = [];
    for (let i = 1; i <= items.meta.total_pages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`px-3 py-2 mx-1 rounded ${
            page === i ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          {i}
        </button>
      );
    }

    return <div className="flex justify-center mt-4">{pages}</div>;
  };

  const handleClearCart = () => {
    setSelectedItems([]);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
    setPage(1);
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    setSelectedItems((prev) => {
      return prev.map(({ item, quantity }) =>
        item.id === itemId
          ? { item, quantity: newQuantity }
          : { item, quantity }
      );
    });
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search items..."
        value={searchName}
        onChange={handleSearchChange}
        className="border border-gray-300 px-4 py-2 mb-4 w-full"
      />
      <div className="flex space-x-4">
        <div className="w-[70%]">
          {!isLoading && items ? (
            <>
              <ItemsTable
                items={items.items}
                setSelectedItem={setSelectedItems}
                refetch={refetch}
              />
              {renderPagination()}
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="w-[30%] border border-gray-300 rounded p-4">
          <h2 className="text-xl font-bold mb-4">Cart</h2>
          {selectedItems.length > 0 ? (
            selectedItems.map(({ item, quantity }) => (
              <div key={item.id} className="mt-4">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-500 mb-2">{item.description}</p>
                <p className="font-bold mb-4">Price: ${item.price}</p>
                <p className="font-bold mb-4">
                  Total: ${item.price * quantity}
                </p>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    onChange={(e) =>
                      handleQuantityChange(item.id, +e.target.value)
                    }
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No items in the cart</p>
          )}

          {selectedItems.length > 0 && (
            <div className="mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
                onClick={handleCreateOrder}
              >
                Make Order
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-4 w-full"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemsPage;
