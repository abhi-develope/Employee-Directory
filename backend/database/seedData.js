import { connectDB, closeDB } from './connection.js';

const seedData = async () => {
  try {
    const db = await connectDB();
    
    // Clear existing data
    await db.collection('employees').deleteMany({});
    await db.collection('departments').deleteMany({});

    // Seed departments
    const departments = [
      { name: 'Engineering', floor: 3 },
      { name: 'Marketing', floor: 2 },
      { name: 'Sales', floor: 1 }
    ];

    await db.collection('departments').insertMany(departments);

    // Seed employees
    const employees = [
      { name: 'John Doe', position: 'Senior Developer', department: 'Engineering', salary: 90000, profileVisited: 0 },
      { name: 'Jane Smith', position: 'Frontend Developer', department: 'Engineering', salary: 75000, profileVisited: 0 },
      { name: 'Mike Johnson', position: 'Marketing Manager', department: 'Marketing', salary: 80000, profileVisited: 0 },
      { name: 'Sarah Wilson', position: 'Content Creator', department: 'Marketing', salary: 60000, profileVisited: 0 },
      { name: 'David Brown', position: 'Sales Representative', department: 'Sales', salary: 55000, profileVisited: 0 },
      { name: 'Emily Davis', position: 'Sales Manager', department: 'Sales', salary: 85000, profileVisited: 0 }
    ];

    await db.collection('employees').insertMany(employees);

    console.log('Database seeded successfully!');
    console.log(`Inserted ${departments.length} departments and ${employees.length} employees`);
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await closeDB();
  }
};

seedData();