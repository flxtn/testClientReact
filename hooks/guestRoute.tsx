"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetCurrentUserQuery } from "@/redux/features/auth/authApi";
import { Loader } from "@/components/Loader";

interface GuestRouteProps {
  children: React.ReactNode;
}

const GuestRoute: React.FC<GuestRouteProps> = ({ children }) => {
  const router = useRouter();

  const { data: user, isLoading } = useGetCurrentUserQuery();

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/orders");
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return <Loader />;
  }

  return !user ? <>{children}</> : null;
};

export default GuestRoute;
