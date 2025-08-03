// File: src/app/employee/[id]/page.js
'use client';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { GET_EMPLOYEE_DETAILS } from '../../../lib/apollo-client';
import LoadingSpinner from '../../../components/LoadingSpinner';

export default function EmployeeDetailPage({ params }) {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_EMPLOYEE_DETAILS, {
    variables: { id: params.id },
    errorPolicy: 'all'
  });

  if (loading) return <LoadingSpinner size="large" />;

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 text-xl mb-4">Employee Not Found</div>
        <div className="text-gray-600 mb-6">{error.message}</div>
        <button
          onClick={() => router.push('/')}
          className="btn-primary"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const employee = data?.getEmployeeDetails;

  if (!employee) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 text-xl">Employee not found</div>
        <button
          onClick={() => router.push('/')}
          className="btn-primary mt-4"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => router.push('/')}
        className="btn-secondary mb-6 flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </button>

      {/* Employee Details Card */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-blue-600">
              {employee.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{employee.name}</h1>
          <p className="text-xl text-gray-600">{employee.position}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Department</label>
              <div className="text-lg text-gray-900">{employee.department}</div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Position</label>
              <div className="text-lg text-gray-900">{employee.position}</div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Salary</label>
              <div className="text-lg text-gray-900 font-semibold">
                ${employee.salary.toLocaleString()}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Employee ID</label>
              <div className="text-lg text-gray-900 font-mono text-sm break-all">{employee.id}</div>
            </div>
          </div>
        </div>

        {/* Additional Employee Information */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Employee Summary</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700">
              <strong>{employee.name}</strong> works as a <strong>{employee.position}</strong> in the <strong>{employee.department}</strong> department with an annual salary of <strong>${employee.salary.toLocaleString()}</strong>.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4 justify-center">
          <button
            onClick={() => router.push('/')}
            className="btn-primary"
          >
            Back to Employee List
          </button>
          <button
            onClick={() => window.print()}
            className="btn-secondary"
          >
            Print Details
          </button>
        </div>
      </div>
    </div>
  );
}