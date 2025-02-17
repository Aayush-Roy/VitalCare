import React, { useState } from 'react';
import { Search, Calendar, Tag, ShoppingCart, Gift, Filter, ArrowUpDown, Percent } from 'lucide-react';

// Mock data for medicines
const mockMedicines = [
  {
    id: 1,
    name: "Amoxicillin 500mg",
    manufacturer: "PharmaCorp",
    originalPrice: 29.99,
    discountedPrice: 19.99,
    expiryDate: "2024-06-15",
    stock: 150,
    discountPercent: 33,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 2,
    name: "Paracetamol 650mg",
    manufacturer: "HealthPharm",
    originalPrice: 15.99,
    discountedPrice: 11.99,
    expiryDate: "2024-05-20",
    stock: 200,
    discountPercent: 25,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 3,
    name: "Cetirizine 10mg",
    manufacturer: "MediCare",
    originalPrice: 19.99,
    discountedPrice: 13.99,
    expiryDate: "2024-07-10",
    stock: 100,
    discountPercent: 30,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400",
  }
];

const Marketplace = () => {
  const [sortBy, setSortBy] = useState('expiry');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (medicine) => {
    setCart([...cart, medicine]);
  };

  const removeFromCart = (medicineId) => {
    setCart(cart.filter(item => item.id !== medicineId));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.discountedPrice, 0);
  };

  const calculateRewardPoints = () => {
    return Math.floor(calculateTotal() * 10); // 10 points per dollar spent
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Medicine Marketplace</h1>
            <p className="text-gray-600 mt-2">Find discounted medicines before expiry</p>
          </div>
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative bg-primary text-white px-4 py-2 rounded-lg flex items-center"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Cart ({cart.length})
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cart.length}
              </span>
            )}
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search medicines..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setSortBy('expiry')}
                className={`flex items-center px-4 py-2 rounded-lg border ${
                  sortBy === 'expiry' ? 'border-primary bg-primary/10 text-primary' : 'border-gray-300'
                }`}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Sort by Expiry
              </button>
              <button
                onClick={() => setSortBy('price')}
                className={`flex items-center px-4 py-2 rounded-lg border ${
                  sortBy === 'price' ? 'border-primary bg-primary/10 text-primary' : 'border-gray-300'
                }`}
              >
                <Tag className="w-4 h-4 mr-2" />
                Sort by Price
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockMedicines.map((medicine) => (
            <div key={medicine.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={medicine.image}
                  alt={medicine.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                  {medicine.discountPercent}% OFF
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{medicine.name}</h3>
                <p className="text-gray-600 mb-2">{medicine.manufacturer}</p>
                <div className="flex items-center space-x-2 mb-4">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-sm text-gray-600">Expires: {medicine.expiryDate}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-lg font-bold text-primary">${medicine.discountedPrice}</span>
                    <span className="text-sm text-gray-500 line-through ml-2">${medicine.originalPrice}</span>
                  </div>
                  <span className="text-sm text-gray-600">{medicine.stock} in stock</span>
                </div>
                <button
                  onClick={() => addToCart(medicine)}
                  className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Shopping Cart Sidebar */}
        {showCart && (
          <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-xl p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
              <button
                onClick={() => setShowCart(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            
            {cart.length === 0 ? (
              <p className="text-gray-600">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between border-b pb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">${item.discountedPrice}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total:</span>
                    <span className="text-xl font-bold text-primary">
                      ${calculateTotal().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-success">
                    <Gift className="w-4 h-4" />
                    <span>You'll earn {calculateRewardPoints()} points!</span>
                  </div>
                  <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors">
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;