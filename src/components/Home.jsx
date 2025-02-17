import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Stethoscope, Ambulance, PlusCircle, Wallet, ArrowRight } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, link }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border border-gray-100">
    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <Link to={link} className="inline-flex items-center text-primary hover:text-primary/80 font-semibold">
      Learn More <ArrowRight className="ml-2 h-4 w-4" />
    </Link>
  </div>
);

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl font-bold mb-6">Your Health, Our Priority</h1>
            <p className="text-xl mb-8">Revolutionizing healthcare with blockchain technology, real-time tracking, and seamless digital solutions.</p>
            <div className="flex gap-4">
              <Link to="/certificates" className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Get Started
              </Link>
              <Link to="/blood-donation" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Donate Blood
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '10K+', label: 'Verified Doctors' },
              { number: '50K+', label: 'Blood Donations' },
              { number: '24/7', label: 'Emergency Support' },
              { number: '100K+', label: 'Happy Patients' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <h2 className="text-4xl font-bold text-primary mb-2">{stat.number}</h2>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Comprehensive healthcare solutions designed to provide you with the best medical services and support.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={PlusCircle}
              title="Certificate Verification"
              description="Verify medical professionals' credentials with blockchain technology"
              link="/certificates"
            />
            <FeatureCard
              icon={Heart}
              title="Blood Donation"
              description="Schedule donations and track your contribution history"
              link="/blood-donation"
            />
            <FeatureCard
              icon={Ambulance}
              title="Emergency Services"
              description="Real-time ambulance tracking and emergency support"
              link="/ambulance"
            />
            <FeatureCard
              icon={Wallet}
              title="Medicine Marketplace"
              description="Compare prices and order medicines online"
              link="/marketplace"
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Experience Better Healthcare?</h2>
            <p className="text-white/90 mb-8">Join thousands of satisfied users who have transformed their healthcare experience with our platform.</p>
            <Link to="/certificates" className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get Started Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;