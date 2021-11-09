import Nav from './components/Nav';
// import Home from './components/Home';
import LoginPage from './components/LoginPage';
import { Routes, Route } from 'react-router-dom';
import { AuthStatus, RequireAuth } from './components/Auth/AuthStatus';
import AuthProvider from './components/Auth/AuthProvider';

function App() {
  return (
    <div className="App">
      <h1>Auth Tutorial</h1>
      <Nav />
      <AuthProvider>
        <AuthStatus />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
              path="/protected"
              element={
                <RequireAuth>
                  <ProtectedPage />
                </RequireAuth>
              }
              />
        </Routes>
      </AuthProvider>
    </div>
  );
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}

export default App;
