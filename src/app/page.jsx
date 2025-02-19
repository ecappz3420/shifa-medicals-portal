"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
export default function HomePage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const zcUser = useSelector((state) => state.user);

  useEffect(() => {
    if (loading) return;
    if (user) {
      if (zcUser?.Role === "Admin" || zcUser?.Role === "Manager") {
        router.push("/sales/sales-order-report");
      } else {
        router.push("/sales/create-order");
      }
    } else {
      router.push("/sign-in");
    }
  }, [user, loading, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return null;
}
