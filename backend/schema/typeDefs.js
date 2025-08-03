export const typeDefs = `#graphql
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

  type Query {
    getAllEmployees: [EmployeeBasic!]!
    getEmployeeDetails(id: ID!): Employee
    getEmployeesByDepartment(department: String!): [Employee!]!
    getDepartments: [Department!]!
  }

  type Mutation {
    addEmployee(
      name: String!
      position: String!
      department: String!
      salary: Float!
    ): Employee!
  }
`;