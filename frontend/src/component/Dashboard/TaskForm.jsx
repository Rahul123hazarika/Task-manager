// src/components/Dashboard/TaskForm.jsx
import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { TASK_PRIORITIES, TASK_STATUS } from '../../utils/constants';

const TaskForm = ({ task, onSubmit, onCancel, loading = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: TASK_PRIORITIES.MEDIUM,
    status: TASK_STATUS.PENDING,
    dueDate: '',
    category: 'general',
    tags: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || TASK_PRIORITIES.MEDIUM,
        status: task.status || TASK_STATUS.PENDING,
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
        category: task.category || 'general',
        tags: (task.tags || []).join(', ')
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const submitData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };
    onSubmit(submitData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {task ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Task Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter task title"
            />
            {errors.title && <p className="error-message">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="input-field"
              placeholder="Enter task description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Priority</label>
              <select name="priority" value={formData.priority} onChange={handleChange} className="input-field">
                <option value={TASK_PRIORITIES.LOW}>Low</option>
                <option value={TASK_PRIORITIES.MEDIUM}>Medium</option>
                <option value={TASK_PRIORITIES.HIGH}>High</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="input-field">
                <option value={TASK_STATUS.PENDING}>Pending</option>
                <option value={TASK_STATUS.IN_PROGRESS}>In Progress</option>
                <option value={TASK_STATUS.COMPLETED}>Completed</option>
                <option value={TASK_STATUS.CANCELLED}>Cancelled</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Due Date</label>
              <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} className="input-field" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Category</label>
              <input type="text" name="category" value={formData.category} onChange={handleChange} className="input-field" placeholder="e.g., work, personal" />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Tags (comma-separated)</label>
            <input type="text" name="tags" value={formData.tags} onChange={handleChange} className="input-field" placeholder="tag1, tag2, tag3" />
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : task ? 'Update Task' : 'Create Task'}
            </button>
            <button type="button" onClick={onCancel} className="btn btn-secondary flex-1">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
