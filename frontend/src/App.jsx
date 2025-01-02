import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


import axios from 'axios'


const Home = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axios.get('https://api.adviceslip.com/advice');
        setQuote(response.data.slip.advice);
        const data = response.data;
        console.log('Fetched quote:', data);

      } catch (error) {
        console.log('Error fetching quote:', error);
        setQuote({
          content: 'Welcome to a peaceful space for meaningful connections',
          author: 'SoulSpeak'
        });
      }
    };

    fetchQuote();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-16 p-8 text-center">
      <h1 className="text-4xl font-semibold text-slate-700 mb-6">Welcome to SoulSpeak</h1>
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <p className="text-xl text-slate-600 italic mb-4">"{quote}"</p>
      </div>
    </div>
  );
};
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem('token')
      setIsLoggedIn(!!token)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
  }

  return (
    <Router>
      
        <Routes>
          <Route path="/post" element={<Post />} />
        </Routes>
    </Router>
  )
}

export default App