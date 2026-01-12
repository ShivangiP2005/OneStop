// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { ArrowLeft } from 'lucide-react';

// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
// const API = `${BACKEND_URL}/api`;

// const AdminPanel = () => {
//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [investmentForm, setInvestmentForm] = useState({
//     invested_amount: 0,
//     returns: 0,
//     risk_score: 5,
//     portfolio: { 'Equity': 40, 'Debt': 30, 'Gold': 20, 'Mutual Funds': 10 },
//     advisor_notes: ''
//   });

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get(`${API}/admin/users`, { withCredentials: true });
//       setUsers(response.data.users);
//     } catch (error) {
//       console.error('Failed to fetch users', error);
//       navigate('/dashboard');
//     }
//   };

//   const handleUpdateInvestment = async (e) => {
//     e.preventDefault();
//     if (!selectedUser) return;

//     try {
//       await axios.put(`${API}/admin/user/${selectedUser.user_id}/investments`, investmentForm, { withCredentials: true });
//       alert('Investment data updated successfully!');
//       setSelectedUser(null);
//     } catch (error) {
//       alert('Failed to update investment data');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#020617] text-white">
//       <header className="bg-slate-900/50 border-b border-white/10 px-6 py-4">
//         <div className="max-w-7xl mx-auto flex items-center gap-4">
//           <button onClick={() => navigate('/dashboard')} className="bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition" data-testid="back-btn">
//             <ArrowLeft size={20} />
//           </button>
//           <h1 className="font-manrope font-bold text-2xl" data-testid="admin-panel-title">Admin Panel</h1>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-6 py-12">
//         <h2 className="font-manrope font-bold text-2xl mb-6">All Users</h2>
        
//         <div className="grid gap-4 mb-8">
//           {users.map((user) => (
//             <div key={user.user_id} className="bg-slate-900/50 border border-white/5 rounded-xl p-6 flex items-center justify-between" data-testid={`user-${user.user_id}`}>
//               <div>
//                 <p className="font-manrope font-semibold text-lg">{user.name}</p>
//                 <p className="text-slate-400 text-sm">{user.email}</p>
//                 <p className="text-slate-500 text-xs mt-1">Role: {user.role} | Free call used: {user.is_free_call_used ? 'Yes' : 'No'}</p>
//               </div>
//               <button onClick={() => { setSelectedUser(user); }} className="bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-lg transition" data-testid={`edit-${user.user_id}`}>
//                 Update Investments
//               </button>
//             </div>
//           ))}
//         </div>

//         {selectedUser && (
//           <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedUser(null)}>
//             <div className="bg-slate-900 rounded-2xl p-8 max-w-2xl w-full border border-white/10" onClick={(e) => e.stopPropagation()} data-testid="investment-form-modal">
//               <h3 className="font-manrope font-bold text-2xl mb-6">Update Investment for {selectedUser.name}</h3>
//               <form onSubmit={handleUpdateInvestment} className="space-y-4">
//                 <div>
//                   <label className="text-slate-400 text-sm">Invested Amount (₹)</label>
//                   <input
//                     type="number"
//                     className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3 focus:border-emerald-500/50 focus:outline-none"
//                     value={investmentForm.invested_amount}
//                     onChange={(e) => setInvestmentForm({...investmentForm, invested_amount: parseFloat(e.target.value)})}
//                     required
//                     data-testid="invested-amount-input"
//                   />
//                 </div>
//                 <div>
//                   <label className="text-slate-400 text-sm">Returns (₹)</label>
//                   <input
//                     type="number"
//                     className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3 focus:border-emerald-500/50 focus:outline-none"
//                     value={investmentForm.returns}
//                     onChange={(e) => setInvestmentForm({...investmentForm, returns: parseFloat(e.target.value)})}
//                     required
//                     data-testid="returns-input"
//                   />
//                 </div>
//                 <div>
//                   <label className="text-slate-400 text-sm">Risk Score (1-10)</label>
//                   <input
//                     type="number"
//                     min="1"
//                     max="10"
//                     className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3 focus:border-emerald-500/50 focus:outline-none"
//                     value={investmentForm.risk_score}
//                     onChange={(e) => setInvestmentForm({...investmentForm, risk_score: parseInt(e.target.value)})}
//                     required
//                     data-testid="risk-score-input"
//                   />
//                 </div>
//                 <div>
//                   <label className="text-slate-400 text-sm">Advisor Notes</label>
//                   <textarea
//                     rows="4"
//                     className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3 focus:border-emerald-500/50 focus:outline-none"
//                     value={investmentForm.advisor_notes}
//                     onChange={(e) => setInvestmentForm({...investmentForm, advisor_notes: e.target.value})}
//                     data-testid="advisor-notes-input"
//                   ></textarea>
//                 </div>
//                 <div className="flex gap-4">
//                   <button type="submit" className="flex-1 bg-emerald-500 hover:bg-emerald-600 px-6 py-3 rounded-lg font-bold transition" data-testid="submit-investment-btn">
//                     Update Investment
//                   </button>
//                   <button type="button" onClick={() => setSelectedUser(null)} className="flex-1 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg font-bold transition" data-testid="cancel-btn">
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;


export default function AdminPanel() {
  return <div>Admin panel disabled for now</div>;
}
