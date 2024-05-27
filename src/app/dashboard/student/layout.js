'use client';

import DefaultLayout from "@/layout/DefaultLayout";
import { Toaster } from "react-hot-toast";
import { StudentDashBoard } from "@/common/Data";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/redux/common/useAuth";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";


export default function RootLayout({ children }) {

  const authState = useAuth();
  const router = useRouter();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const checkAuth = async () => {
      if (!user?.isLoggedIn) {
        router.push('/');
      }
    };
    if (user !== null) {
      checkAuth();
    }
  }, [user, router]);

  useEffect(() => {
    if (authState.userType !== null) {
      setUser(authState);
    }
  }, [authState]);


  return (
    <>
      {user !== null && user?.isLoggedIn ? (
        <DefaultLayout user={user} paths={StudentDashBoard}>
          {children}
        </DefaultLayout>
      ):   <Link href={'/auth/login'} className="w-full h-screen cursor-pointer bg-white flex justify-center items-center text-xl font-bold">
      Go to Login
    </Link>}
      <Toaster />
    </>
  );
}
