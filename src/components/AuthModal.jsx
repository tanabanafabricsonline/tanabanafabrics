'use client';

import React, { useState } from 'react';
import api from '../api';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [regStep, setRegStep] = useState('form'); // 'form' or 'otp'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [otpInput, setOtpInput] = useState('');
  const [otpNotice, setOtpNotice] = useState(null);
  const [devOtpPreview, setDevOtpPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setErrorMsg('Please fill in your name, email address, and password.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setOtpNotice(null);

    try {
      const res = await api.sendOTP(formData.email);
      setRegStep('otp');
      setOtpNotice(res.message || `A 6-digit verification code has been sent to ${formData.email}.`);
      if (res.otpPreview) {
        setDevOtpPreview(res.otpPreview);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Failed to send verification email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otpInput || otpInput.trim().length < 6) {
      setErrorMsg('Please enter the full 6-digit verification code sent to your email.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await api.verifyOTPRegister({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        otp: otpInput.trim()
      });

      if (res.token) {
        localStorage.setItem('tanabana_token', res.token);
        onLoginSuccess(res.data);
        // Reset modal state
        setRegStep('form');
        setOtpInput('');
        onClose();
      }
    } catch (err) {
      setErrorMsg(err.message || 'Invalid verification code. Please check your email and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const normEmail = (formData.email || '').toLowerCase().trim();
    if (normEmail === 'admin@tanabana.com') {
      setLoading(false);
      setErrorMsg('Admin accounts cannot log in through the Customer Portal. Please use the Admin Login page (/admin-login).');
      return;
    }

    try {
      const res = await api.login({ email: formData.email, password: formData.password });
      if (res.token) {
        if (res.data?.role === 'admin') {
          throw new Error('Admin accounts cannot log in through the Customer Portal. Please use the Admin Login page (/admin-login).');
        }
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

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setRegStep('form');
    setErrorMsg(null);
    setOtpNotice(null);
    setOtpInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden border border-[#EAE6DF]">
        
        {/* Header */}
        <div className="bg-[#0F382C] text-white p-5 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl font-semibold">
              {isLogin ? 'Sign In To Tanabana' : (regStep === 'otp' ? 'Verify Your Email OTP' : 'Create Customer Account')}
            </h2>
            <p className="text-xs text-gray-300 mt-0.5">
              {isLogin 
                ? 'Access your orders & saved preferences' 
                : (regStep === 'otp' ? `Code sent via Nodemailer to ${formData.email}` : 'Join for exclusive unstitched suit releases')}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-300 hover:text-white text-2xl font-bold p-1 cursor-pointer"
          >
            &times;
          </button>
        </div>

        {/* Modal Form Body */}
        <div className="p-6 space-y-4">
          
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* LOGIN FORM */}
          {isLogin && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
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
                  placeholder="e.g. customer@gmail.com" 
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
                {loading ? <span>Authenticating...</span> : <span>Sign In</span>}
              </button>
            </form>
          )}

          {/* REGISTER STEP 1: Details */}
          {!isLogin && regStep === 'form' && (
            <form onSubmit={handleSendOTP} className="space-y-4">
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

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0F382C] mb-1">
                  Email Address (For OTP Verification)
                </label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange}
                  required
                  placeholder="e.g. ayesha@gmail.com" 
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
                  <span>Sending Verification Email...</span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <span>Send Verification Code</span>
                    <span className="material-symbols-outlined text-[16px]">mail</span>
                  </span>
                )}
              </button>
            </form>
          )}

          {/* REGISTER STEP 2: OTP Entry */}
          {!isLogin && regStep === 'otp' && (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 text-amber-900 p-3 rounded text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <span className="material-symbols-outlined text-amber-700 text-[18px]">mark_email_unread</span>
                  <span>Email Verification Code Sent!</span>
                </div>
                <p className="text-[11px] text-amber-800">
                  {otpNotice || `We sent a 6-digit OTP code to ${formData.email}. Please check your inbox or spam folder.`}
                </p>
                {devOtpPreview && (
                  <button
                    type="button"
                    onClick={() => setOtpInput(devOtpPreview)}
                    className="mt-1 bg-[#0F382C] text-white text-[10px] font-bold uppercase px-2 py-1 rounded cursor-pointer hover:bg-[#B8860B]"
                  >
                    ⚡ Demo Auto-fill OTP Code ({devOtpPreview})
                  </button>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0F382C] mb-1">
                  Enter 6-Digit OTP Code
                </label>
                <input 
                  type="text" 
                  maxLength={6}
                  value={otpInput} 
                  onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                  required
                  autoFocus
                  placeholder="e.g. 849201" 
                  className="w-full px-3 py-2.5 border-2 border-[#D4AF37] rounded text-center text-xl font-bold font-mono tracking-[8px] text-[#0F382C] focus:outline-none bg-[#FAF8F5]"
                />
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#0F382C] text-white font-bold text-xs uppercase tracking-widest rounded hover:bg-[#B8860B] transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <span>Verifying Code...</span>
                  ) : (
                    <span>Verify Code &amp; Create Account</span>
                  )}
                </button>

                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    type="button"
                    onClick={() => setRegStep('form')}
                    className="text-gray-500 hover:text-black font-semibold cursor-pointer"
                  >
                    ← Edit Details
                  </button>
                  <button
                    type="button"
                    onClick={handleSendOTP}
                    disabled={loading}
                    className="text-[#B8860B] font-bold hover:underline cursor-pointer uppercase tracking-wider text-[11px]"
                  >
                    Resend Code 🔄
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Toggle between Login and Register */}
          <div className="text-center pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={toggleAuthMode}
              className="text-xs text-[#B8860B] font-bold hover:underline cursor-pointer uppercase tracking-wider"
            >
              {isLogin ? "Don't have an account? Register Now" : "Already registered? Sign In"}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

