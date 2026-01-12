// import { supabase } from '../lib/supabase';
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { LogOut, User } from 'lucide-react';

// // const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
// // const API = `${BACKEND_URL}/api`;

// // const { data } = await supabase.auth.getUser();
// console.log(data.user);

// const Dashboard = ({ user: propUser }) => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(propUser);
//   const [dashboardData, setDashboardData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         const response = await axios.get(`${API}/user/dashboard`, { withCredentials: true });
//         setDashboardData(response.data);
//         setUser(response.data.user);
//       } catch (error) {
//         console.error('Failed to fetch dashboard', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDashboard();
//   }, []);

//   const handleLogout = async () => {
//     await axios.post(`${API}/auth/logout`, {}, { withCredentials: true });
//     navigate('/login');
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#020617] flex items-center justify-center">
//         <div className="text-white text-xl">Loading dashboard...</div>
//       </div>
//     );
//   }

//   const hasInvestments = dashboardData?.has_investments;
//   const investments = dashboardData?.investments;

//   return (
//     <div className="min-h-screen bg-[#020617] text-white">
//       {/* Header */}
//       <header className="bg-slate-900/50 border-b border-white/10 px-6 py-4">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <img 
//               src="https://customer-assets.emergentagent.com/job_6838dcff-eabd-4c97-8161-0cc65dcab5f9/artifacts/o2i1vpec_image.png" 
//               alt="Logo" 
//               className="h-10" 
//             />
//             <h1 className="font-manrope font-bold text-xl" data-testid="dashboard-title">Dashboard</h1>
//           </div>
//           <div className="flex items-center gap-4">
//             {user?.role === 'admin' && (
//               <button onClick={() => navigate('/admin')} className="bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-lg transition" data-testid="admin-panel-btn">
//                 Admin Panel
//               </button>
//             )}
//             <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg" data-testid="user-info">
//               <User size={20} />
//               <span>{user?.name}</span>
//             </div>
//             <button onClick={handleLogout} className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition flex items-center gap-2" data-testid="logout-btn">
//               <LogOut size={20} /> Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-6 py-12">
//         {!hasInvestments ? (
//           <div className="text-center py-20" data-testid="empty-dashboard">
//             <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 max-w-2xl mx-auto">
//               <h2 className="font-manrope font-bold text-3xl mb-4">Welcome to Your Financial Journey!</h2>
//               <p className="text-slate-300 mb-8">
//                 You haven't started your financial planning yet. Let's begin by understanding your needs.
//               </p>
//               <div className="flex gap-4 justify-center">
//                 <button onClick={() => navigate('/financial-requirements')} className="bg-emerald-500 hover:bg-emerald-600 px-8 py-3 rounded-lg font-bold transition" data-testid="fill-form-btn">
//                   Fill Financial Requirement Form
//                 </button>
//                 <button onClick={() => alert('Contact advisor feature coming soon!')} className="bg-white/10 hover:bg-white/20 px-8 py-3 rounded-lg font-bold transition border border-white/10" data-testid="contact-advisor-btn">
//                   Contact Advisor
//                 </button>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="space-y-6" data-testid="investments-dashboard">
//             <h2 className="font-manrope font-bold text-3xl mb-6">Your Investment Portfolio</h2>
            
//             {/* Summary Cards */}
//             <div className="grid md:grid-cols-3 gap-6">
//               <div className="bg-slate-900/50 border border-white/5 rounded-xl p-6 backdrop-blur-md">
//                 <p className="text-slate-400 text-sm mb-2">Total Invested</p>
//                 <p className="font-manrope font-bold text-3xl text-white">₹{investments?.invested_amount?.toLocaleString()}</p>
//               </div>
//               <div className="bg-slate-900/50 border border-white/5 rounded-xl p-6 backdrop-blur-md">
//                 <p className="text-slate-400 text-sm mb-2">Total Returns</p>
//                 <p className="font-manrope font-bold text-3xl text-emerald-400">₹{investments?.returns?.toLocaleString()}</p>
//               </div>
//               <div className="bg-slate-900/50 border border-white/5 rounded-xl p-6 backdrop-blur-md">
//                 <p className="text-slate-400 text-sm mb-2">Risk Score</p>
//                 <p className="font-manrope font-bold text-3xl text-amber-400">{investments?.risk_score}/10</p>
//               </div>
//             </div>

//             {/* Charts */}
//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="bg-slate-900/50 border border-white/5 rounded-xl p-6 backdrop-blur-md">
//                 <h3 className="font-manrope font-semibold text-xl mb-4">Investment Growth</h3>
//                 <ResponsiveContainer width="100%" height={250}>
//                   <LineChart data={[
//                     { month: 'Jan', value: investments?.invested_amount * 0.8 },
//                     { month: 'Feb', value: investments?.invested_amount * 0.85 },
//                     { month: 'Mar', value: investments?.invested_amount * 0.9 },
//                     { month: 'Apr', value: investments?.invested_amount * 0.95 },
//                     { month: 'May', value: investments?.invested_amount },
//                     { month: 'Jun', value: investments?.invested_amount + investments?.returns }
//                   ]}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
//                     <XAxis dataKey="month" stroke="#94a3b8" />
//                     <YAxis stroke="#94a3b8" />
//                     <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} />
//                     <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>

//               <div className="bg-slate-900/50 border border-white/5 rounded-xl p-6 backdrop-blur-md">
//                 <h3 className="font-manrope font-semibold text-xl mb-4">Portfolio Allocation</h3>
//                 <ResponsiveContainer width="100%" height={250}>
//                   <PieChart>
//                     <Pie
//                       data={Object.entries(investments?.portfolio || {}).map(([name, value]) => ({ name, value }))}
//                       cx="50%"
//                       cy="50%"
//                       labelLine={false}
//                       label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                       outerRadius={80}
//                       fill="#8884d8"
//                       dataKey="value"
//                     >
//                       {Object.keys(investments?.portfolio || {}).map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6'][index % 4]} />
//                       ))}
//                     </Pie>
//                     <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>

//             {/* Advisor Notes */}
//             {investments?.advisor_notes && (
//               <div className="bg-slate-900/50 border border-white/5 rounded-xl p-6 backdrop-blur-md">
//                 <h3 className="font-manrope font-semibold text-xl mb-3">Advisor Notes</h3>
//                 <p className="text-slate-300">{investments.advisor_notes}</p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        navigate('/login');
      } else {
        setUser(data.user);
        setLoading(false);
      }
    });
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ color: 'white', padding: 40 }}>
      <h1>Dashboard</h1>
      <p>Email: {user.email}</p>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
