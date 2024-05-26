import { faCog, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as localstorage from "@src/utilities/localforageUtils";
import React, { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface Category {
  name: string;
  icon: typeof faCog;
  pathname: string
}

interface DashboardLayoutProps {
  children?: ReactNode
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const naviate = useNavigate()
  const location = useLocation()

  const categories: Category[] = [
    { name: 'Services', icon: faCog, pathname: "/dashboard/services" },
    { name: 'Profile', icon: faUser, pathname: "/dashboard/profile" },
    { name: 'Logout', icon: faUser, pathname: "/login" }
  ];

  const handleClick = (category: Category) => {
    if (category.name === "Logout") {
      localstorage.removeItem("expiredTime")
    }
    naviate(category.pathname)
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/5 bg-white text-text-black">
        <div className='px-8 py-8'>
          <h1 className='text-left text-3xl text-primary-color-l'>Skipli <span className='text-text-black'>AI</span></h1>
        </div>
        <ul className="space-y-2 p-4">
          {categories.map((category) => (
            <li
              key={category.name}
              onClick={() => handleClick(category)}
              className={`flex items-center p-2 rounded cursor-pointer transition-colors ${location.pathname.includes(category.pathname) ? 'bg-bg-blue-left' : 'hover:bg-bg-blue-left'}`}
            >
              <FontAwesomeIcon icon={category.icon} className="mr-2" />
              <span>{category.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 p-4">
        {children}
      </div>
    </div>
  );
};
