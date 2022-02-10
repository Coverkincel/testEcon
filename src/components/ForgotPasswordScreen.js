import React, {useState} from 'react';
import axios from 'axios';
import "./ForgotPasswordScreen.css";
import {Link} from 'react-router-dom';

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const forgotPasswordHandler = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                "Content-Type" : "application/json"
            }
        };

        try {
            const {data} = await axios.post(
                "/api/auth/forgotpassword",
                {email},
                config
            );
            setSuccess(data.data);
        } catch (error) { 
            setError(error.response.data.error);
            setEmail('');
            setTimeout(()=> {
                setError("");
            }, 5000)
        }
     }


     return (
         <div className="forgotpassword-screen">
             <form onSubmit={forgotPasswordHandler} className='forgotpassword-screen__form'>
            <h3 className="forgotpassword-screen__title">
                Восстановление пароля
            </h3>
            {error && <span className='error-message' > {error} </span>}
            {success && <span className='success-message'> {success} </span>}
            <div className="form-group">
                <p className="forgotpassword-screen__subtext">
                    Пожалуйста, введите адрес электронной почты, привязанной к вашему аккаунту. Мы пришлем вам письмо с ссылкой на странцу создания нового пароля.
                </p>
                <input 
                type='email'
                required
                id='email'
                placeholder='Электронная почта'
                value={email}
                onChange = {(e) => setEmail(e.target.value)} />

                </div>
                <button type='submit' className='btn btn-primary'>Восстановить</button>
                <Link to='./'>Назад</Link>
             </form>
         </div>
     )
}

export default ForgotPasswordScreen;