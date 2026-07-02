import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import './index.css'
import { store } from "./store";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
