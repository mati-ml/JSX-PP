import React from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';

import AppWrapper from './App';
import i18n from './i18n'; // Import the i18next instance (explained later)

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>  {/* Wrap App with I18nextProvider */}
      <AppWrapper />
    </I18nextProvider>
  </React.StrictMode>
);
