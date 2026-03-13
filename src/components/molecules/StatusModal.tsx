import React from 'react';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

interface StatusModalProps {
  isOpen: boolean;
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}

export const StatusModal: React.FC<StatusModalProps> = ({ isOpen, type, message, onClose }) => {
  if (!isOpen) return null;

  const isSuccess = type === 'success';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Semi-transparent Backdrop */}
      <div 
        className="absolute inset-0 bg-ui-heading/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 text-center animate-fade-in transform scale-100 transition-all">
        
        <div className="flex justify-center mb-6 relative">
          {isSuccess ? (
            <div className="relative">
              <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75"></div>
              <FiCheckCircle className="w-20 h-20 text-green-500 relative z-10 bg-white rounded-full bg-clip-padding" />
            </div>
          ) : (
            <div className="relative">
              <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-75"></div>
              <FiXCircle className="w-20 h-20 text-red-500 relative z-10 bg-white rounded-full bg-clip-padding" />
            </div>
          )}
        </div>

        <h3 className="text-2xl font-bold text-ui-heading mb-3">
          {isSuccess ? '¡Operación Exitosa!' : 'Atención'}
        </h3>
        
        <p className="text-ui-text text-base mb-8">
          {message}
        </p>

        <button
          onClick={onClose}
          className={`w-full py-3.5 rounded-xl font-bold text-white transition-all shadow-md hover:shadow-lg active:scale-95 ${
            isSuccess 
              ? 'bg-green-500 hover:bg-green-600' 
              : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          {isSuccess ? 'Continuar' : 'Entendido'}
        </button>
      </div>
    </div>
  );
};
