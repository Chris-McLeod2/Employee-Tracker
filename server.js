// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database

const db = require('./db/connection');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

db.connect(err => {
    if (err) throw err;
});

//department prompt
function DepartmentPrompt() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'Department',
            message: 'Name of the department?',
        }
    ])
}

//Role inquirer prompts
function RolePrompt(departmentArray) {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'addRole',
            message: 'Enter Role Name'
        },
        {
            type: 'input',
            name: 'addSalary',
            message: 'Enter Salary of Role'
        },
        {
            type: 'list',
            name: 'addDepartment',
            message: 'Select associated department',
            choices: departmentArray
        }
    ])
}

//Employee prompts

function initializeApp() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'Select Option',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Quit'
            ]
        }
    ])
        .then((answers) => {
            switch (answers.menu) {
                case 'View all departments':
                    displayDepartments()
                    break;
                case 'View all roles':
                    displayRoles()
                    break;
                case 'View all employees':
                    displayEmployees()
                    break;
                case 'Add a department':
                    addDepartment()
                    break;
                case 'Add a role':
                    addRole()
                    break;
                case 'Add an employee':
                    break;
                case 'Update an employee role':
                    break;
                case 'Quit':
                    process.exit()
            }
        })
}