import React, { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

const defaultNotification = {
  id: null,
  message: '',
  type: 'info', // success, error, warning, info
  duration: 3000,
};

export const ToastProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = 'info', duration = 3000) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type, duration }]);

    setTimeout(() => {
      removeNotification(id);
    }, duration);

    return id;
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const success = (message, duration = 3000) => addNotification(message, 'success', duration);
  const error = (message, duration = 3000) => addNotification(message, 'error', duration);
  const warning = (message, duration = 3000) => addNotification(message, 'warning', duration);
  const info = (message, duration = 3000) => addNotification(message, 'info', duration);

  return (
    <ToastContext.Provider value={{ notifications, addNotification, removeNotification, success, error, warning, info }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};
