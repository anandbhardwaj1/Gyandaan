import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {UserContextProvider} from "./context/userContext";

import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  
  <BrowserRouter>
  <UserContextProvider>
    <App />
    </UserContextProvider>
  </BrowserRouter>,

  document.getElementById('root')
);

