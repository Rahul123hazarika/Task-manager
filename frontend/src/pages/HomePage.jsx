import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiArrowRight, FiCheckCircle, FiLock, FiZap } from 'react-icons/fi';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white py-20 px-4">
        <div className="container max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Scalable Web App
          </h1>
          <p className="text-xl sm:text-2xl text-blue-100 mb-8">
            Manage your tasks with a modern, secure, and scalable application
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="btn btn-primary inline-flex items-center justify-center space-x-2 text-lg"
              >
                <span>Go to Dashboard</span>
                <FiArrowRight size={20} />
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="btn bg-white text-blue-600 hover:bg-gray-100 inline-flex items-center justify-center space-x-2 text-lg"
                >
                  <span>Get Started</span>
                  <FiArrowRight size={20} />
                </Link>
                <Link
                  to="/login"
                  className="btn btn-secondary inline-flex items-center justify-center space-x-2 text-lg"
                >
                  <span>Sign In</span>
                  <FiArrowRight size={20} />
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
            Why Choose Our App?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCheckCircle className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Task Management</h3>
              <p className="text-gray-600">
                Create, update, and organize your tasks with ease. Set priorities and track progress.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiLock className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Secure Authentication</h3>
              <p className="text-gray-600">
                Your data is protected with industry-standard encryption and JWT authentication.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiZap className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Fast & Scalable</h3>
              <p className="text-gray-600">
                Built with modern technologies for optimal performance and scalability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="container max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of users managing their tasks efficiently
          </p>
          {!isAuthenticated && (
            <Link
              to="/register"
              className="btn btn-primary inline-flex items-center space-x-2 text-lg"
            >
              <span>Create Account Now</span>
              <FiArrowRight size={20} />
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8 px-4">
        <div className="container max-w-7xl mx-auto text-center">
          <p>&copy; 2024 Scalable Web App. All rights reserved.</p>
          <p className="text-sm mt-2">Built with React, Node.js, and MongoDB</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
