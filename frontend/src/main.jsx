import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ClerkProvider } from '@clerk/clerk-react'
import { RouterProvider } from 'react-router-dom';
import router from './routes/route.jsx';
import { UserProvider } from './context/UserContext.jsx';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </ClerkProvider>
  </StrictMode>
);
