import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const hideNotification = () => {
    setNotification(null);
  };

  return (
    <NotificationContext.Provider value={{ 
      notification, 
      showNotification, 
      hideNotification 
    }}>
      {children}
      {notification && (
        <div className="fixed top-4 right-4 z-50">
          <div className={`px-4 py-3 rounded-md shadow-lg ${
            notification.type === 'success' ? 'bg-green-500 text-white' : 
            notification.type === 'error' ? 'bg-red-500 text-white' : 
            'bg-blue-500 text-white'
          }`}>
            {notification.message}
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
};