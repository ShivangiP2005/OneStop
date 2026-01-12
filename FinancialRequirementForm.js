import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const FinancialRequirementForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    services: [],
    notes: ''
  });

  const services = [
    'Financial Planning',
    'Investment Planning',
    'Insurance',
    'Retirement Planning',
    'Tax Saving'
  ];

  const toggleService = (service) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/financial-requirements`, formData, { withCredentials: true });
      alert('Requirements submitted successfully! Our advisor will contact you soon.');
      navigate('/dashboard');
    } catch (error) {
      alert('Failed to submit requirements');
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <header className="bg-slate-900/50 border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition" data-testid="back-btn">
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-manrope font-bold text-2xl" data-testid="form-title">Financial Requirements</h1>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <h2 className="font-manrope font-bold text-3xl mb-6">What would you like to discuss?</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-slate-300 mb-4 block">Select Services (check all that apply):</label>
              <div className="space-y-3">
                {services.map((service) => (
                  <label key={service} className="flex items-center gap-3 bg-white/5 hover:bg-white/10 px-4 py-3 rounded-lg cursor-pointer transition" data-testid={`service-${service.toLowerCase().replace(/\s+/g, '-')}`}>
                    <input
                      type="checkbox"
                      checked={formData.services.includes(service)}
                      onChange={() => toggleService(service)}
                      className="w-5 h-5 accent-emerald-500"
                    />
                    <span className="text-white">{service}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-slate-300 mb-2 block">Additional Notes:</label>
              <textarea
                rows="6"
                className="w-full bg-white/5 border border-white/10 text-white placeholder:text-slate-500 rounded-lg px-4 py-3 focus:border-emerald-500/50 focus:ring-emerald-500/20 focus:outline-none"
                placeholder="Tell us more about your financial goals and any specific concerns..."
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                data-testid="notes-textarea"
              ></textarea>
            </div>

            <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg px-6 py-4 transition" data-testid="submit-btn">
              Submit Requirements
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FinancialRequirementForm;