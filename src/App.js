// App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import HomePage from './components/HomePage';
import TrainDetailsPage from './components/TrainDetailsPage';
import PassengerDetailsPage from './components/PassengerDetailsPage';
import PaymentPage from './components/PaymentPage';
import TicketDownload from './components/TicketDownload';

function App() {
  const [data, setData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch train data on load
  useEffect(() => {
    axios.get('http://localhost:5000/trains')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching train data:', error));
  }, []);

  const addPassenger = (newPassenger) => {
    axios.post('http://localhost:5000/passengers', newPassenger)
      .then(response => console.log('Passenger added:', response.data))
      .catch(error => console.error('Error adding passenger:', error));
  };

  const updatePassenger = (id, updatedPassenger) => {
    axios.put(`http://localhost:5000/passengers/${id}`, updatedPassenger)
      .then(response => console.log('Passenger updated:', response.data))
      .catch(error => console.error('Error updating passenger:', error));
  };

  const deletePassenger = (id) => {
    axios.delete(`http://localhost:5000/passengers/${id}`)
      .then(response => console.log('Passenger deleted:', response.data))
      .catch(error => console.error('Error deleting passenger:', error));
  };

  const registerUser = (newUser) => {
    axios.post('http://localhost:5000/users', newUser)
      .then(response => console.log('User registered:', response.data))
      .catch(error => console.error('Error registering user:', error));
  };

  const loginUser = (email, password, navigate) => {
    axios.get(`http://localhost:5000/users?email=${email}`)
      .then(response => {
        const user = response.data.find(user => user.password === password);
        if (user) {
          setCurrentUser(user);
          console.log('User logged in:', user);
          navigate('/home');
        } else {
          alert('Invalid credentials');
        }
      })
      .catch(error => console.error('Error during login:', error));
  };

  const removeUser = async (navigate) => {
    if (currentUser) {
      try {
        console.log(`Deleting user with ID: ${currentUser.id}`);
        await axios.delete(`http://localhost:5000/users/${currentUser.id}`);
        alert('Account deleted successfully.');
        setCurrentUser(null);
        navigate('/');
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    } else {
      console.error('No user to delete');
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage onLogin={loginUser} />} />
        <Route path="/signup" element={<SignUpPage onRegister={registerUser} />} />
        <Route
          path="/home"
          element={<HomePage currentUser={currentUser} onRemoveUser={removeUser} />}
        />
        <Route path="/train-details" element={<TrainDetailsPage />} />
        <Route
          path="/passenger-details"
          element={
            <PassengerDetailsPage
              onAddPassenger={addPassenger}
              onUpdatePassenger={updatePassenger}
              onDeletePassenger={deletePassenger}
            />
          }
        />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/ticket-download" element={<TicketDownload />} />
      </Routes>
    </Router>
  );
}

export default App;
