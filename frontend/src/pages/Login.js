import React, { useState } from 'react';
import axios from "axios"
import {useNavigate} from 'react-router-dom'

function Login() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('username:', username);
    console.log('Password:', password);
    try {
        const response = await axios.post('http://localhost:4000/login', { username, password });
        console.log(response)
        if(response.data==="incorrect")
            alert("wrong password")
        else
        {
            alert("success")
            const {token} = response.data
            console.log(token)
            localStorage.setItem('token', token);
           
            nav("/home")
            
            
        }
    
      } catch (error) {
        console.error('Login failed:', error);
      }
      setUserName("")
      setPassword("")
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded shadow-md max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl mb-4">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block font-semibold mb-2"></label>
          <input
            id="email"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-semibold mb-2">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
