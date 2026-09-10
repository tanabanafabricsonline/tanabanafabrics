import React, { useState } from 'react';
import api from '../api';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      let res;
      if (isLogin) {
        res = await api.login({ email: formData.email, password: formData.password });
      } else {
        res = await api.register(formData);
      }

      if (res.token) {
        localStorage.setItem('tanabana_token', res.token);
        onLoginSuccess(res.data);
        onClose();
      }
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden border border-[#EAE6DF]">
        
        {/* Header */}
        <div className="bg-[#0F382C] text-white p-5 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl font-semibold">
              {isLogin ? 'Sign In To Tanabana' : 'Create Customer Account'}
            </h2>
            <p className="text-xs text-gray-300 mt-0.5">
              {isLogin ? 'Access your orders & saved preferences' : 'Join for exclusive unstitched suit releases'}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-300 hover:text-white text-2xl font-bold p-1 cursor-pointer"
          >
            &times;
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Registration Extra Fields */}
          {!isLogin && (
            <>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0F382C] mb-1">
                  Full Name
                </label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange}
                  required
                  placeholder="e.g. Ayesha Khan" 
                  className="w-full px-3 py-2 border border-[#EAE6DF] rounded text-sm focus:outline-none focus:border-[#0F382C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0F382C] mb-1">
                  Mobile Number (Pakistan)
                </label>
                <input 
                  type="text" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange}
                  placeholder="e.g. +92 300 1234567" 
                  className="w-full px-3 py-2 border border-[#EAE6DF] rounded text-sm focus:outline-none focus:border-[#0F382C]"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0F382C] mb-1">
              Email Address
            </label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange}
              required
              placeholder="e.g. admin@tanabana.com" 
              className="w-full px-3 py-2 border border-[#EAE6DF] rounded text-sm focus:outline-none focus:border-[#0F382C]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0F382C] mb-1">
              Password
            </label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange}
              required
              placeholder="••••••••" 
              className="w-full px-3 py-2 border border-[#EAE6DF] rounded text-sm focus:outline-none focus:border-[#0F382C]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#0F382C] text-white font-bold text-xs uppercase tracking-widest rounded hover:bg-[#1A4B3C] transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
            )}
          </button>

          {/* Toggle between Login and Register */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => { setIsLogin(!isLogin); setErrorMsg(null); }}
              className="text-xs text-[#B8860B] font-bold hover:underline cursor-pointer uppercase tracking-wider"
            >
              {isLogin ? "Don't have an account? Register Now" : "Already registered? Sign In"}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
