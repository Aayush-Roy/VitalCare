import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Stethoscope, Ambulance, PlusCircle, Wallet } from 'lucide-react';
import { MdBloodtype } from "react-icons/md";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Stethoscope className="h-8 w-8 text-[#0066CC]" />
              <span className="ml-2 text-xl font-bold text-gray-800">HealthCare</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/certificates" className="nav-link">
              <PlusCircle className="h-5 w-5" />
              <span>Certificates</span>
            </Link>
            <Link to="/blood-donation" className="nav-link">
              <Heart className="h-5 w-5" />
              <span>Blood Donation</span>
            </Link>
            <Link to="/ambulance" className="nav-link">
              <Ambulance className="h-5 w-5" />
              <span>Ambulance</span>
            </Link>
            <Link to="/marketplace" className="nav-link">
              <Wallet className="h-5 w-5" />
              <span>Marketplace</span>
            </Link>
            <Link to="/bloodcenter" className='nav-link'>
            <MdBloodtype className='h-5 w-5'/>
            <span>Blood Banks</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;