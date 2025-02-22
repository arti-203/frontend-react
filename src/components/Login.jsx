import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        const payload = {
            email: email,
            password: password
        };

        axios.post('https://api.escuelajs.co/api/v1/auth/login', payload)
            .then((res) => {
                localStorage.setItem("token", res.data.access_token);
                alert("Login Successful");
                navigate('/profile');
            })
            .catch((err) => {
                alert("Login Failed");
                console.error("Login Error:", err);
            });
    };

    return (
        <div className='bg-sky-200 space-y-4 p-5 rounded-md shadow-md w-72 mx-auto mt-20'>
            <p className='font-semibold text-lg text-center'>Login Page</p>

            <div>
                <label className="block mb-1">Email</label>
                <input 
                    onChange={(e) => setEmail(e.target.value)} 
                    type="email" 
                    className='w-full p-2 border rounded-md'
                />
            </div>
            <div>
                <label className="block mb-1">Password</label>
                <input 
                    onChange={(e) => setPassword(e.target.value)} 
                    type="password" 
                    className='w-full p-2 border rounded-md'
                />
            </div>
            <button 
                onClick={handleSubmit} 
                className='w-full bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700'
            >
                Login
            </button>
        </div>
    );
};

export default Login;
