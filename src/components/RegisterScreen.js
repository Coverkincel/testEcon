import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './RegisterScreen.css';


const RegisterScreen = ({history}) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if(localStorage.getItem("authToken")) {
            history.push('/');
        }
    }, [history]);

    const registerHandler = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        if (password !== confirmPassword) {
            setPassword("");
            setConfirmPassword("");
            setTimeout(() => {
                setError("")
            },5000);
            return setError("Passwords do not match");
        }
        try {
            const {data} = await axios.post("/api/auth/register", {username, email, password}, config);

            console.log('registered username: ', username);
            console.log('registered email: ', email);

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
        <div className='register-screen'>
            <form onSubmit={registerHandler}  className="register-screen__form"  >
                <h3 className='register-screen__title'>Регистрация</h3>
                {error && <span className='error-message'>{error}</span>}
                <div className="form-group">
                    <label htmlFor="name">Имя пользователя:</label>
                    <input type="text" required id='name' placeholder='Введите имя пользователя' value={username} onChange={(e)=> setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Электронная почта:</label>
                    <input type="email" required id='email' placeholder='Введите электронную почту' value={email} onChange={(e)=> setEmail(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Пароль:</label>
                    <input type="password" required id='password' placeholder='Введите пароль' value={password} onChange={(e)=> setPassword(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmpassword">Подтверждение пароля</label>
                    <input type="password" required id='confirmpassword' placeholder='Подтвердите пароль' value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} />
                </div>
                <button type='submit' className='btn btn-primary'>Зарегистрироваться</button>

                <span className='register-screen__subtext'>У вас уже есть аккаунт? <Link to='/Login'>Войти</Link></span>
            </form>
        </div>
    )
}

export default RegisterScreen;