import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GoogleOAuthProvider } from "@react-oauth/google"

ReactDOM.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="89722925717-rum9l40f0j8t7e28pjq7oi7feoesobol.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
