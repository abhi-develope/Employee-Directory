import { getDB } from '../database/connection.js';
import { ObjectId } from 'mongodb';

export const resolvers = {
  Query: {
    getAllEmployees: async () => {
      try {
        const db = getDB();
        const employees = await db.collection('employees')
          .find({})
          .project({ name: 1, position: 1 })
          .toArray();
        
        return employees.map(emp => ({
          id: emp._id.toString(),
          name: emp.name,
          position: emp.position
        }));
      } catch (error) {
        throw new Error('Failed to fetch employees');
      }
    },

    getEmployeeDetails: async (_, { id }) => {
      try {
        const db = getDB();
        
        if (!ObjectId.isValid(id)) {
          throw new Error('Invalid employee ID format');
        }

        const employee = await db.collection('employees')
          .findOne({ _id: ObjectId.createFromHexString(id) });
        
        if (!employee) {
          throw new Error('Employee not found');
        }

        return {
          id: employee._id.toString(),
          name: employee.name,
          position: employee.position,
          department: employee.department,
          salary: employee.salary
        };
      } catch (error) {
        throw new Error(error.message || 'Failed to fetch employee details');
      }
    },

    getEmployeesByDepartment: async (_, { department }) => {
      try {
        const db = getDB();
        const employees = await db.collection('employees')
          .find({ department })
          .toArray();
        
        return employees.map(emp => ({
          id: emp._id.toString(),
          name: emp.name,
          position: emp.position,
          department: emp.department,
          salary: emp.salary
        }));
      } catch (error) {
        throw new Error('Failed to fetch employees by department');
      }
    },

    getDepartments: async () => {
      try {
        const db = getDB();
        const departments = await db.collection('departments').find({}).toArray();
        
        return departments.map(dept => ({
          id: dept._id.toString(),
          name: dept.name,
          floor: dept.floor
        }));
      } catch (error) {
        throw new Error('Failed to fetch departments');
      }
    }
  },

  Mutation: {
    addEmployee: async (_, { name, position, department, salary }) => {
      try {
        const db = getDB();
        
        // Validate input
        if (!name || !position || !department || salary <= 0) {
          throw new Error('All fields are required and salary must be positive');
        }

        const newEmployee = {
          name,
          position,
          department,
          salary,
          createdAt: new Date()
        };

        const result = await db.collection('employees').insertOne(newEmployee);
        
        return {
          id: result.insertedId.toString(),
          name,
          position,
          department,
          salary
        };
      } catch (error) {
        throw new Error(error.message || 'Failed to add employee');
      }
    }
  }
};