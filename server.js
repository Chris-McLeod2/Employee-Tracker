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
function addEmployeePrompt(roleArray) {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'first',
            message: "Enter Employee's first name"
        },
        {
            type: 'input',
            name: 'last',
            message: "Enter employee's last name"
        },
        {
            type: 'list',
            name: 'role',
            message: "Select Employee's role",
            choices: roleArray
        },
        {
            type: 'list',
            name: 'manager',
            message: "Select Employee's manager",
            choices: [
                { value: 2, name: "Bob Builder" },
                { value: 4, name: "Jake Paul" },
                { value: 5, name: "Tom Cruise" },
                { value: null , name: "TBD" }
            ]
        }
    ])
}

//Update Employee Prompts
function updateEmployeePrompt(employeeArray) {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: "Select Employee you wish to update",
            choices: employeeArray
        },
        {
            type: 'list',
            name: 'role',
            message: "Assign new Employee role",
            choices: [
                { value: 1, name: "Sales Manager" },
                { value: 2, name: "Sales Worker" },
                { value: 3, name: "Engineering Manager" },
                { value: 4, name: "Engineer" },
                { value: 5, name: "Legal Manager" },
                { value: 6, name: "Legal Worker" }
            ]
        }
    ])
}

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
                case 'View departments':
                    viewDepartments()
                    break;
                case 'View roles':
                    viewRoles()
                    break;
                case 'View all employees':
                    viewEmployees()
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

//display prompts
function viewDepartments() {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
        }
        console.table(rows);
        initializeApp();
    })
}

function viewRoles() {
    const sql = `SELECT role.id, role.title, department.name AS department, role.salary
                FROM role
                LEFT JOIN department ON role.department_id = department.id`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
        }
        console.table(rows);
        initializeApp();
    })
}

function viewEmployees() {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT (manager.first_name, " ", manager.last_name) AS manager
                FROM employee
                LEFT JOIN employee manager ON manager.id = employee.manager_id
                LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN department ON role.department_id = department.id`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
        }
        console.table(rows);
        initializeApp();
    })
}
//end of display prompts


initializeApp()