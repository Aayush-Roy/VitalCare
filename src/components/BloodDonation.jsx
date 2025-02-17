import React from 'react';
import { Calendar, MapPin, Award, Clock } from 'lucide-react';

const BloodDonation = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Find Blood Donors</h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-[#0066CC]" />
              <input
                type="text"
                placeholder="Enter your location"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <select className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0066CC] focus:border-transparent">
                <option>Blood Type</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>O+</option>
                <option>O-</option>
                <option>AB+</option>
                <option>AB-</option>
              </select>
              
              <select className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0066CC] focus:border-transparent">
                <option>Distance (km)</option>
                <option>5</option>
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
            </div>
            
            <button className="w-full bg-[#0066CC] text-white py-3 rounded-lg hover:bg-[#0052a3] transition-colors">
              Search Donors
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule Donation</h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-[#0066CC]" />
              <input
                type="date"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-[#0066CC]" />
              <input
                type="time"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
              />
            </div>
            
            <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0066CC] focus:border-transparent">
              <option>Select Donation Center</option>
              <option>City Hospital Blood Bank</option>
              <option>Red Cross Center</option>
              <option>Community Blood Center</option>
            </select>
            
            <button className="w-full bg-[#0066CC] text-white py-3 rounded-lg hover:bg-[#0052a3] transition-colors">
              Schedule Appointment
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Donation History</h2>
        
        <div className="space-y-4">
          {[1, 2, 3].map((donation, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <Award className="h-6 w-6 text-[#00CC99]" />
                <div>
                  <p className="font-semibold">Donation #{donation}</p>
                  <p className="text-sm text-gray-600">March {index + 1}, 2024</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-[#00CC99]">+100 points</p>
                <p className="text-sm text-gray-600">City Hospital</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BloodDonation;