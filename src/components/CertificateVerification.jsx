import React, { useState } from 'react';
import { Search, Award, CheckCircle, XCircle } from 'lucide-react';

const CertificateVerification = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const certificates = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      status: "verified",
      certNumber: "CERT-2024-001",
      issuedDate: "2024-01-15",
      expiryDate: "2029-01-14",
      blockchainVerified: true
    },
    {
      id: 2,
      name: "Dr. Michael Smith",
      specialty: "Neurology",
      status: "verified",
      certNumber: "CERT-2024-002",
      issuedDate: "2023-05-20",
      expiryDate: "2028-05-19",
      blockchainVerified: true
    },
    {
      id: 3,
      name: "Dr. Emily Davis",
      specialty: "Orthopedics",
      status: "unverified",
      certNumber: "CERT-2024-003",
      issuedDate: "2022-09-10",
      expiryDate: "2027-09-09",
      blockchainVerified: false
    },
    {
      id: 4,
      name: "Dr. Robert Brown",
      specialty: "Dermatology",
      status: "verified",
      certNumber: "CERT-2024-004",
      issuedDate: "2021-11-15",
      expiryDate: "2026-11-14",
      blockchainVerified: true
    }
  ];

  const filteredCertificates = certificates.filter(cert =>
    cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.certNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Certificate Verification Portal</h1>
      
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search by name or certificate number..."
          className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
      </div>

      {filteredCertificates.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCertificates.map(cert => (
            <div key={cert.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{cert.name}</h3>
                  <p className="text-gray-600">{cert.specialty}</p>
                </div>
                {cert.status === 'verified' ? (
                  <CheckCircle className="h-6 w-6 text-[#34C759]" />
                ) : (
                  <XCircle className="h-6 w-6 text-[#FF3B30]" />
                )}
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Certificate No:</span> {cert.certNumber}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Issued:</span> {cert.issuedDate}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Expires:</span> {cert.expiryDate}
                </p>
              </div>
              
              {cert.blockchainVerified && (
                <div className="mt-4 flex items-center text-[#0066CC]">
                  <Award className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">Blockchain Verified</span>
                </div>
              )}
              
              <button className="mt-4 w-full bg-[#0066CC] text-white py-2 rounded-lg hover:bg-[#0052a3] transition-colors">
                View Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">No matching certificates found.</p>
      )}
    </div>
  );
};

export default CertificateVerification;
