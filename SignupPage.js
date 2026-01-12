import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

// import axios from 'axios';

// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
// const API = `${BACKEND_URL}/api`;

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', admin_code: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  const { name, email, password } = formData;

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name
        }
      }
    });

    if (error) {
      setError(error.message);
      return;
    }

    alert('Signup successful. Please check your email to verify your account.');
    navigate('/login');
  } catch (err) {
    setError('Signup failed. Please try again.');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-6 py-12">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-8 max-w-md w-full" data-testid="signup-card">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        
        <h2 className="font-manrope font-bold text-3xl text-white text-center mb-2" data-testid="signup-title">Create Account</h2>
        <p className="text-slate-400 text-center mb-6">Join us and start managing your finances</p>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg mb-4" data-testid="signup-error">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="text-slate-300 text-sm font-medium mb-2 block">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full bg-white/5 border border-white/10 text-white placeholder:text-slate-500 rounded-lg px-4 py-3 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              data-testid="name-input"
            />
          </div>
          
          <div>
            <label className="text-slate-300 text-sm font-medium mb-2 block">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-white/5 border border-white/10 text-white placeholder:text-slate-500 rounded-lg px-4 py-3 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              data-testid="email-input"
            />
          </div>
          
          <div>
            <label className="text-slate-300 text-sm font-medium mb-2 block">Password</label>
            <input
              type="password"
              placeholder="Create a password (min 6 characters)"
              className="w-full bg-white/5 border border-white/10 text-white placeholder:text-slate-500 rounded-lg px-4 py-3 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
              minLength={6}
              data-testid="password-input"
            />
          </div>
          
          <div>
            <label className="text-slate-300 text-sm font-medium mb-2 block">Admin Code (Optional)</label>
            <input
              type="text"
              placeholder="Enter admin code if you have one"
              className="w-full bg-white/5 border border-white/10 text-white placeholder:text-slate-500 rounded-lg px-4 py-3 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition"
              value={formData.admin_code}
              onChange={(e) => setFormData({...formData, admin_code: e.target.value})}
              data-testid="admin-code-input"
            />
            <p className="text-slate-500 text-xs mt-1">Leave empty for regular user account</p>
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold rounded-lg px-6 py-3 transition shadow-lg shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed" 
            data-testid="signup-submit-btn"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-slate-400 mt-6">
          Already have an account?{' '}
          <button 
            onClick={() => navigate('/login')} 
            className="text-emerald-400 hover:text-emerald-300 font-semibold transition" 
            data-testid="login-link"
          >
            Login
          </button>
        </p>
        
        <button
          onClick={() => navigate('/')}
          className="w-full mt-4 text-slate-400 hover:text-white transition text-sm"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
