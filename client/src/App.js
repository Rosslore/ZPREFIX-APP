import Dashboard from './pages/Dashboard';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
// import ProtectedRoute from './auth/ProtectedRoute';

const Wrapper = styled.div`
padding: 20px;

`





function App() {
  return (
    <div className="wrapper"> 
      <h1>Loading...</h1>
        
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <ProtectedRoute path="/dashboard" element={<Dashboard />} /> */}
          </Routes>
        

    </div>
  );
}

export default App;
