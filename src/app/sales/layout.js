"use client";
import {
  ShoppingCartOutlined,
  UserOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Button, Menu, Popover, message, Spin } from "antd";
import { Header } from "antd/es/layout/layout";
import { useRouter } from "next/navigation";
import { useSignOut, useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slice/userSlice";

export default function SalesLayout({ children }) {
  const [signOut, loadingSignOut, errorSignOut] = useSignOut(auth);
  const router = useRouter();
  const [user, loadingAuth, errorAuth] = useAuthState(auth);
  const [role, setRole] = useState("");
  const [loadingRole, setLoadingRole] = useState(false);
  const [errorRole, setErrorRole] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loadingAuth && !user) {
      router.push("/sign-in");
    }
  }, [user, loadingAuth, router]);

  useEffect(() => {
    const validateZoho = async () => {
      if (!user?.email) return;
      setLoadingRole(true);
      setErrorRole(null);
      try {
        const queryParams = new URLSearchParams({
          reportName: "All_Users",
          criteria: `(Email == "${user.email}")`,
        });
        const response = await fetch(`/api/zoho?${queryParams}`, {
          method: "GET",
        });
        const result = await response.json();
        if (result.records.code != 3000) return;
        dispatch(setUser(result.records.data[0]));
        const userRole =
          result.records.code === 3000
            ? result.records.data[0]?.Role || ""
            : "";
        setRole(userRole);
      } catch (error) {
        console.error("Error Fetching Role:", error);
        setErrorRole(error.message || "Failed to fetch user role.");
      } finally {
        setLoadingRole(false);
      }
    };

    validateZoho();
  }, [user]);
  let items = [];
  if (role === "Manager") {
    items = [
      {
        key: "0",
        label: "Create Order",
        onClick: () => router.push("/sales/create-order"),
      },
      {
        key: "1",
        icon: <ShoppingCartOutlined />,
        label: "Sales",
        children: [
          {
            key: "2",
            label: "Sales Order Report",
            onClick: () => router.push("/sales/sales-order-report"),
          },
          {
            key: "3",
            label: "Sales Order Items",
            onClick: () => router.push("/sales/sales-order-items"),
          },
          {
            key: "4",
            label: "Pending Sales Order Items",
            onClick: () => router.push("/sales/pending-order-items"),
          },
          {
            key: "5",
            label: "Ordered Items",
            onClick: () => router.push("/sales/ordered-items"),
          },
          {
            key: "6",
            label: "Available Items",
            onClick: () => router.push("/sales/available-items"),
          },
        ],
      },
      {
        key: "7",
        label: "Master",
        children: [
          {
            key: "7.1",
            label: <Link href="/sales/products">All Products</Link>,
          },
          {
            key: "7.2",
            label: <Link href="/sales/customers">All Customers</Link>,
          },
        ],
      },
    ];
  } else {
    items = [
      {
        key: "0",
        label: "Create Order",
        onClick: () => router.push("/sales/create-order"),
      },
      {
        key: "1",
        label: <Link href="/sales/my-orders">Sales Order Items</Link>,
      },
    ];
  }

  const handleSignOut = async () => {
    try {
      await signOut();
      message.success("Signed out successfully!");
      sessionStorage.removeItem("user");
      router.push("/sign-in");
    } catch (err) {
      message.error("Sign out failed. Please try again.");
    }
  };

  // Show loading spinner during authentication or role validation
  if (loadingAuth || loadingRole) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );
  }

  // Handle authentication errors
  if (errorAuth) {
    return (
      <div className="h-screen flex flex-col gap-4 justify-center items-center">
        <div className="text-xl text-red-500">Authentication Error</div>
        <p>{errorAuth.message}</p>
        <Button onClick={handleSignOut} disabled={loadingSignOut}>
          Sign Out
        </Button>
      </div>
    );
  }

  // Handle role errors
  if (errorRole) {
    return (
      <div className="h-screen flex flex-col gap-4 justify-center items-center">
        <div className="text-xl text-red-500">Role Validation Error</div>
        <p>{errorRole}</p>
        <Button onClick={handleSignOut} disabled={loadingSignOut}>
          Sign Out
        </Button>
      </div>
    );
  }

  // Handle unauthorized access
  if (!role) {
    return (
      <div className="h-screen flex flex-col gap-4 justify-center items-center">
        <div className="text-2xl text-red-500">
          You do not have permission to access this application
        </div>
        <p className="text-lg">Please contact the application owner</p>
        <Button onClick={handleSignOut} disabled={loadingSignOut}>
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <Header className="flex items-center" style={{ padding: "0" }}>
        <Link className="text-white text-center px-3" href="/">
          OM
        </Link>
        <Menu items={items} mode="horizontal" theme="dark" className="w-full" />
        <div className="text-white me-5">
          <Popover
            title="Account"
            content={
              <div className="text-center">
                <p className="p-2 bg-slate-100">
                  {auth.currentUser?.email || ""}
                </p>
                <Button onClick={handleSignOut} disabled={loadingSignOut}>
                  {loadingSignOut ? "Signing Out..." : "Sign Out"}
                </Button>
              </div>
            }
          >
            <Button aria-label="Account">
              <UserOutlined />
            </Button>
          </Popover>
        </div>
      </Header>
      <div className="flex-1">{children}</div>
    </div>
  );
}
