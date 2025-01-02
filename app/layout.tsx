"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import Sidebar from "@/components/SideBar";
import { usePathname } from "next/navigation";
import ProtectedRoute from "@/hooks/protectedRoute";
import GuestRoute from "@/hooks/guestRoute";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAuthPage = pathname.includes("login") || pathname.includes("signup");
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          {isAuthPage ? (
            <GuestRoute>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                  backgroundColor: "#f4f4f4",
                }}
              >
                {children}
              </div>
            </GuestRoute>
          ) : (
            <ProtectedRoute>
              <div style={{ display: "flex" }}>
                <Sidebar />
                <main style={{ marginLeft: "200px", padding: "20px", flex: 1 }}>
                  {children}
                </main>
              </div>
            </ProtectedRoute>
          )}
        </Provider>
      </body>
    </html>
  );
}
