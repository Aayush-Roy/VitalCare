import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CertificateVerification from './components/CertificateVerification';
import BloodDonation from './components/BloodDonation';
import AmbulanceLocator from './components/AmbulanceLocator';
import Marketplace from './components/Marketplace';
import BloodBankSearch from './components/BloodBankSearch';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/certificates" element={<CertificateVerification />} />
          <Route path="/blood-donation" element={<BloodDonation />} />
          <Route path="/ambulance" element={<AmbulanceLocator />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/bloodcenter" element={<BloodBankSearch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;