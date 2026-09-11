'use client';

import React, { useState } from 'react';
import api from '../api';

export default function AdminLogin({ onAdminLoginSuccess, onCancel }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await api.login({ email, password });
      if (res.token) {
        if (res.data?.role !== 'admin') {
          throw new Error('Access denied. This portal is restricted to Store Administrators only.');
        }
        localStorage.setItem('tanabana_token', res.token);
        onAdminLoginSuccess(res.data);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Invalid admin credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#FAF8F5] min-h-[80vh] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden border border-[#EAE6DF]">
        
        {/* Header */}
        <div className="bg-[#0F382C] text-white p-6 text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#D4AF37] text-[#0F382C] font-bold text-[10px] uppercase rounded-full tracking-widest mb-1">
            <span className="material-symbols-outlined text-[14px]">security</span>
            <span>Restricted Access</span>
          </div>
          <h1 className="font-serif text-2xl font-semibold">
            Tanabana Admin Portal
          </h1>
          <p className="text-xs text-gray-300 font-light">
            Sign in to access sales analytics, suit inventory &amp; store settings.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              <span>{errorMsg}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0F382C] mb-1">
              Admin Email
            </label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your admin email" 
              className="w-full px-3.5 py-2.5 border border-[#EAE6DF] rounded text-sm focus:outline-none focus:border-[#0F382C]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0F382C] mb-1">
              Secret Admin Password
            </label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••" 
              className="w-full px-3.5 py-2.5 border border-[#EAE6DF] rounded text-sm focus:outline-none focus:border-[#0F382C]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#0F382C] text-white font-bold text-xs uppercase tracking-widest rounded hover:bg-[#1A4B3C] transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <span>Authenticating Admin...</span>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">vpn_key</span>
                <span>Enter Admin Dashboard</span>
              </>
            )}
          </button>

          <div className="pt-3 border-t border-[#F0ECE6] flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={onCancel}
              className="text-gray-500 hover:text-[#0F382C] font-semibold underline cursor-pointer"
            >
              ← Back to Storefront
            </button>
            <span className="text-[10px] text-gray-400 font-mono">Route: /?admin=login</span>
          </div>

        </form>

      </div>
    </div>
  );
}
