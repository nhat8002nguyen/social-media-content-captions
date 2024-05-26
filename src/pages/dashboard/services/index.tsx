import '@src/App.css';
import useAuth from '@src/hooks/useAuth';
import { Link, Navigate } from 'react-router-dom';
import { DashboardLayout } from '../layout';

export default function DashboardServices() {
  const [isAuthenticated] = useAuth()

  return (
    <>
      {
        isAuthenticated === null ? "" : isAuthenticated === false ? <Navigate to={"/login"} replace /> :
          <main className="App h-screen bg-gradient-to-r from-bg-blue-left to-bg-blue-right">
            <div>
              <DashboardLayout>
                <div className='md:py-24 md:px-16 lg:w-full flex flex-col gap-8'>
                  <h1 className='text-2xl sm:text-xl text-left font-bold'>Generate post ideas and captions in seconds</h1>
                  <div className='flex flex-col gap-4 lg:flex-row md:gap-8'>
                    <Link to={"/dashboard/services/from-scratch"}>
                      <div className='flex flex-col text-left bg-white p-4 rounded-md shadow-primary-button cursor-pointer active:shadow-none'>
                        <h3 className='text-xl font-bold'>Start from scratch</h3>
                        <p className='text-text-grey'>Generate new captions to engage, delight, or sell</p>
                      </div>
                    </Link>
                    <Link to={"/dashboard/services/get-inspired"}>
                      <div className='flex flex-col text-left bg-white p-4 rounded-md shadow-primary-button cursor-pointer active:shadow-none'>
                        <h3 className='text-xl font-bold'>Get inspired</h3>
                        <p className='text-text-grey'>Generate post ideas and captions for a topic</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </DashboardLayout>
            </div>
          </main>
      }
    </>
  );
}