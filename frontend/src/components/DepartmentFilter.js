'use client';
import { useQuery } from '@apollo/client';
import { GET_DEPARTMENTS } from '../lib/apollo-client';

export default function DepartmentFilter({ selectedDepartment, onDepartmentChange }) {
  const { data, loading, error } = useQuery(GET_DEPARTMENTS);

  if (loading) return <div className="w-48 h-10 bg-gray-200 animate-pulse rounded-lg"></div>;
  if (error) return <div className="text-red-500 text-sm">Error loading departments</div>;

  return (
    <div className="mb-6">
      <label htmlFor="department-filter" className="block text-sm font-medium text-gray-700 mb-2">
        Filter by Department
      </label>
      <select
        id="department-filter"
        value={selectedDepartment}
        onChange={(e) => onDepartmentChange(e.target.value)}
        className="form-select max-w-xs"
      >
        <option value="">All Departments</option>
        {data?.getDepartments?.map((dept) => (
          <option key={dept.id} value={dept.name}>
            {dept.name} (Floor {dept.floor})
          </option>
        ))}
      </select>
    </div>
  );
}