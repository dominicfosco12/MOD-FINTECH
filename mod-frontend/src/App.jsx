import { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password });
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-dark text-white">
      <form className="p-5 rounded bg-secondary" onSubmit={handleLogin} style={{ minWidth: '300px' }}>
        <h2 className="text-center mb-4">MOD Login</h2>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" required value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" required value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary w-100">Log In</button>
      </form>
    </div>
  );
}

export default App;
