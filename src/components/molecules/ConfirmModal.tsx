import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({ 
  isOpen, 
  title, 
  message, 
  onConfirm, 
  onCancel,
  isDeleting = false
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Semi-transparent Backdrop */}
      <div 
        className="absolute inset-0 bg-ui-heading/60 backdrop-blur-sm animate-fade-in"
        onClick={!isDeleting ? onCancel : undefined}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 text-center animate-fade-in transform scale-100 transition-all">
        
        <div className="flex justify-center mb-6 relative">
          <div className="relative">
            <div className="absolute inset-0 bg-orange-100 rounded-full animate-pulse opacity-75"></div>
            <FiAlertTriangle className="w-16 h-16 text-orange-500 relative z-10 bg-white rounded-full bg-clip-padding p-2" />
          </div>
        </div>

        <h3 className="text-xl font-bold text-ui-heading mb-3">
          {title}
        </h3>
        
        <p className="text-ui-text text-sm mb-8">
          {message}
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="flex-1 py-3 rounded-xl font-bold text-ui-text bg-ui-bg hover:bg-ui-border transition-all active:scale-95 disabled:opacity-50"
          >
            Cancelar
          </button>
          
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 py-3 rounded-xl font-bold text-white bg-red-500 hover:bg-red-600 transition-all shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isDeleting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                <span>Borrando...</span>
              </>
            ) : (
              'Sí, Eliminar'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
