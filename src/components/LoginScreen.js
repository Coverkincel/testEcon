import React from 'react';
import {useState} from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './LoginScreen.css'


const LoginScreen = ({history}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if(localStorage.getItem("authToken")) {
            history.push('/');
        }
    }, [history]);

 
    const loginHandler = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }

        
        try {
            const {data} = await axios.post("/api/auth/login", {email, password}, config);

            console.log('logged in email: ', email);

            localStorage.setItem("authToken", data.token);
            localStorage.setItem("loggedEmail", email);

            history.push('/');
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(()=> {
                setError("");
            }, 5000)
        }
    }

    return (
        <div className='login-screen'>
            <form onSubmit={loginHandler}  className="login-screen__form" action=""  >
                <h3 className='login-screen__title'>Вход</h3>
                {error && <span className='error-message'>{error}</span>}
                <div className="form-group">
                    <label htmlFor="email">Электронная почта:</label>
                    <input type="email" required id='email' placeholder='Введите адрес электронной почты' value={email} onChange={(e)=> setEmail(e.target.value)} 
                    tabIndex={1}/>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Пароль:<Link to ='/forgotpassword' className='login-screen__forgotpassword' tabIndex={4}>Забыли пароль?</Link></label>
                    <input type="password" required id='password' placeholder='Введите пароль' value={password} onChange={(e)=> setPassword(e.target.value)} 
                    tabIndex={2}
                    />
                </div>
                <button type='submit' className='btn btn-primary'
                tabIndex={3}>Войти</button>

                <span className='login-screen__subtext'>У вас нет аккаунта?<Link to='/register'>Зарегистрироваться</Link></span>
            </form>
        </div>
    )
}
        

export default LoginScreen;