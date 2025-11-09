// src/components/Dashboard/TaskList.js
import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiCheckCircle, FiClock } from 'react-icons/fi';
import taskService from '../../services/taskService';
import TaskForm from './TaskForm';
import { TASK_PRIORITIES, TASK_STATUS } from '../../utils/constants';

const TaskList = ({ onTasksChange }) => { // ✅ Accept parent callback
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({ status: '', priority: '', search: '' });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, currentPage]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getTasks({ ...filters, page: currentPage, limit: 10 });
      setTasks(data.tasks);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      await taskService.createTask(taskData);
      setShowForm(false);
      await loadTasks();
      if (onTasksChange) onTasksChange(); // ✅ Notify parent
    } catch (err) {
      setError(err.message || 'Failed to create task');
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      await taskService.updateTask(editingTask._id, taskData);
      setEditingTask(null);
      setShowForm(false);
      await loadTasks();
      if (onTasksChange) onTasksChange(); // ✅ Notify parent
    } catch (err) {
      setError(err.message || 'Failed to update task');
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(id);
        await loadTasks();
        if (onTasksChange) onTasksChange(); // ✅ Notify parent
      } catch (err) {
        setError(err.message || 'Failed to delete task');
      }
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case TASK_PRIORITIES.HIGH: return 'bg-red-100 text-red-800';
      case TASK_PRIORITIES.MEDIUM: return 'bg-yellow-100 text-yellow-800';
      case TASK_PRIORITIES.LOW: return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case TASK_STATUS.COMPLETED: return 'text-green-600';
      case TASK_STATUS.IN_PROGRESS: return 'text-blue-600';
      case TASK_STATUS.PENDING: return 'text-yellow-600';
      case TASK_STATUS.CANCELLED: return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Tasks</h2>
        <button
          onClick={() => { setEditingTask(null); setShowForm(true); }}
          className="btn btn-primary"
        >
          + New Task
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="card mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search tasks..."
            value={filters.search}
            onChange={(e) => { setFilters(prev => ({ ...prev, search: e.target.value })); setCurrentPage(1); }}
            className="input-field"
          />
          <select
            value={filters.status}
            onChange={(e) => { setFilters(prev => ({ ...prev, status: e.target.value })); setCurrentPage(1); }}
            className="input-field"
          >
            <option value="">All Status</option>
            <option value={TASK_STATUS.PENDING}>Pending</option>
            <option value={TASK_STATUS.IN_PROGRESS}>In Progress</option>
            <option value={TASK_STATUS.COMPLETED}>Completed</option>
            <option value={TASK_STATUS.CANCELLED}>Cancelled</option>
          </select>
          <select
            value={filters.priority}
            onChange={(e) => { setFilters(prev => ({ ...prev, priority: e.target.value })); setCurrentPage(1); }}
            className="input-field"
          >
            <option value="">All Priorities</option>
            <option value={TASK_PRIORITIES.LOW}>Low</option>
            <option value={TASK_PRIORITIES.MEDIUM}>Medium</option>
            <option value={TASK_PRIORITIES.HIGH}>High</option>
          </select>
        </div>
      </div>

      {/* Task List */}
      {loading ? (
        <div className="text-center py-8">Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div className="card text-center py-8">
          <p className="text-gray-500">No tasks found. Create one to get started!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map(task => (
            <div key={task._id} className="card">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                  {task.description && <p className="text-gray-600 mb-3">{task.description}</p>}
                  <div className="flex flex-wrap gap-2 mb-2">
                    {task.tags && task.tags.map((tag, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">{tag}</span>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-600">
                    <div className={`flex items-center gap-1 ${getStatusColor(task.status)}`}>
                      <FiCheckCircle size={16} />
                      <span className="capitalize">{task.status}</span>
                    </div>
                    {task.dueDate && (
                      <div className="flex items-center gap-1">
                        <FiClock size={16} />
                        <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                    )}
                    {task.category && <span className="text-gray-500">{task.category}</span>}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(task)}
                    className="btn btn-secondary p-2 flex items-center justify-center"
                    title="Edit task"
                  >
                    <FiEdit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="btn btn-danger p-2 flex items-center justify-center"
                    title="Delete task"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Task Form Modal */}
      {showForm && (
        <TaskForm
          task={editingTask}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          onCancel={() => { setShowForm(false); setEditingTask(null); }}
        />
      )}
    </div>
  );
};

export default TaskList;
