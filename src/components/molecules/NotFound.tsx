import React from 'react';
import { Link } from 'react-router-dom';
import { PrimaryButton } from '../atoms';

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600 mb-4">Page Not Found</p>
        <Link
          to="/login"
        >
          <PrimaryButton text='Go to login page' />
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
