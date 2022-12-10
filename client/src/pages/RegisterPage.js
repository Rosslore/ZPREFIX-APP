import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";



const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = async () => {
        alert('register not implemented yet')
    }
    return (
        <div className="content-wrapper">
            <h1>Registration</h1>
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
            <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                placeholder="password" />
            <button
                disabled={!email || !password || password !== confirmPassword}
                onClick={handleRegister}>Register</button>
            <button onClick={() => navigate('/login')}>Have an account? Log in</button>
        </div>
    );
}

export default RegisterPage;