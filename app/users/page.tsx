"use client";

import { UsersTable } from "@/components/UsersTable";
import withAdminAccess from "@/hooks/widthAdminAcess";
import { useGetAllUsersQuery } from "@/redux/features/auth/authApi";

const UsersPage = () => {
  const { data: users, isLoading, refetch } = useGetAllUsersQuery();
  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>{" "}
      </div>
      <div className="flex space-x-4">
        {!isLoading && users && <UsersTable users={users} refetch={refetch} />}
      </div>
    </div>
  );
};

export default withAdminAccess(UsersPage);
