'use client';
import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_EMPLOYEE, GET_ALL_EMPLOYEES, GET_DEPARTMENTS } from '../lib/apollo-client';

export default function EmployeeForm({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: '',
    salary: ''
  });
  const [errors, setErrors] = useState({});
  
  const { data: departmentsData } = useQuery(GET_DEPARTMENTS);
  const [addEmployee, { loading }] = useMutation(ADD_EMPLOYEE, {
    refetchQueries: [{ query: GET_ALL_EMPLOYEES }],
    onCompleted: () => {
      onSuccess?.();
      onClose();
    },
    onError: (error) => {
      setErrors({ submit: error.message });
    }
  });

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.position.trim()) newErrors.position = 'Position is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.salary || parseFloat(formData.salary) <= 0) {
      newErrors.salary = 'Salary must be a positive number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await addEmployee({
        variables: {
          name: formData.name.trim(),
          position: formData.position.trim(),
          department: formData.department,
          salary: parseFloat(formData.salary)
        }
      });
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Add New Employee</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-input ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Enter employee name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
              Position *
            </label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className={`form-input ${errors.position ? 'border-red-500' : ''}`}
              placeholder="Enter position"
            />
            {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
              Department *
            </label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className={`form-select ${errors.department ? 'border-red-500' : ''}`}
            >
              <option value="">Select Department</option>
              {departmentsData?.getDepartments?.map((dept) => (
                <option key={dept.id} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
            {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
          </div>

          <div>
            <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
              Salary *
            </label>
            <input
              type="number"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className={`form-input ${errors.salary ? 'border-red-500' : ''}`}
              placeholder="Enter salary"
              min="0"
              step="1000"
            />
            {errors.salary && <p className="text-red-500 text-sm mt-1">{errors.salary}</p>}
          </div>

          {errors.submit && (
            <div className="text-red-500 text-sm">{errors.submit}</div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Adding...' : 'Add Employee'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}