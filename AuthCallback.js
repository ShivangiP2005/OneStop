import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const processSession = async () => {
      const hash = location.hash;
      const sessionIdMatch = hash.match(/session_id=([^&]+)/);
      
      if (!sessionIdMatch) {
        navigate('/login');
        return;
      }

      const sessionId = sessionIdMatch[1];

      try {
        await axios.post(`${API}/auth/session`, 
          { session_id: sessionId },
          { withCredentials: true }
        );

        const userResponse = await axios.get(`${API}/auth/me`, { withCredentials: true });
        navigate('/dashboard', { state: { user: userResponse.data }, replace: true });
      } catch (error) {
        console.error('Session processing failed:', error);
        navigate('/login', { replace: true });
      }
    };

    processSession();
  }, [location, navigate]);

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center">
      <div className="text-white text-xl">Processing authentication...</div>
    </div>
  );
};

export default AuthCallback;