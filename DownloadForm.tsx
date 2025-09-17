import React, { useState } from 'react';
import { User, Key, X } from 'lucide-react';

interface DownloadFormProps {
  isVisible: boolean;
  gameTitle: string;
  onSubmit: (name: string, code: string) => void;
  onCancel: () => void;
}

const DownloadForm: React.FC<DownloadFormProps> = ({ 
  isVisible, 
  gameTitle, 
  onSubmit, 
  onCancel 
}) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [errors, setErrors] = useState({ name: '', code: '' });

  if (!isVisible) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({ name: '', code: '' });
    
    // Validation
    let hasErrors = false;
    const newErrors = { name: '', code: '' };
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
      hasErrors = true;
    }
    
    if (!code.trim()) {
      newErrors.code = 'Code is required';
      hasErrors = true;
    }
    
    if (hasErrors) {
      setErrors(newErrors);
      return;
    }
    
    // Submit form
    onSubmit(name.trim(), code.trim());
    
    // Reset form
    setName('');
    setCode('');
  };

  const handleCancel = () => {
    setName('');
    setCode('');
    setErrors({ name: '', code: '' });
    onCancel();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-md w-full shadow-2xl border border-slate-700">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-white text-xl font-bold mb-1">Download Required</h3>
            <p className="text-gray-300 text-sm truncate">{gameTitle}</p>
          </div>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              ENTER YOUR NAME IN THE GAME
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name in the game"
                className={`w-full bg-slate-700 text-white placeholder-gray-400 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 transition-all ${
                  errors.name ? 'ring-2 ring-red-500' : 'focus:ring-teal-500'
                }`}
              />
            </div>
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Code Field */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              ENTER HACKING CODE
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter hacking code"
                className={`w-full bg-slate-700 text-white placeholder-gray-400 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 transition-all ${
                  errors.code ? 'ring-2 ring-red-500' : 'focus:ring-teal-500'
                }`}
              />
            </div>
            {errors.code && (
              <p className="text-red-400 text-sm mt-1">{errors.code}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors"
            >
              Continue
            </button>
          </div>
        </form>

        {/* Info */}
        <div className="mt-6 p-4 bg-slate-700/50 rounded-lg">
          <p className="text-gray-300 text-xs text-center">
            PLEASE PROVIDE YOUR NAME IN GAME AND THE CORRECT HACKING CODE
          </p>
        </div>
      </div>
    </div>
  );
};

export default DownloadForm;