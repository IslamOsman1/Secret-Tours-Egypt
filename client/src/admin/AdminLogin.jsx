import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockKeyhole } from 'lucide-react';
import { api, demoAdmin } from '../api';

export default function AdminLogin() {
  const nav = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async event => {
    event.preventDefault();
    setLoading(true);
    setError('');

    const form = Object.fromEntries(new FormData(event.currentTarget));

    try {
      const { data } = await api.post('/auth/login', form);
      localStorage.setItem('ste_admin_token', data.token);
      nav('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not sign in with the local demo account.');
    } finally {
      setLoading(false);
    }
  };

  return <div className="admin-login"><div className="admin-login-card"><img src="/logo.png"/><div className="admin-lock"><LockKeyhole/></div><h1>Admin Dashboard</h1><p>Manage tours, images, requests and website content locally in your browser.</p><form onSubmit={submit}><label>Email</label><input name="email" type="email" required defaultValue={demoAdmin.email}/><label>Password</label><input name="password" type="password" required defaultValue={demoAdmin.password}/><small>Demo access: {demoAdmin.email} / {demoAdmin.password}</small>{error&&<div className="admin-error">{error}</div>}<button className="btn btn-primary wide" disabled={loading}>{loading?'Signing in...':'Sign in'}</button></form><a href="/">Back to website</a></div></div>;
}
