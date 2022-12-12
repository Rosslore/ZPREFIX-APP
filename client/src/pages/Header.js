import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/Context';
import { Toolbar, AppBar, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import Context from '../context/Context';
// import Axios from 'axios';


const Header = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(Context);
    const [user, setUser] = useState((JSON.parse(localStorage.getItem('user'))));

    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setUser(user);
    }, []);
    
    // const handleLogout = () => {
    //     setIsLoggedIn(false)
    //     setUser(null);
    //     localStorage.removeItem('user');
    //     localStorage.removeItem('token')
    //     navigate('/login');
    // };

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: localStorage.getItem('token') })
            });
            const data = await response.json();
            if (data.error) {
                console.log(data.error);
            } else {
                setIsLoggedIn(false);
                setUser(null);
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {user && user.username}
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;
