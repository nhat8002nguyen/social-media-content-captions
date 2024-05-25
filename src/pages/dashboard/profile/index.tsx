import '@src/App.css';
import NotFound from '@src/components/molecules/NotFound';
import * as localstorage from "@src/utilities/localforageUtils"
import { useEffect, useState } from 'react';
import { DashboardLayout } from '../layout';

export default function DashboardProfile() {
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
    <>
      {
        // isAuthenticated === false ? <NotFound></NotFound> :
        false ? <NotFound></NotFound> :
          <main className="App h-screen bg-gradient-to-r from-bg-blue-left to-bg-blue-right">
            {/* {isAuthenticated */}
            {true
              ? <div>
                <DashboardLayout>

                </DashboardLayout>
              </div>
              : ""}
          </main>
      }
    </>

  );
}