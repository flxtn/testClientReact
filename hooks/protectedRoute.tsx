// components/ProtectedRoute.tsx
"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { setUser, clearUser } from "@/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useGetCurrentUserQuery } from "@/redux/features/auth/authApi";
import { Loader } from "@/components/Loader";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { data: user, isLoading, isError } = useGetCurrentUserQuery();

  useEffect(() => {
    if (isLoading) return;
    if (isError || !user) {
      dispatch(clearUser());
      router.push("/login");
    } else {
      dispatch(setUser(user));
    }
  }, [isLoading, isError, user, dispatch, router]);

  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
