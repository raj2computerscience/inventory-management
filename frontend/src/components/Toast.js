import React from 'react';
import { useToast } from '../context/ToastContext';
import { FiCheck, FiX, FiAlertCircle, FiInfo } from 'react-icons/fi';

const Toast = ({ notification, onClose }) => {
  const icons = {
    success: <FiCheck className="text-2xl" />,
    error: <FiX className="text-2xl" />,
    warning: <FiAlertCircle className="text-2xl" />,
    info: <FiInfo className="text-2xl" />,
  };

  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
  };

  return (
    <div className={`${colors[notification.type]} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-64`}>
      <div>{icons[notification.type]}</div>
      <div className="flex-1">{notification.message}</div>
      <button onClick={onClose} className="text-2xl hover:opacity-75">&times;</button>
    </div>
  );
};

export const ToastContainer = () => {
  const { notifications, removeNotification } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {notifications.map((notification) => (
        <Toast
          key={notification.id}
          notification={notification}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
