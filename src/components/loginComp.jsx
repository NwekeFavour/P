import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';

function LoginComp({ setUser }) {
  const [onDisplay, setOnDisplay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const endpoint = `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || 'Login failed');
        setLoading(false);
        return;
      }

      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user.role));
      setUser(data.user.role);

      if (data.user.role === 'super-admin') navigate('/dashboard');
      else if (data.user.role === 'admin') navigate('/admin');
    } catch (error) {
      console.error(error);
      setMessage('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // Navigate to forgot password page
    navigate('/forgot-password');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-0">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <div className="relative flex items-center">
              <Input
                id="password"
                type={onDisplay ? 'text' : 'password'}
                placeholder="************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {onDisplay ? (
                <EyeOff
                  className="w-5 h-5 text-gray-400 absolute right-3 cursor-pointer"
                  onClick={() => setOnDisplay(false)}
                />
              ) : (
                <Eye
                  className="w-5 h-5 text-gray-400 absolute right-3 cursor-pointer"
                  onClick={() => setOnDisplay(true)}
                />
              )}
            </div>
          </div>

          <div className="text-end mb-4 text-sm text-cyan-600 cursor-pointer hover:underline" onClick={handleForgotPassword}>
            Forgot password?
          </div>

          {message && <p className="text-red-500 text-sm mb-3">{message}</p>}

          <Button
            disabled={loading}
            type="submit"
            className="w-full bg-gray-500/90 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </Button>

          <div className="text-end mt-4 text-sm text-gray-600">
            Don't have an account?{' '}
            <Link className="text-cyan-600 hover:underline" to="/sign-up">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginComp;
