// import React from 'react';
// import { useState, useContext, useEffect } from 'react';
// import { useNavigate } from "react-router-dom";
// import {
//     Container,
//     Button,
//     Grid,
//     Paper,
//     TextField,
//     IconButton,
//     InputAdornment,
// } from "@mui/material";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import Context from '../context/Context';
// import { Axios } from 'axios';


// const LoginPage = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();
//     const [errorMessage, setErrorMessage] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const { setUserInventory } = useContext(Context);
//     const [loginStatus, setLoginStatus] = useState(false);




//     const handleSubmit = () => {

//         Axios.post('http://localhost:8080/login', {
//             username: username,
//             password: password,},
//             { withCredentials: true }
//         ).then((response) => {
//             if (response.data.message) {
//                 setErrorMessage(response.data.message);
//             } else {
//                 setLoginStatus(true);
//                 setUserInventory(username);
//                 navigate('/dashboard');
//             }
//         });

//         const formReset = () => {
//             setUsername('');
//             setPassword('');
//         }
//     }
//     const handleClickShowPassword = () => {
//         setShowPassword(!showPassword);
//     };



//     return (
//         <div>
//             <Container maxWidth="sm">
//                 <Grid container spacing={2}
//                     direction="column"
//                     justifyContent="center"
//                     alignItems="center">
//                     <Grid item xs={12}>
//                         <Paper elevation={3} sx={{ padding: 5 }}>
//                             <form onSubmit={handleSubmit}>
//                                 <h1>Log In</h1>
//                                 <TextField
//                                     value={username}
//                                     onChange={(e) => setUsername(e.target.value)}
//                                     placeholder="username"
//                                     label="Username"
//                                     variant="outlined"
//                                     fullWidth
//                                     margin="normal"
//                                     required
//                                 />
//                                 <TextField
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     type={showPassword ? "text" : "password"}
//                                     placeholder="password"
//                                     label="Password"
//                                     variant="outlined"
//                                     fullWidth
//                                     margin="normal"
//                                     required
//                                     InputProps={{
//                                         endAdornment: (
//                                             <InputAdornment position="end">
//                                                 <IconButton
//                                                     aria-label="toggle password visibility"
//                                                     onClick={handleClickShowPassword}
//                                                     edge="end"
//                                                 >
//                                                     {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
//                                                 </IconButton>
//                                             </InputAdornment>
//                                         ),
//                                     }}
//                                 />
//                                 <Button
//                                     disabled={!username || !password}

//                                     variant="contained"
//                                     color="primary"
//                                     fullWidth
//                                     margin="normal"
//                                     type="submit"
//                                 >
//                                     Log In
//                                 </Button>
//                                 <Button
//                                     onClick={() => navigate('/register')}
//                                     variant="contained"
//                                     color="secondary"
//                                     fullWidth
//                                     margin="normal"
//                                 >
//                                     Don't have an account? Register
//                                 </Button>
//                             </form>
//                         </Paper>
//                     </Grid>
//                 </Grid>
//             </Container>
//         </div>
//     )
// }

// export default LoginPage;