import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({
        name: '',
        email: '',
        role: ''
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            fetchProfileData();
        }
    }, []);

    const fetchProfileData = () => {
        const token = localStorage.getItem('token');
        
        axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
            setUserData(res.data);
            setEditedData({
                name: res.data.name,
                email: res.data.email,
                role: res.data.role
            });
        })
        .catch((err) => {
            alert("You need to login first");
            navigate('/');
        });
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        alert("Logout successful");
        navigate('/');
    };

    const handleUpdate = () => {
        const token = localStorage.getItem('token');
        
        axios.put('https://api.escuelajs.co/api/v1/auth/profile', editedData, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
            setUserData(res.data);
            setIsEditing(false);
            alert("Profile updated successfully");
        })
        .catch((err) => {
            alert("Error updating profile");
        });
    };

    const handleInputChange = (e) => {
        setEditedData({
            ...editedData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <div className="flex justify-between mb-6">
                <button 
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    onClick={() => navigate('/')}
                >
                    Back to Home
                </button>
                <button 
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>

            {userData && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    {isEditing ? (
                        <div className="space-y-4">
                            <div>
                                <label className="block mb-2">Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={editedData.name}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block mb-2">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={editedData.email}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block mb-2">Role:</label>
                                <input
                                    type="text"
                                    name="role"
                                    value={editedData.role}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="flex gap-4 mt-6">
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                    onClick={handleUpdate}
                                >
                                    Submit Changes
                                </button>
                                <button
                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                    onClick={() => setIsEditing(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 mb-6">
                                {userData.avatar && (
                                    <img 
                                        className="rounded-full h-24 w-24 object-cover"
                                        src={userData.avatar} 
                                        alt="Avatar" 
                                    />
                                )}
                                <h2 className="text-2xl font-bold">{userData.name}</h2>
                            </div>
                            <div className="space-y-2">
                                <p><span className="font-semibold">Email:</span> {userData.email}</p>
                                <p><span className="font-semibold">Role:</span> {userData.role}</p>
                            </div>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-6"
                                onClick={() => setIsEditing(true)}
                            >
                                Update Profile
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Profile;