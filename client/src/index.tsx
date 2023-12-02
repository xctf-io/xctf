import { createRoot } from 'react-dom/client';
import App from "./App";
import React from 'react';

if (process.env.NODE_ENV === "development") {
    new EventSource('/esbuild').addEventListener('change', () => location.reload())
}

const root = createRoot(document.getElementById('root') as Element);
root.render(<App />);
