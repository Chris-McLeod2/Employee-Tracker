

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
                    addEmployee()
                    break;
                case 'Update an employee role':
                    updateEmployeeRole()
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

function addDepartment() {
    DepartmentPrompt()
        .then(answer => {
            // console.log(answer.addDepartment)

            const sql = `INSERT INTO department (name) VALUES (?)`;
            const params = answer.addDepartment;

            db.query(sql, params, (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log('Added ' + params + ' to database.')
                initializeApp();
            })
        })
}

function addRole() {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
        }
        const departmentArray = [];

        for (let i = 0; i < rows.length; i++) {
            let newRows = {
                value: rows[i].id,
                name: rows[i].name
            }
            departmentArray.push(newRows)
        }

        RolePrompt(departmentArray)
            .then(answer => {
                const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
                const params = [answer.addRole, answer.addSalary, answer.addDepartment];

                db.query(sql, params, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log('Added ' + params[0] + ' to database.')
                    initializeApp();
                })
            })

    })
}

function addEmployee() {
    const sql = `SELECT id, title FROM role`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
        }
        const roleArray = [];

        for (let i = 0; i < rows.length; i++) {
            let newRows = {
                value: rows[i].id,
                name: rows[i].title
            }
            roleArray.push(newRows)
        }

        addEmployeePrompt(roleArray)
            .then(answer => {
                const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
                const params = [answer.first, answer.last, answer.role, answer.manager];

                db.query(sql, params, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log('Added ' + params[0] + ' ' + params[1] + ' to the database.')
                   initializeApp();
                })
            })

    })
}

function updateEmployeeRole() {
    const sql = `SELECT id, first_name, last_name FROM employee`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
        }
        const employeeArray = [];

        for (let i = 0; i < rows.length; i++) {
            let newRows = {
                value: rows[i].id,
                name: rows[i].first_name + " " + rows[i].last_name
            }
            employeeArray.push(newRows)
        }

        updateEmployeePrompt(employeeArray)
            .then(answer => {
                const sql = `UPDATE employee SET role_id = ? WHERE id = ? `;
                const params = [answer.role, answer.employee];

                db.query(sql, params, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log('employee role updated in database.')
                    initializeApp();
                })
            })

    })
}



initializeApp()