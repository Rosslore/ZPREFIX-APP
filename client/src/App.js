import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import { Routes, Route } from 'react-router-dom';
// import LoginPage from './pages/LoginAxios';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Header from './pages/Header';
import Context from './context/Context';
import NewItem from './pages/NewItem';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInventory, setUserInventory] = useState([]);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [allInventory, setAllInventory] = useState([]);


  return (
    <div className="App">
      <header className="App-header">

        <Context.Provider value={{
          isLoggedIn, setIsLoggedIn, userInventory, setUserInventory, username, setUsername, userId, setUserId, allInventory, setAllInventory
        }}>
          <Header />
          <Routes>
            {/* <Route path="/" element={<LoginPage />} /> */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/:id" element={<Dashboard />} />
            <Route path="/newitem" element={<NewItem />} />
          </Routes>
        </Context.Provider>
      </header>
    </div>
  );
}

export default App;
