import { Navigate } from 'react-router-dom';
import './App.css';
import useAuth from './hooks/useAuth';

function App() {
  const { isAuthenticated } = useAuth()
  return (
    <main className="App h-screen py-16 bg-gradient-to-r from-bg-blue-left to-bg-blue-right flex flex-col items-center">
      {isAuthenticated === null
        ? ""
        : isAuthenticated
          ? <Navigate to={"/dashboard/services"} />
          : <Navigate to={"/login"} />}
    </main>
  );
}

export default App;
