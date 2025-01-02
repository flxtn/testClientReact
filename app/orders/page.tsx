"use client";
import { Item } from "@/components/ItemsTable";
import { Loader } from "@/components/Loader";
import { useGetOrdersQuery } from "@/redux/features/orders/orderApi";
import { useState } from "react";

export type OrderDescription = {
  id: number;
  order_id: number;
  item_id: number;
  quantity: number;
  created_at: string;
  updated_at: string;
  item: Item;
};

export type Order = {
  id: number;
  user_id: number;
  amount: string;
  created_at: string;
  updated_at: string;
  orders_descriptions: OrderDescription[];
};

const OrdersPage = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  if (isLoading) return <Loader />;
  if (error) return <p>Failed to load orders</p>;

  const toggleOrderDetails = (orderId: number) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">My Orders</h1>
      <ul className="space-y-4">
        {orders && orders.length < 1 && <div>No orders</div>}
        {orders?.map((order: Order) => (
          <li key={order.id} className="border border-gray-300 rounded p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">Order ID: {order.id}</p>
                <p>Total Amount: ${order.amount}</p>
              </div>
              <button
                className="text-blue-500 underline"
                onClick={() => toggleOrderDetails(order.id)}
              >
                {expandedOrderId === order.id ? "Hide Details" : "Show Details"}
              </button>
            </div>

            {expandedOrderId === order.id && (
              <div className="mt-4">
                <h2 className="text-lg font-bold mb-2">Order Items</h2>
                <ul className="space-y-2">
                  {order.orders_descriptions.map(
                    (od: OrderDescription, index: number) => (
                      <li key={index} className="border-b pb-2">
                        <p>Name: {od.item.name}</p>
                        <p>Price: ${od.item.price}</p>
                        <p>Quantity: {od.quantity}</p>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersPage;
