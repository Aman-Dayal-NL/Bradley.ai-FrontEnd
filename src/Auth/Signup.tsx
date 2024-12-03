import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../AppContext';

const Signup: React.FC = () => {
  const { setUser } = useAppContext();  // Access setUser from context
  const navigate = useNavigate();

  // Define role as a specific union type ('client' | 'analyst')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'client' | 'analyst'>('client');  // Explicitly set role type
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = () => {
    if (!email || !password) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    setUser({ email, role });
    navigate(role === 'client' ? '/client' : '/analyst');
  };

  return (
    <div>
      <h2>Signup</h2>
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <select value={role} onChange={(e) => setRole(e.target.value as 'client' | 'analyst')}>
        <option value="client">Client</option>
        <option value="analyst">Analyst</option>
      </select>
      <button onClick={handleSignup}>Signup</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default Signup;
