import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage  from './componenets/AuthPage';
import HomePage from './componenets/HomePage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Redirect to HomePage if logged in, otherwise show AuthPage */}
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/home" replace />
              ) : (
                <AuthPage onLoginSuccess={() => setIsLoggedIn(true)} />
              )
            }
          />
          {/* Full-screen HomePage */}
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
