import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockKeyhole } from 'lucide-react';
import { api } from '../api';

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
      const { data } = await api.post('/admin/login', form);
      localStorage.setItem('ste_admin_token', data.token);
      nav('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not sign in.');
    } finally {
      setLoading(false);
    }
  };

  return <div className="admin-login"><div className="admin-login-card"><img src="/logo.png"/><div className="admin-lock"><LockKeyhole/></div><h1>Admin Dashboard</h1><p>Manage tours, images, requests and website content from your secured admin account.</p><form onSubmit={submit}><label>Email</label><input name="email" type="email" required autoComplete="username"/><label>Password</label><input name="password" type="password" required autoComplete="current-password"/><small>Use the admin credentials configured in your environment variables.</small>{error&&<div className="admin-error">{error}</div>}<button className="btn btn-primary wide" disabled={loading}>{loading?'Signing in...':'Sign in'}</button></form><a href="/">Back to website</a></div></div>;
}
