import React, { useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import LoadingSpinner from './LoadingSpinner';

const GET_EMPLOYEE_DETAILS = gql`
  query GetEmployeeDetails($id: ID!) {
    getEmployeeDetails(id: $id) {
      id
      name
      position
      department
      salary
      profileVisited
    }
  }
`;

const INCREMENT_PROFILE_VISITED = gql`
  mutation IncrementProfileVisited($id: ID!) {
    incrementProfileVisited(id: $id) {
      id
      profileVisited
    }
  }
`;

export default function EmployeeDetailModal({ employee, onClose }) {
  const { loading, error, data, refetch } = useQuery(GET_EMPLOYEE_DETAILS, {
    variables: { id: employee.id },
    skip: !employee.id
  });

  const [incrementProfileVisited] = useMutation(INCREMENT_PROFILE_VISITED);

  const employeeDetails = data?.getEmployeeDetails;

  // Increment profile visited when modal opens
  useEffect(() => {
    if (employee.id) {
      incrementProfileVisited({ variables: { id: employee.id } })
        .then(() => {
          refetch();
        })
        .catch((error) => {
          console.error('Error incrementing profile visited:', error);
        });
    }
  }, [employee.id, incrementProfileVisited, refetch]);

  if (!employee) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        
        <div className="flex items-center mb-4">
          <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mr-4">
            <span className="text-2xl font-bold text-blue-600">
              {employee.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <div className="text-xl font-semibold text-gray-900">{employee.name}</div>
            <div className="text-gray-500">{employee.position}</div>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center py-4">
            <LoadingSpinner size="medium" />
          </div>
        )}

        {error && (
          <div className="text-red-500 text-center py-4">
            Error loading employee details: {error.message}
          </div>
        )}

        {employeeDetails && (
          <div className="space-y-3">
            <div className="border-t pt-4">
              <div className="grid grid-cols-1 gap-3">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Name:</span>
                  <span className="text-gray-900">{employeeDetails.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Position:</span>
                  <span className="text-gray-900">{employeeDetails.position}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Department:</span>
                  <span className="text-gray-900">{employeeDetails.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Salary:</span>
                  <span className="text-gray-900">
                    ${employeeDetails.salary.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Profile Visited:</span>
                  <span className="text-gray-900">
                    {employeeDetails.profileVisited} time{employeeDetails.profileVisited !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 