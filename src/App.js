import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Todolist from './Todolist';
import Login from './Login';
import Register from './Register';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

function App() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Routes>
      {user ? (
        <>
          <Route path="/" element={<Todolist />} />
          <Route path="/todolist" element={<Todolist />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </>
      )}
    </Routes>
  );
}

export default App;