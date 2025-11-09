import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import taskService from '../../services/taskService';
import TaskList from './TaskList';
import { FiCheckCircle, FiClock, FiAlertCircle, FiTrendingUp } from 'react-icons/fi';


const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, inProgress: 0 });
  const [loading, setLoading] = useState(true);

  // ✅ Use useCallback to prevent unnecessary re-renders
  const loadStats = useCallback(async () => {
    try {
      const data = await taskService.getTasks({ limit: 1000 });
      const tasks = data.tasks || [];

      setStats({
        total: tasks.length,
        completed: tasks.filter(t => t.status === 'Completed' || t.status === 'completed').length,
        pending: tasks.filter(t => t.status === 'Pending' || t.status === 'pending').length,
        inProgress: tasks.filter(t => t.status === 'In Progress' || t.status === 'in-progress').length,
      });

      setLoading(false);
    } catch (error) {
      console.error('Failed to load stats:', error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-blue-100">Keep track of your tasks and stay productive</p>
      </div>

      {/* Stats Section */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Tasks</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stats.total}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <FiTrendingUp className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Completed</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{stats.completed}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <FiCheckCircle className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">In Progress</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">{stats.inProgress}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <FiClock className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending</p>
                <p className="text-3xl font-bold text-yellow-600 mt-1">{stats.pending}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <FiAlertCircle className="text-yellow-600" size={24} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Task List */}
      <div className="card p-0 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          {/* ✅ Pass loadStats function so stats refresh after CRUD */}
          <TaskList onTasksChange={loadStats} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
