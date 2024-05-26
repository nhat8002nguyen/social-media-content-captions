import { faFacebook, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@src/App.css';
import useAuth from '@src/hooks/useAuth';
import { DashboardLayout } from '@src/pages/dashboard/layout';
import { Link, Navigate } from 'react-router-dom';

interface Social {
  name: string
  icon: typeof faFacebook
  color: string
  pathname: string
}

export default function FromScratchService() {
  const [isAuthenticated] = useAuth()

  const socials: Social[] = [
    {
      name: "Facebook Post",
      icon: faFacebook,
      color: "text-facebook",
      pathname: "/dashboard/services/from-scratch/fb"
    },
    {
      name: "Instagram Post",
      icon: faInstagram,
      color: "text-instagram-100",
      pathname: "/dashboard/services/from-scratch/ig"
    },
    {
      name: "Twitter Post",
      icon: faXTwitter,
      color: "text-twitter",
      pathname: "/dashboard/services/from-scratch/tw"
    }
  ]

  return (
    <>
      {
        isAuthenticated === null ? "" : isAuthenticated === false ? <Navigate to={"/login"} replace /> :
          <main className="App h-screen bg-gradient-to-r from-bg-blue-left to-bg-blue-right">
            <div>
              <DashboardLayout>
                <div className='md:py-24 md:px-16 md:w-full flex flex-col gap-8'>
                  <h1 className='text-2xl sm:text-xl text-left font-bold'>Generate unique captions from scratch</h1>
                  <div className='text-left flex flex-col gap-2'>
                    <p>Choose the type of post you want a caption for, and let Skipli
                      Al write it for you</p>
                    <p>What kind of post do you want a caption for?</p>
                  </div>
                  <div className='flex flex-col lg:flex-row gap-4'>
                    {socials.map(s =>
                      <Link to={s.pathname} key={s.name}>
                        <div className='flex gap-2 text-left items-center bg-white p-2 rounded-md shadow-primary-button cursor-pointer active:shadow-none'>
                          <FontAwesomeIcon icon={s.icon} className={`w-8 h-8 ${s.color}`} />
                          <h3 className='text-lg font-bold'>{s.name}</h3>
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              </DashboardLayout>
            </div>
          </main>
      }
    </>
  );
}