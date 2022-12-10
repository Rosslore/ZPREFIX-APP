import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";



const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const handleLogin = async () => {
        
        alert('login not implemented yet')
    }
    return (
        <div className="content-wrapper">
            <h1>Log In</h1>
            {errorMessage && <div className='failed'>{errorMessage}</div>}
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="someone@gmail.com" />
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="password" />
            <button 
                disabled={!email || !password}
                onClick={handleLogin}>Log In</button>
            <button onClick={() => navigate('/forgot-password')}>Forgot Password</button>
            <button onClick={() => navigate('/register')}>Don't have an account? Register</button>
        </div>
    );
}

export default LoginPage;