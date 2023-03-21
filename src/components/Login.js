import React, { useContext, useState } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const handelSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/token/', {
                email: email,
                password: password,
            });
            console.log(response.data)
            const token = response.data.access;
            setToken(token);
            localStorage.setItem('token', token);
            navigate('/feed')
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handelSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <input
                    type="password" 
                    placeholder='Password'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}