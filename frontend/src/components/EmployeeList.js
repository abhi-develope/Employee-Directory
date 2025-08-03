'use client';
import Link from 'next/link';
import LoadingSpinner from './LoadingSpinner';

export default function EmployeeList({ employees, loading, error }) {
  if (loading) return <LoadingSpinner size="large" />;
  
  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 text-xl mb-4">Error loading employees</div>
        <div className="text-gray-600 mb-6">{error.message}</div>
      </div>
    );
  }

  if (!employees || employees.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 text-xl">No employees found</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Position
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link href={`/employee/${employee.id}`} className="flex items-center group">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                        {employee.name}
                      </div>
                    </div>
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{employee.position}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link
                    href={`/employee/${employee.id}`}
                    className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}