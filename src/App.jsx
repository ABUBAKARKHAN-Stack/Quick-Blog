// App.js
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './components/Header/Header';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout, login } from './features/authSlice';
import Spanner from './components/Spanner'; // Ensure correct import path
import authService from './appwrite/auth';
import { Footer } from './components';

function App() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleUserLogin = async () => {
      try {
        // Fetch current user details from authService
        const user = await authService.getCurrentUser();

        if (user) {
          // Dispatch the login action with user data only
          dispatch(login(user));
        } else {
          dispatch(logout());
          navigate('/');
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    handleUserLogin();
  }, [dispatch, navigate]);

  if (loading) return <Spanner />;

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
