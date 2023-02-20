const { buildSchema } = require("graphql")

module.exports = buildSchema(`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  type Employee {
    _id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    salary: Float!
  }

  input EmployeeInput {
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    salary: Float!
  }

  type Mutation {
    createEmployee(employee:EmployeeInput): Employee
    createUser(user:UserInput): User
  }
  
  
  type Query {
    employees: [Employee!]
    users: [User!]
  }
  

  schema {
    query: Query
    mutation: Mutation
  }
  `)


