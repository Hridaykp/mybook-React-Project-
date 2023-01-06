import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastProvider } from 'react-toast-notifications';
import './styles/index.css';
import App from './components/App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
      <ToastProvider autoDismiss autoDismissTime = {5000} placement = "top-left">
        <AuthProvider>
          <Router>
            <App/>
          </Router>
        </AuthProvider>
      </ToastProvider>
    
  </React.StrictMode>
);
