const Employee = require('../models/EmployeeModel');
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');


const employees = async () => {
  try {
    const employeesFetched = await Employee.find();
    return employeesFetched.map((employee) => ({
      ...employee._doc,
      _id: employee.id,
      createdAt: new Date(employee._doc.createdAt).toISOString(),
    }));
  } catch (error) {
    throw error;
  }
};

const createEmployee = async ({ employee }) => {
  try {
    const newEmployee = await Employee.create(employee);
    return { ...newEmployee._doc, _id: newEmployee.id };
  } catch (error) {
    throw error;
  }
};

const updateEmployee = async ({ id, employee }) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(id, employee, { new: true });
    return { ...updatedEmployee._doc, _id: updatedEmployee.id };
  } catch (error) {
    throw error;
  }
};

const deleteEmployee = async ({ id }) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    return { ...deletedEmployee._doc, _id: deletedEmployee.id };
  } catch (error) {
    throw error;
  }
};

const users = async () => {
  try {
    const usersFetched = await User.find();
    return usersFetched.map((user) => ({
      ...user._doc,
      _id: user.id,
      createdAt: new Date(user._doc.createdAt).toISOString(),
    }));
  } catch (error) {
    throw error;
  }
};

const createUser = async ({ user }) => {
  try {
    const newUser = await User.create(user);
    return { ...newUser._doc, _id: newUser.id };
  } catch (error) {
    throw error;
  }
};

const updateUser = async ({ id, user }) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
    return { ...updatedUser._doc, _id: updatedUser.id };
  } catch (error) {
    throw error;
  }
};

const deleteUser = async ({ id }) => {
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    return { ...deletedUser._doc, _id: deletedUser.id };
  } catch (error) {
    throw error;
  }
};

const signIn = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }
    return { token: user.generateAuthToken() };
  } catch (error) {
    throw error;
  }
};

const signUp = async ({ user }) => {
  try {
    const { email, password } = user;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...user, password: hashedPassword });
    return { token: newUser.generateAuthToken() };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  employees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  users,
  createUser,
  updateUser,
  deleteUser,
  signIn,
  signUp,
};
