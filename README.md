# 🚀 Employee Directory Application

## 📱 Application Screenshots

### **Home Page - Employee List**
![Home Page](screenshots/home-page.png)
*Clean employee list with department filtering and add button*

### **Department Filter in Action**
![Department Filter](screenshots/department-filter.png)
*Filtering employees by Engineering department*

### **Add Employee Modal**
![Add Employee Form](screenshots/add-employee-form.png)
*Responsive form with validation and department dropdown*

### **Employee Detail Page**
![Employee Details](screenshots/employee-details.png)
*Complete employee information with professional layout*

### **Mobile Responsive Design**
![Mobile View](screenshots/mobile-view.png)
*Fully responsive design works perfectly on mobile devices*

### **GraphQL Playground**
![GraphQL Playground](screenshots/graphql-playground.png)
*Apollo Server 4 GraphQL playground for API testing*

---


---

## 📋 Table of Contents
- [✨ Features Implemented](#-features-implemented)
- [🏗️ Architecture Overview](#️-architecture-overview)
- [🛠️ Technology Stack](#️-technology-stack)
- [⚡ Quick Start Guide](#-quick-start-guide)
- [📱 Application Screenshots](#-application-screenshots)
- [🔧 Project Structure](#-project-structure)
- [🚀 API Documentation](#-api-documentation)
- [📊 GraphQL Queries & Mutations](#-graphql-queries--mutations)
- [🧪 Testing Instructions](#-testing-instructions)
- [💡 Key Implementation Decisions](#-key-implementation-decisions)
- [🔮 Future Enhancements](#-future-enhancements)
- [📞 Contact Information](#-contact-information)

---


## ✨ Features Implemented

### 🏠 **Home Page Features**
- **Employee List Table**: Displays all employees with name and position
- **Department Filter**: Dropdown to filter employees by department
- **Add Employee Button**: Opens modal form to add new employees
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Loading States**: Smooth loading indicators during data fetch
- **Error Handling**: User-friendly error messages

### 👤 **Employee Detail Page Features**
- **Complete Employee Information**: Shows all employee details
- **Professional Layout**: Clean card-based design with employee avatar
- **Navigation**: Easy back button to return to home page
- **Error Handling**: Graceful handling of invalid employee IDs
- **Print Functionality**: Bonus feature to print employee details

### 📝 **Add Employee Form Features**
- **Modal Interface**: Clean modal popup for adding employees
- **Form Validation**: Client-side validation with error messages
- **Department Dropdown**: Populated from database departments
- **Real-time Updates**: Employee list updates automatically after adding
- **User Feedback**: Loading states and success/error messages

### 🔍 **Advanced Features**
- **Smart Caching**: Apollo Client caches data for optimal performance
- **Real-time Sync**: Data updates across components automatically
- **Department Management**: Separate department collection with floor information
- **Search-Ready**: Architecture ready for search functionality expansion

---

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend       │    │    Database     │
│   (Next.js)     │◄───┤  (Node.js +      │◄───┤   (MongoDB)     │
│                 │    │   GraphQL)       │    │                 │
│ • Apollo Client │    │ • Apollo Server  │    │ • employees     │
│ • Tailwind CSS  │    │ • GraphQL Schema │    │ • departments   │
│ • React Hooks   │    │ • Resolvers      │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### **Data Flow**
1. **User Interaction** → Next.js Component
2. **GraphQL Query** → Apollo Client
3. **HTTP Request** → Apollo Server
4. **Database Operation** → MongoDB
5. **Response** → Apollo Client Cache
6. **UI Update** → React Component

---

## 🛠️ Technology Stack

### **Backend**
- **Node.js** - Runtime environment
- **Apollo Server 4** - GraphQL server implementation
- **GraphQL** - Query language and API standard
- **MongoDB** - NoSQL database
- **MongoDB Native Driver** - Database connection (no ORM)

### **Frontend**
- **Next.js 14** - React framework with App Router
- **React 18** - UI library with modern hooks
- **Apollo Client** - GraphQL client with intelligent caching
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

### **Development Tools**
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Nodemon** - Development server auto-restart

---

## ⚡ Quick Start Guide

### **Prerequisites**
- Node.js 18+ installed
- MongoDB running locally (or MongoDB Atlas connection)
- Git for version control

### **1. Clone & Setup**
```bash
# Clone the repository
git clone <repository-url>
cd employee-directory

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### **2. Environment Configuration**
```bash
# Backend (.env file in backend folder)
MONGODB_URI=mongodb://localhost:27017/employee-directory
NODE_ENV=development

# Frontend (automatic configuration)
# GraphQL endpoint: http://localhost:4000
```

### **3. Database Setup**
```bash
# Seed the database with sample data
cd backend
npm run seed
```

### **4. Start the Application**
```bash
# Terminal 1 - Start Backend (GraphQL Server)
cd backend
npm run dev
# Server runs on: http://localhost:4000

# Terminal 2 - Start Frontend (Next.js)
cd frontend
npm run dev
# Application runs on: http://localhost:3000
```

### **5. Access the Application**
- **Frontend**: http://localhost:3000
- **GraphQL Playground**: http://localhost:4000
- **Database**: MongoDB on port 27017

---


## 🔧 Project Structure

```
employee-directory/
├── backend/
│   ├── package.json
│   ├── server.js                 # Apollo Server setup
│   ├── schema/
│   │   ├── typeDefs.js          # GraphQL schema definitions
│   │   └── resolvers.js         # GraphQL resolvers
│   ├── database/
│   │   ├── connection.js        # MongoDB connection
│   │   └── seedData.js          # Database seeding script
│   └── .env                     # Environment variables
│
└── frontend/
    ├── package.json
    ├── next.config.js           # Next.js configuration
    ├── tailwind.config.js       # Tailwind CSS configuration
    ├── src/
    │   ├── app/
    │   │   ├── layout.js        # Root layout with Apollo Provider
    │   │   ├── page.js          # Home page
    │   │   ├── globals.css      # Global styles
    │   │   └── employee/
    │   │       └── [id]/
    │   │           └── page.js  # Employee detail page
    │   ├── components/
    │   │   ├── EmployeeList.js  # Employee list table
    │   │   ├── EmployeeForm.js  # Add employee form
    │   │   ├── DepartmentFilter.js # Department filter
    │   │   └── LoadingSpinner.js   # Loading component
    │   └── lib/
    │       └── apollo-client.js # Apollo Client configuration
    └── public/
```

---

## 🚀 API Documentation

### **GraphQL Endpoint**
- **URL**: http://localhost:4000
- **Playground**: http://localhost:4000 (interactive GraphQL IDE)

### **Schema Overview**
```graphql
# Types
type Employee {
  id: ID!
  name: String!
  position: String!
  department: String!
  salary: Float!
}

type Department {
  id: ID!
  name: String!
  floor: Int!
}

type EmployeeBasic {
  id: ID!
  name: String!
  position: String!
}

# Queries
type Query {
  getAllEmployees: [EmployeeBasic!]!
  getEmployeeDetails(id: ID!): Employee
  getEmployeesByDepartment(department: String!): [Employee!]!
  getDepartments: [Department!]!
}

# Mutations
type Mutation {
  addEmployee(
    name: String!
    position: String!
    department: String!
    salary: Float!
  ): Employee!
}
```

---

## 📊 GraphQL Queries & Mutations

### **🔍 Query Examples**

#### **Get All Employees (Basic Info)**
```graphql
query GetAllEmployees {
  getAllEmployees {
    id
    name
    position
  }
}
```

#### **Get Employee Details**
```graphql
query GetEmployeeDetails($id: ID!) {
  getEmployeeDetails(id: $id) {
    id
    name
    position
    department
    salary
  }
}
```

#### **Filter Employees by Department**
```graphql
query GetEmployeesByDepartment($department: String!) {
  getEmployeesByDepartment(department: $department) {
    id
    name
    position
    department
    salary
  }
}
```

#### **Get All Departments**
```graphql
query GetDepartments {
  getDepartments {
    id
    name
    floor
  }
}
```

### **✏️ Mutation Examples**

#### **Add New Employee**
```graphql
mutation AddEmployee($name: String!, $position: String!, $department: String!, $salary: Float!) {
  addEmployee(name: $name, position: $position, department: $department, salary: $salary) {
    id
    name
    position
    department
    salary
  }
}
```

**Variables:**
```json
{
  "name": "Alice Johnson",
  "position": "UI/UX Designer",
  "department": "Engineering",
  "salary": 70000
}
```

---

## 🧪 Testing Instructions

### **1. Backend Testing (GraphQL Playground)**
1. Start the backend server: `npm run dev`
2. Visit http://localhost:4000
3. Test queries using the examples above

### **2. Frontend Testing (Manual)**
1. Start both backend and frontend servers
2. Visit http://localhost:3000
3. Test the following features:

#### **🏠 Home Page Testing**
- [x] Employee list loads and displays correctly
- [x] Department filter dropdown populates with departments
- [x] Filter functionality works (try "Engineering", "Marketing", "Sales")
- [x] "Add New Employee" button opens modal
- [x] "View Details" links work for each employee
- [x] Responsive design on different screen sizes

#### **📝 Add Employee Form Testing**
- [x] Form validation works (try submitting empty fields)
- [x] Department dropdown shows all departments
- [x] Salary validation (try negative numbers)
- [x] Successful submission updates employee list
- [x] Form closes after successful submission
- [x] Error handling for server errors

#### **👤 Employee Detail Page Testing**
- [x] Employee details display correctly
- [x] Back button returns to home page
- [x] Invalid employee ID shows error message
- [x] Employee avatar shows initials correctly
- [x] Salary formatting displays properly

### **3. Error Handling Testing**
- [x] Invalid employee ID: `/employee/invalid-id`
- [x] Network errors: Stop backend server while using frontend
- [x] Form validation: Submit form with missing/invalid data
- [x] Empty states: Clear database and test empty employee list

---

## 📈 Performance Considerations

### **⚡ Frontend Optimizations**
- **Apollo Client Caching**: Intelligent query result caching
- **Code Splitting**: Next.js automatic code splitting
- **Image Optimization**: Next.js built-in image optimization
- **Lazy Loading**: Components loaded on demand

### **🔧 Backend Optimizations**
- **Database Indexing**: MongoDB indexes on frequently queried fields
- **Query Optimization**: Efficient GraphQL resolver implementation
- **Connection Pooling**: MongoDB connection pooling for scalability
- **Error Handling**: Graceful error handling without server crashes

### **📊 Monitoring Ready**
- **Error Logging**: Structured error logging
- **Performance Metrics**: Query execution time tracking
- **Health Checks**: API health monitoring endpoints
- **Database Monitoring**: MongoDB performance tracking

---

## 🔒 Security Considerations

### **🛡️ Implemented Security Measures**
- **Input Validation**: Server-side validation for all inputs
- **Error Handling**: Sanitized error messages (no sensitive data exposure)
- **CORS Configuration**: Proper CORS settings for production
- **Environment Variables**: Sensitive data in environment variables

### **🔐 Production Security Checklist**
- [ ] Input sanitization against injection attacks
- [ ] Rate limiting for API endpoints
- [ ] Authentication and authorization
- [ ] HTTPS encryption
- [ ] Database connection security
- [ ] Regular security updates

---



---


### **📧 Get in Touch**
- **Email**: [prajapatiabhishek320@gmail.com]
- **LinkedIn**: [your-linkedin-profile](https://www.linkedin.com/in/abhishek0prajapati/)]

### **💬 Questions Welcome**
I'm happy to discuss:
- Technical implementation details
- Architecture decisions
- Code walkthrough
- Future enhancements
- Any questions about the assignment

---

## 🙏 Thank You



---

**🚀 Ready for the next step? Let's build something amazing together!**
