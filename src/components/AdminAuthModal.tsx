import React, { useState } from 'react';
import { X, ShieldCheck, Lock, KeyRound, Check, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { verifyAdminPasscode, setAdminPasscode, getAdminPasscode } from '../utils/portfolioStorage';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: () => void;
  isAdmin: boolean;
  onLogoutAdmin: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onAuthenticated,
  isAdmin,
  onLogoutAdmin,
}) => {
  if (!isOpen) return null;

  const [pinInput, setPinInput] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Change PIN mode inside modal when already admin
  const [isChangingPin, setIsChangingPin] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [confirmNewPin, setConfirmNewPin] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (verifyAdminPasscode(pinInput)) {
      setSuccess('Admin rights verified successfully! Unlocking editor controls...');
      setTimeout(() => {
        onAuthenticated();
        setSuccess('');
        setPinInput('');
        onClose();
      }, 800);
    } else {
      setError('Incorrect Admin Passcode. Please try again (Default PIN: 2025).');
    }
  };

  const handleChangePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!newPin.trim() || newPin.length < 4) {
      setError('New PIN must be at least 4 characters long.');
      return;
    }
    if (newPin !== confirmNewPin) {
      setError('New PIN and confirmation PIN do not match.');
      return;
    }

    setAdminPasscode(newPin);
    setSuccess('Admin Security PIN updated successfully!');
    setTimeout(() => {
      setSuccess('');
      setIsChangingPin(false);
      setNewPin('');
      setConfirmNewPin('');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-[#FAF8F5] w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-[#E0D8CE] relative">
        
        {/* Top Banner */}
        <div className="bg-[#1A1A18] text-[#FAF8F5] p-6 text-center relative border-b border-[#33312E]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 text-[#A69F94] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-full bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center mx-auto mb-3">
            <ShieldCheck className="w-6 h-6 text-[#C5A059]" />
          </div>

          <h3 className="font-serif text-xl font-medium text-white">
            {isAdmin ? 'Admin Security Controls' : 'Admin Security Access'}
          </h3>
          <p className="text-xs text-[#A69F94] mt-1">
            {isAdmin 
              ? 'You currently have full Admin Rights to add, edit, or delete projects.'
              : 'Enter your security passcode to unlock full work editing and management features.'}
          </p>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-5 text-xs text-[#1A1A18]">
          
          {error && (
            <div className="p-3 bg-[#FEF2F2] border border-[#FCA5A5] text-[#991B1B] rounded-xl flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-[#DC2626] shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3 bg-[#F0FDF4] border border-[#86EFAC] text-[#166534] rounded-xl flex items-center space-x-2">
              <Check className="w-4 h-4 text-[#16A34A] shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {isAdmin ? (
            /* Logged in Admin options */
            <div className="space-y-4 text-center">
              <div className="p-4 bg-[#F2ECE4] rounded-xl border border-[#E8E2D9] space-y-2">
                <div className="inline-flex items-center space-x-1.5 bg-[#166534] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  <Check className="w-3 h-3" />
                  <span>Admin Mode Active</span>
                </div>
                <p className="text-[#59554E] text-xs leading-relaxed">
                  You can now edit any project directly on its card, add new graphic design work, or modify current case studies.
                </p>
              </div>

              {!isChangingPin ? (
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => setIsChangingPin(true)}
                    className="w-full py-2.5 px-4 rounded-xl border border-[#D5CECE] bg-white hover:bg-[#F2ECE4] text-xs font-semibold text-[#1A1A18] flex items-center justify-center space-x-2 transition-colors"
                  >
                    <KeyRound className="w-4 h-4 text-[#C5A059]" />
                    <span>Change Admin Security PIN</span>
                  </button>

                  <button
                    onClick={() => {
                      onLogoutAdmin();
                      onClose();
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#991B1B] hover:bg-[#7F1D1D] text-white text-xs font-semibold transition-colors flex items-center justify-center space-x-2"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Lock / Exit Admin Mode</span>
                  </button>
                </div>
              ) : (
                /* Change PIN Form */
                <form onSubmit={handleChangePinSubmit} className="space-y-3 text-left bg-white p-4 rounded-xl border border-[#E0D8CE]">
                  <h4 className="font-serif font-medium text-sm text-[#1A1A18]">
                    Set New Admin Passcode
                  </h4>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#59554E] mb-1">
                      New Passcode
                    </label>
                    <input
                      type="password"
                      required
                      value={newPin}
                      onChange={(e) => setNewPin(e.target.value)}
                      placeholder="e.g. 8899"
                      className="w-full p-2.5 rounded-lg border border-[#D5CECE] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#59554E] mb-1">
                      Confirm New Passcode
                    </label>
                    <input
                      type="password"
                      required
                      value={confirmNewPin}
                      onChange={(e) => setConfirmNewPin(e.target.value)}
                      placeholder="e.g. 8899"
                      className="w-full p-2.5 rounded-lg border border-[#D5CECE] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsChangingPin(false)}
                      className="flex-1 py-2 rounded-lg border border-[#D5CECE] bg-[#F2ECE4] text-[#59554E]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 rounded-lg bg-[#C5A059] text-white font-semibold hover:bg-[#B38F48]"
                    >
                      Save New PIN
                    </button>
                  </div>
                </form>
              )}

            </div>
          ) : (
            /* Login Form */
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block font-semibold text-[#1A1A18]">
                  Admin Passcode / PIN *
                </label>
                <div className="relative">
                  <input
                    type={showPin ? 'text' : 'password'}
                    required
                    autoFocus
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    placeholder="Enter PIN (Default: 2025)"
                    className="w-full p-3 pr-10 rounded-xl border border-[#D5CECE] bg-white focus:outline-none focus:border-[#C5A059] text-sm tracking-wider font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-3 top-3.5 text-[#8C857B] hover:text-[#1A1A18]"
                  >
                    {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#736E65] pt-1">
                  <span>Default Master PIN: <strong className="text-[#1A1A18] font-mono">2025</strong></span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-full border border-[#D5CECE] bg-white text-[#59554E]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#1A1A18] text-[#FAF8F5] font-semibold hover:bg-[#33312E] inline-flex items-center space-x-1.5"
                >
                  <Lock className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Unlock Admin Rights</span>
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
