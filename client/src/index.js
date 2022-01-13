import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {UserContextProvider} from "./context/userContext";
import { CProvider } from './components/VideoChat/context';

import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  
  <BrowserRouter>
  <UserContextProvider>
  <CProvider>
    <App />
    </CProvider>
    </UserContextProvider>
  </BrowserRouter>,

  document.getElementById('root')
);

