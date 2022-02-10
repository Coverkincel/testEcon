import {useState, useEffect} from 'react';
import React from 'react';
import App from '../App';
import axios from 'axios';

import './PrivateScreen.css'

const PrivateScreen = ({history}) => {
    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");

    useEffect(() => {
        if(!localStorage.getItem('authToken')) {
            history.push("/login")
        }
        const fetchPrivateData = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            }
            try {
const {data} = await axios.get("/api/private", config);
setPrivateData(data.data)
            } catch (error) {
                localStorage.removeItem("authToken");
                localStorage.removeItem("loggedEmail");
                setError("Вы не авторизованы. Обновите страницу")
            }
        }
        fetchPrivateData();
    }, [history])

    const logoutHandler = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("loggedEmail")
        history.push('/login');
    }


    const coins = localStorage.getItem("coins");
    return (
        error ? <span className ='error-message'>{error}</span> : <div className='private'>
        <div className='privateData'style={{background: "green", color: "White"}}>{privateData}</div>
        <button className='switchTriviaButton' id='logout' onClick={logoutHandler}>Выйти</button>
        <App />

        </div>
    )
}

export default PrivateScreen;