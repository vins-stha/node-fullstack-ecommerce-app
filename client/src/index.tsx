import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios'
import { Provider } from 'react-redux';
import {store} from './components/redux/store';
import { CookiesProvider } from 'react-cookie';


// intercept axios request to attach jwt token
axios.interceptors.request.use(request=>{
    const jwtToken = localStorage.getItem('jwt_access_token');

    // check if jwtToken is present
    if (jwtToken){
        // if present attach it to header
        request.headers = {
            Authorization: `Bearer ${jwtToken}`
        }
    }
    return request;
});

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
ReactDOM.render(
    <React.StrictMode>
        <Provider store = {store}>
            <CookiesProvider>
                <App />
            </CookiesProvider>

        </Provider>

    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



