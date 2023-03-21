import React, { useContext, useState } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const { setToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

    try {
        const response = await axios.post('http://localhost:8000/users/', {
            email: email,
            password: password,
            username: username,
            first_name: firstName,
            last_name: lastName,
        });

        console.log(response.data);
        const token = response.data.access;
        setToken(token);
        localStorage.setItem('token', token);
        navigate('/feed')
    } catch (error) {
        console.error('Error:', error);
    }
};

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username</label>
                <input
                    id="username"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
                <label htmlFor='email'>Email</label>
                <input
                    id='email'
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <label htmlFor='password'>Password</label>
                <input
                    id='password'
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <label htmlFor='firstName'>First Name</label>
                <input
                    id='firstName'
                    type="text"
                    placeholder='First Name'
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                />
                <label htmlFor='lastName'>Last Name</label>
                <input
                    id='lastName'
                    type="text"
                    placeholder='Last Name'
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};