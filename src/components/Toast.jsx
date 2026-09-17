import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success' || !toast.type;
  const isError = toast.type === 'error';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center space-x-2.5 px-4 py-2.5 rounded-full bg-neutral-900/95 dark:bg-white/95 text-white dark:text-neutral-900 shadow-xl border border-neutral-800 dark:border-neutral-200 backdrop-blur-md text-xs sm:text-sm font-medium"
      >
        {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />}
        {isError && <AlertCircle className="w-4 h-4 text-rose-400 dark:text-rose-600 shrink-0" />}
        {!isSuccess && !isError && <Info className="w-4 h-4 text-blue-400 dark:text-blue-600 shrink-0" />}

        <span>{toast.message}</span>

        <button
          onClick={onClose}
          className="ml-1 p-0.5 rounded-full hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
        >
          <X className="w-3.5 h-3.5 opacity-60 hover:opacity-100" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
