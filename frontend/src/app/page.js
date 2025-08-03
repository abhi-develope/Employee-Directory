// File: src/app/page.js
'use client';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_EMPLOYEES, GET_EMPLOYEES_BY_DEPARTMENT } from '../lib/apollo-client';
import EmployeeList from '../components/EmployeeList';
import EmployeeForm from '../components/EmployeeForm';
import DepartmentFilter from '../components/DepartmentFilter';

export default function HomePage() {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [showForm, setShowForm] = useState(false);

  // Use different queries based on filter
  const { data: allEmployeesData, loading: allLoading, error: allError } = useQuery(
    GET_ALL_EMPLOYEES,
    { skip: selectedDepartment !== '' }
  );

  const { data: filteredEmployeesData, loading: filteredLoading, error: filteredError } = useQuery(
    GET_EMPLOYEES_BY_DEPARTMENT,
    { 
      variables: { department: selectedDepartment },
      skip: selectedDepartment === ''
    }
  );

  const employees = selectedDepartment 
    ? filteredEmployeesData?.getEmployeesByDepartment 
    : allEmployeesData?.getAllEmployees;
  
  const loading = selectedDepartment ? filteredLoading : allLoading;
  const error = selectedDepartment ? filteredError : allError;

  return (
    <div className="space-y-6">
     
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <DepartmentFilter 
          selectedDepartment={selectedDepartment}
          onDepartmentChange={setSelectedDepartment}
        />
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary whitespace-nowrap"
        >
          Add New Employee
        </button>
      </div>

      {/* Employee List */}
      <EmployeeList 
        employees={employees}
        loading={loading}
        error={error}
      />

      {/* Add Employee Form Modal */}
      {showForm && (
        <EmployeeForm
          onClose={() => setShowForm(false)}
          onSuccess={() => {
            // Optionally show success message
            console.log('Employee added successfully!');
          }}
        />
      )}
    </div>
  );
}