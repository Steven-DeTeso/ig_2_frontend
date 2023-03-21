import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

    try {
        const response = await axios.post('http://localhost:8000/users/', {
            email: email,
            password: password,
            username: username,
        });

        console.log(response.data);
      // Redirect to the login page or save the user data and tokens to the local storage or context
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
                <button type="submit">Register</button>
            </form>
        </div>
    );
};