import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "react-alice-carousel/lib/alice-carousel.css";
import 'bootstrap/dist/css/bootstrap.css';
import { UserProvider } from './UserContext';


ReactDOM.render(
    <UserProvider>
        <App />
    </UserProvider>
        , document.getElementById('root'));

