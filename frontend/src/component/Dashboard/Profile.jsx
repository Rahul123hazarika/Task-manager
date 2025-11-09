import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import userService from '../../services/userService';
import { FiEdit2, FiSave, FiX } from 'react-icons/fi';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await userService.getProfile();
      setProfile(data);
      setFormData(data);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to load profile');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setError('');
      setSuccess('');
      const updatedUser = await userService.updateProfile(formData);
      setProfile(updatedUser);
      setUser(updatedUser);
      setIsEditing(false);
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-primary flex items-center space-x-2"
            >
              <FiEdit2 size={18} />
              <span>Edit</span>
            </button>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
            {success}
          </div>
        )}

        {profile && (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  className="input-field"
                />
              ) : (
                <p className="text-gray-600">{profile.name}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <p className="text-gray-600">{profile.email}</p>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Phone</label>
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter your phone number"
                />
              ) : (
                <p className="text-gray-600">{profile.phone || 'Not provided'}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Bio</label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={formData.bio || ''}
                  onChange={handleChange}
                  rows="4"
                  className="input-field"
                  placeholder="Tell us about yourself"
                />
              ) : (
                <p className="text-gray-600">{profile.bio || 'No bio provided'}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Role</label>
              <p className="text-gray-600 capitalize">{profile.role}</p>
            </div>

            {isEditing && (
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={handleSave}
                  className="btn btn-primary flex items-center space-x-2"
                >
                  <FiSave size={18} />
                  <span>Save Changes</span>
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setFormData(profile);
                  }}
                  className="btn btn-secondary flex items-center space-x-2"
                >
                  <FiX size={18} />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
