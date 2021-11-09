import { useContext } from 'react';
import AuthContext from './AuthContext';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';

function useAuth() {
  return useContext(AuthContext);
}

function AuthStatus() {
  let auth = useAuth();
  let navigate = useNavigate();

  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {auth.user}!{" "}
      <button
      onClick={() => {
        auth.signout(() => navigate("/"));
      }}
      >
        Sign out
      </button>
    </p>
  );
}

function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location}} />;
  }

  return children;
}

export { useAuth, AuthStatus, RequireAuth };