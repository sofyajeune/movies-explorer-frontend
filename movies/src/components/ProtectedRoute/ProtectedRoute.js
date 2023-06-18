import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

export function ProtectedRoute({ isAuthenticated, children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
}

export function UnauthorizedOnlyRoute({ isAuthenticated, children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
}
