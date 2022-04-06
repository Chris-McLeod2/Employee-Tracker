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
  
db.connect(function(err) {
    if (err) throw err;
  
    promptList();
 
  });
  

  function promptList() {
    inquirer
      .prompt({
        type: "list",
        choices: [
          "Add department",
          "Add role",
          "Add employee",
          "View departments",
          "View roles",
          "View employees",
          "Update employee role",
          "Quit"
        ],
        message: "Select Option",
        name: "UserChoice"
      })
      .then(function(result) {
        console.log("You entered: " + result.UserChoice);
  
        switch (result.UserChoice) {
          case "Add department":
            addDepartment();
            break;

          case "Add role":
            addRole();
            break;

          case "Add employee":
            addEmployee();
            break;

          case "View departments":
            viewDepartment();
            break;

          case "View roles":
            viewRoles();
            break;

          case "View employees":
            viewEmployees();
            break;

          case "Update employee role":
            updateEmployee();
            break;

          default:
            quit();
        }
      });
  }
  
  

  
  function viewEmployees() {

    let query = "SELECT * FROM employee";
    db.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      promptList();
    });

  }
  
  function addRole() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter role name?",
          name: "role"
        },
        {
          type: "input",
          message: "enter Roles salary?",
          name: "newRoleSalary"
        },
        {
          type: "input",
          message: "What is the department id number?",
          name: "departmentID"
        }
      ])
      .then(function(answer) {
  
  
        db.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.role, answer.newRoleSalary, answer.departmentID], function(err, res) {
          if (err) throw err;
          console.table(res);
          promptList();
        });
      });
  }
 
   
  function addDepartment() {
  
  
    inquirer.prompt({
      
        type: "input",
        message: "Enter name of Department?",
        name: "departmentName"

    }).then(function(answer){



        db.query("INSERT INTO department (name) VALUES (?)", [answer.departmentName] , function(err, res) {
            if (err) throw err;
            console.table(res)
            promptList()
    })
    })
}


  function addEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter employee's first name",
          name: "employeeFirstName"
        },
        {
          type: "input",
          message: "Enter employee's last name",
          name: "employeeLastName"
        },
        {
          type: "input",
          message: "enter employee's ID",
          name: "employeeID"
        },
        {
          type: "input",
          message: "enter manager's ID",
          name: "managerID"
        }
      ])
      .then(function(answer) {
  
        
       db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.employeeFirstName, answer.eeLastName, answer.employeeID, answer.managerID], function(err, res) {
          if (err) throw err;
          console.table(res);
          promptList();
        });
      });
  }
  

  
  
  function viewDepartment() {

    let query = "SELECT * FROM department";
    db.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      promptList();
    });
  
  }

  function updateEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "enter name of employee you would like to update",
          name: "updateEmployee"
        },
  
        {
          type: "input",
          message: "enter role you would like to update",
          name: "updateRole"
        }
      ])
      .then(function(answer) {
   
       db.query('UPDATE employee SET role_id=? WHERE first_name= ?',[answer.updateRole, answer.updateEmployee],function(err, res) {
          if (err) throw err;
          console.table(res);
          promstList();
        });
      });
  }

  
  function viewRoles() {

    let query = "SELECT * FROM role";
    db.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      promptList();
    });

  }
  
  
  function quit() {
    process.exit();
  }