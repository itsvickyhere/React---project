import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import HomePage from './components/HomePage';
import TrainDetailsPage from './components/TrainDetailsPage';
import PassengerDetailsPage from './components/PassengerDetailsPage';
import PaymentPage from './components/PaymentPage';
import TicketDownload from './components/TicketDownload';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/train-details" element={<TrainDetailsPage />} />
        <Route path="/passenger-details" element={<PassengerDetailsPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/ticket-download" element={<TicketDownload />} />
      </Routes>
    </Router>
  );
}

export default App;
