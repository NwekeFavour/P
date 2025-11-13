import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';

function RegisterComp() {
  const [onDisplay, setOnDisplay] = useState(false); // Password visibility
  const [loading, setLoading] = useState(false); // Loading state
  const [message, setMessage] = useState(''); // Error or success message
const [success, setSuccess] = useState(false); // Registration success state    
  // Form fields
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin'); // Default to "admin"
  const [phone, setPhone] = useState('');
  const [expertise, setExpertise] = useState('');

  const navigate = useNavigate();
  const endpoint = `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ fname, lname, email, password, role, phone, expertise }),
      });

        let data;
        try {
        if (res.ok) setSuccess(true);
        if (res.headers.get("content-type")?.includes("application/json")) {
            data = await res.json();
            console.log("Registration response data:", data)
        } else {
            const text = await res.text();
            setMessage("Server returned non-JSON:", text);
            throw new Error("Invalid JSON response from server");
        }        
        navigate('/login');
        } catch (err) {
        console.error('Invalid JSON response', err);
        setMessage('Server returned invalid response');
        setLoading(false);
        return;
        }
      if (!res.ok) {
        setMessage(data.message || 'Registration failed');
        setLoading(false);
        return;
      }

      setMessage('User registered successfully!');
      setLoading(false);

      // Optionally redirect to login
      setTimeout(() => navigate('/login'), 1500);

    } catch (error) {
      console.error(error);
      setMessage('An unexpected error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-0">
      <div className="bg-white p-8 md:h-[550px] sm:h-[500px] h-[600px] lg:h-[600px] overflow-auto rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fname" className="block text-gray-700 mb-2">First Name</label>
            <Input
              id="fname"
              type="text"
              placeholder="Enter First Name"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lname" className="block text-gray-700 mb-2">Last Name</label>
            <Input
              id="lname"
              type="text"
              placeholder="Enter Last Name"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
            <Input
              id="email"
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
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

          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 mb-2">Phone</label>
            <Input
              id="phone"
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-700 mb-2">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="admin">Admin</option>
              <option value="super-admin">Super Admin</option>
            </select>
          </div>

          {role === 'admin' && (
            <div className="mb-4">
              <label htmlFor="expertise" className="block text-gray-700 mb-2">Expertise</label>
              <Input
                id="expertise"
                type="text"
                placeholder="Comma separated (Frontend, Backend, etc.)"
                value={expertise}
                onChange={(e) => setExpertise(e.target.value.split(',').map(s => s.trim()))}
              />
            </div>
          )}

          {message && <p className={`text-sm mb-3 ${success ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}

            <Button disabled={loading} type="submit" className="w-full bg-gray-500/90 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300">
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
                Submitting...
              </>
            ) : (
              'Register'
            )}
          </Button>

          <div className="text-end mt-4 text-sm text-gray-600">
            Already have an account?{' '}
            <Link className="text-cyan-600 hover:underline" to="/login">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterComp;
