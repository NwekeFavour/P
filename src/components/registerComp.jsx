import React from 'react';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

function RegisterComp(props) {
    const [onDisplay, setOnDisplay] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState('');

    const handleSubmit = (e) => {};
    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 sm:px-0 px-4" >
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Authentication</h2>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                                <Input type="email" placeholder="Enter Your Email"/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                                <div className='flex items-center relative'>
                                    {onDisplay ? (<Input className="focus-visible:ring-0 border-none bg-transparent" type="password" placeholder="************"/>) : (<Input className="" type="text" placeholder="************"/>)}
                                    {onDisplay ? (
                                        <EyeOff className="w-5 h-5 text-gray-400 absolute right-3 top-2 cursor-pointer" onClick={() => setOnDisplay(false)} /> 
                                    ): (
                                        <Eye className="w-5 h-5 text-gray-400 absolute right-3 top-2 cursor-pointer" onClick={() => setOnDisplay(true)} />
                                    )}
                                </div>
                            </div>
                            <div className='mt-5'>
                                {message && <p className='text-red-500 text-sm mb-3'>{message}</p>}                            
                                <Button disabled={loading} type="submit" className="w-full bg-gray-500/90 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300">
                                    {loading ? "Loading....": "Submit"}                                
                                </Button>
                            </div>
                            <div className='text-end mt-4 text-sm text-gray-600'>
                                already have an account? <Link className='text-cyan-600 cursor-pointer' to={"/login"}>Login</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterComp;