import React from 'react'
import ReactDOM from 'react-dom'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import './ResetPasswordScreen.css';


const ResetPasswordScreen = ({match}) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    const resetPasswordHandler = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                "Content-Type" : "application/json"
            },
        };

        if (password !== confirmPassword) {
            setPassword("");
            setConfirmPassword("");
            setTimeout(() => {
                setError("");
            }, 5000);
            return setError("Passwords don't match");
        }

        try {
            const {data} = await axios.put(`/api/auth/resetpassword/${match.params.resetToken}`,
            {password},
            config
            );
            console.log(data)
            setSuccess(data.data);
        } catch (error) { 
            setError(error.response.data.error);
            setPassword('');
            setTimeout(()=> {
                setError("");
            }, 5000)
        }
     }


     return (
         <div className="resetpassword-screen">
             <form onSubmit={resetPasswordHandler} className='resetpassword-screen__form'>
            <h3 className="resetpassword-screen__title">
                Восстановить пароль
            </h3>
            {error && <span className='error-message' > {error} </span>}
            {success && (<span className='success-message'> {success} <Link to ='/login'> Войти</Link> </span>)}
            <div className="form-group">
                <label htmlFor="password">Новый пароль:</label>
                <input type="password"
                required
                id='password'
                placeholder='Введите новый пароль'
                autoComplete= "true"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmpassword">Подтвердите новый пароль</label>
                    <input type="password"
                required
                id='confirmpassword'
                placeholder='Подтвердите новый пароль'
                autoComplete= "true"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                />
                </div>
                <button type='submit' className='btn btn-primary'> Восстановить пароль</button>
             </form>
         </div>
     )
}

export default ResetPasswordScreen;