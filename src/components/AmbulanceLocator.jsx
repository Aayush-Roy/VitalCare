import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Phone, Clock, AlertTriangle, Navigation, Guitar as Hospital } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom ambulance icon
const ambulanceIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Mock data for ambulances
const mockAmbulances = [
  { id: 1, position: [51.505, -0.09], status: 'available', eta: '5 mins', driver: 'John Doe', phone: '+1234567890' },
  { id: 2, position: [51.51, -0.1], status: 'busy', eta: '10 mins', driver: 'Jane Smith', phone: '+1234567891' },
  { id: 3, position: [51.515, -0.095], status: 'available', eta: '7 mins', driver: 'Mike Johnson', phone: '+1234567892' }
];

// Mock data for hospitals
const mockHospitals = [
  { id: 1, name: 'Central Hospital', position: [51.508, -0.11], beds: 15, emergency: true },
  { id: 2, name: 'City Medical Center', position: [51.503, -0.08], beds: 8, emergency: true },
  { id: 3, name: 'Community Hospital', position: [51.512, -0.085], beds: 3, emergency: false }
];

const LocationMarker = () => {
  const [position, setPosition] = useState(null);
  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    });
  }, [map]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

const AmbulanceLocator = () => {
  const [selectedEmergency, setSelectedEmergency] = useState('medical');
  const [priority, setPriority] = useState('normal');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Control Panel */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Request Ambulance</h2>
              
              {/* Emergency Type Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Type</label>
                <div className="grid grid-cols-2 gap-4">
                  {['medical', 'accident', 'cardiac', 'other'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedEmergency(type)}
                      className={`p-3 rounded-lg border ${
                        selectedEmergency === type
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-gray-200 hover:border-primary/50'
                      } transition-colors capitalize`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Priority Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
                <div className="grid grid-cols-3 gap-4">
                  {['low', 'normal', 'high'].map((level) => (
                    <button
                      key={level}
                      onClick={() => setPriority(level)}
                      className={`p-3 rounded-lg border ${
                        priority === level
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-gray-200 hover:border-primary/50'
                      } transition-colors capitalize`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-4">
                <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Request Emergency
                </button>
                <button className="w-full bg-secondary text-white py-3 rounded-lg hover:bg-secondary/90 transition-colors flex items-center justify-center">
                  <Navigation className="w-5 h-5 mr-2" />
                  Share Location
                </button>
              </div>
            </div>

            {/* Nearby Hospitals */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Nearby Hospitals</h3>
              <div className="space-y-4">
                {mockHospitals.map((hospital) => (
                  <div key={hospital.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{hospital.name}</h4>
                        <p className="text-sm text-gray-600">Available Beds: {hospital.beds}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${
                        hospital.emergency ? 'bg-success/20 text-success' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {hospital.emergency ? 'Emergency Ready' : 'Limited Service'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 h-[800px]">
              <MapContainer
                center={[51.505, -0.09]}
                zoom={13}
                className="h-full w-full rounded-lg"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker />
                
                {/* Render Ambulances */}
                {mockAmbulances.map((ambulance) => (
                  <Marker
                    key={ambulance.id}
                    position={ambulance.position}
                    icon={ambulanceIcon}
                  >
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-semibold mb-2">Ambulance #{ambulance.id}</h3>
                        <div className="space-y-2 text-sm">
                          <p className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-primary" />
                            ETA: {ambulance.eta}
                          </p>
                          <p className="flex items-center">
                            <Phone className="w-4 h-4 mr-2 text-primary" />
                            {ambulance.phone}
                          </p>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                            ambulance.status === 'available' ? 'bg-success/20 text-success' : 'bg-error/20 text-error'
                          }`}>
                            {ambulance.status}
                          </span>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}

                {/* Render Hospitals */}
                {mockHospitals.map((hospital) => (
                  <Marker
                    key={hospital.id}
                    position={hospital.position}
                  >
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-semibold mb-2">{hospital.name}</h3>
                        <div className="space-y-2 text-sm">
                          <p className="flex items-center">
                            <Hospital className="w-4 h-4 mr-2 text-primary" />
                            Available Beds: {hospital.beds}
                          </p>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                            hospital.emergency ? 'bg-success/20 text-success' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {hospital.emergency ? 'Emergency Ready' : 'Limited Service'}
                          </span>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmbulanceLocator;
// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import axios from 'axios';

// // Fix for default marker icons
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// });

// const LocationMarker = () => {
//   const [position, setPosition] = useState(null);
//   const map = useMap();

//   useEffect(() => {
//     map.locate().on("locationfound", function (e) {
//       setPosition(e.latlng);
//       map.flyTo(e.latlng, map.getZoom());
//     });
//   }, [map]);

//   return position === null ? null : (
//     <Marker position={position}>
//       <Popup>You are here</Popup>
//     </Marker>
//   );
// }

// const AmbulanceLocator = () => {
//   const [userLocation, setUserLocation] = useState('');
//   const [hospitals, setHospitals] = useState([]);
//   const [position, setPosition] = useState([51.505, -0.09]);

//   const handleLocationChange = (e) => {
//     setUserLocation(e.target.value);
//   };

//   const fetchHospitals = async () => {
//     if (!userLocation) return;

//     const GOOGLE_API_KEY = 'YOUR_GOOGLE_API_KEY';
//     const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=hospitals+in+${userLocation}&key=${GOOGLE_API_KEY}`;

//     try {
//       const response = await axios.get(url);
//       setHospitals(response.data.results);
//       if (response.data.results[0]) {
//         setPosition([response.data.results[0].geometry.location.lat, response.data.results[0].geometry.location.lng]);
//       }
//     } catch (error) {
//       console.error('Error fetching hospitals:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Control Panel */}
//           <div className="lg:col-span-1 space-y-6">
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <h2 className="text-2xl font-bold text-gray-900 mb-4">Search Hospitals</h2>
//               <input
//                 type="text"
//                 value={userLocation}
//                 onChange={handleLocationChange}
//                 placeholder="Enter state or city"
//                 className="w-full p-2 border rounded-md"
//               />
//               <button
//                 onClick={fetchHospitals}
//                 className="mt-4 w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors"
//               >
//                 Search Hospitals
//               </button>
//             </div>

//             {/* Nearby Hospitals */}
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <h3 className="text-xl font-bold text-gray-900 mb-4">Nearby Hospitals</h3>
//               <div className="space-y-4">
//                 {hospitals.map((hospital) => (
//                   <div key={hospital.place_id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
//                     <div className="flex items-start justify-between">
//                       <div>
//                         <h4 className="font-semibold text-gray-900">{hospital.name}</h4>
//                         <p className="text-sm text-gray-600">{hospital.formatted_address}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Map Section */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-lg shadow-md p-6 h-[800px]">
//               <MapContainer center={position} zoom={13} className="h-full w-full rounded-lg">
//                 <TileLayer
//                   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 />
//                 <LocationMarker />

//                 {/* Render Hospitals */}
//                 {hospitals.map((hospital) => (
//                   <Marker
//                     key={hospital.place_id}
//                     position={[hospital.geometry.location.lat, hospital.geometry.location.lng]}
//                   >
//                     <Popup>
//                       <h3 className="font-semibold mb-2">{hospital.name}</h3>
//                       <p>{hospital.formatted_address}</p>
//                     </Popup>
//                   </Marker>
//                 ))}
//               </MapContainer>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AmbulanceLocator;
