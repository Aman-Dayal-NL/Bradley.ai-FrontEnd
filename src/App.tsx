import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
// import ClientApp from './Client/ClientApp';
// import AnalystApp from './Analyst/AnalystApp';
import DemoApp from './Demo/DemoApp';
import { useAppContext } from './Context/AppContext';

const TitleUpdater: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/client') {
      document.title = 'Bradley.ai';
    } else if (location.pathname.startsWith("/emissioncheckiq")) {
      document.title = 'EmissionCheckIQ+';
    } else {
      document.title = 'Bradley.ai';
    }
  }, [location.pathname]);

  return null;
};

const App: React.FC = () => {
  const { user, authReady } = useAppContext();

  if (!authReady) {
    return null;
  }

  return (
    <Router>
      <TitleUpdater />
        <Routes>
          <Route
            path="/login/*"
            element={
              user?.product === "emissioncheckiq"
                ? <Navigate to="/emissioncheckiq" replace />
                : <Login />
            }
          />

          <Route
            path="/signup"
            element={
              user?.product === "emissioncheckiq"
                ? <Navigate to="/emissioncheckiq" replace />
                : <Signup />
            }
          />

          <Route
            path="/emissioncheckiq/*"
            element={
              user?.product === "emissioncheckiq"
                ? <DemoApp />
                : <Navigate to="/login?product=emissioncheckiq" replace />
            }
          />

          <Route
            path="/"
            element={<Navigate to={user ? "/emissioncheckiq" : "/login?product=emissioncheckiq"} replace />}
          />
        </Routes>
    </Router>
      );
    };

export default App;
