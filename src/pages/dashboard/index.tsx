import '@src/App.css';
import NotFound from '@src/components/molecules/NotFound';
import * as localstorage from "@src/utilities/localforageUtils"
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [isAuthenticated, setIsAutheticated] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const expiredTime = await localstorage.getItem("expiredTime")

      if (expiredTime && new Date(expiredTime).getTime() > new Date().getTime()) {
        setIsAutheticated(true)
      } else {
        setIsAutheticated(false)
      }
    }

    checkAuth()
  }, [])



  return (
    <main className="App h-screen py-16 bg-gradient-to-r from-bg-blue-left to-bg-blue-right flex flex-col items-center">
      {isAuthenticated
        ? <>Dashboard</>
        : isAuthenticated === false
          ? <NotFound />
          : ""}
    </main>
  );
}