import '@src/App.css';
import NotFound from '@src/components/molecules/NotFound';
import * as localstorage from "@src/utilities/localforageUtils"
import { useEffect, useState } from 'react';
import { DashboardLayout } from '../layout';

export default function DashboardServices() {
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
                  <div className='md:py-24 md:px-16 md:w-2/3 flex flex-col gap-8'>
                    <h1 className='text-2xl sm:text-xl text-left font-bold'>Generate post ideas and captions in seconds</h1>
                    <div className='flex flex-col gap-4 md:flex-row md:gap-8'>
                      <div className='flex flex-col text-left bg-white p-4 rounded-md shadow-primary-button cursor-pointer active:shadow-none'>
                        <h3 className='text-xl font-bold'>Start from scratch</h3>
                        <p className='text-text-grey'>Generate new captions to engage, delight, or sell</p>
                      </div>
                      <div className='flex flex-col text-left bg-white p-4 rounded-md shadow-primary-button cursor-pointer active:shadow-none'>
                        <h3 className='text-xl font-bold'>Get inspired</h3>
                        <p className='text-text-grey'>Generate post ideas and captions for a topic</p>
                      </div>
                    </div>
                  </div>
                </DashboardLayout>
              </div>
              : ""}
          </main>
      }
    </>
  );
}