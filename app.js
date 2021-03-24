const mysql = require("mysql2");
const inquirer = require("inquirer");

require('console.table');
// const sql = require("./db/schema.sql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employeeDB"
});

// connect to the mysql server and sql database
connection.connect((err) => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);

  start();

});

function start() {




  inquirer
      .prompt({
          name: "userPick",
          type: "list",
          message: "What would you like to do?",
          loop: false,
          choices: [
              "Add Department",
              "Add Role",
              "Add Employee",
              "View All Departments",
              "View All Roles",
              "View All Employees",
              "Update Employee Role",
              "View All Employee By Department",
              "View All Employee By Manager",
              "Remove Employee",
              "EXIT"
          ]
      })

      .then(answers => {

          switch (answers.userPick) {

              case "View All Employees":
                  viewEmployees();
                  break;

              case "View All Departments":
                  viewDepartments();
                  break;

              case "View All Roles":
                  viewRoles();
                  break;

              case "View All Employee By Department":
                  viewByDepartment();
                  break;

              case "View All Employee By Manager":
                  viewByManager();
                  break;

              case "Add Employee":
                  addEmployee();
                  break;

              case "Add Role":
                  addRole();
                  break;

              case "Add Department":
                  addDepartment();
                  break;

              case "Remove Employee":
                  removeEmployee();
                  break;

              case "Update Employee Role":
                  updateRole();
                  break;

              case "EXIT":
                  connection.end();
                  break;

          };
      });
}



///////////////////////////////////////////////// SQL QUERIES ///////////////////////////////////////////////////////

async function viewEmployees() {
  const SQL_STATEMENT = `SELECT employee.id, first_name, last_name, title, department.department, role.salary, manager.manager 
  FROM (((employee 
  INNER JOIN role 
  ON employee.role_id = role.id) 
  INNER JOIN department 
  ON role.department_id = department.id) 
  LEFT JOIN manager 
  ON employee.manager_id = manager.id)`;

  const [rows, fields] = await connection.promise().query(SQL_STATEMENT);
  console.log("\t");
  console.table(rows);
  start();
}

async function viewDepartments() {
  const SQL_STATEMENT = `SELECT * FROM department`;

  const [rows, fields] = await connection.promise().query(SQL_STATEMENT);
  console.log("\t");
  console.table(rows);
  start();
}

async function viewRoles() {
  const SQL_STATEMENT = `SELECT role.id, title, salary, title, department.department
  FROM (role 
  INNER JOIN department 
  ON role.department_id = department.id)`;

  const [rows, fields] = await connection.promise().query(SQL_STATEMENT);
  console.log("\t");
  console.table(rows);
  start();
}

async function viewByDepartment() {

  const [departmentList, fields2] = await connection.promise().query("SELECT * FROM department");
  // console.log(departmentList);
  inquirer
      .prompt({
          name: "departmentSelect",
          type: "list",
          message: "Which department would you like to search?",
          choices: departmentList.map(department => department.department),
          loop: false
      })

      .then(async function (answer) {

          const SQL_STATEMENT = `SELECT employee.id, first_name, last_name, title, department.department 
          FROM ((employee 
          INNER JOIN role 
          ON employee.role_id = role.id) 
          INNER JOIN department 
          ON role.department_id = department.id) 
          WHERE department.department = "${answer.departmentSelect}"`;

          const [rows, fields] = await connection.promise().query(SQL_STATEMENT);
          console.log("\t");
          console.table(rows);
          start();
      });
}

async function viewByManager() {

  const [managerList, fields2] = await connection.promise().query("SELECT * FROM manager");
  // console.log(managerList);
  inquirer
      .prompt({
          name: "managerSelect",
          type: "list",
          message: "Which manager would you like to search?",
          choices: managerList.map(manager => manager.manager),
          loop: false
      })

      .then(async function (answer) {

          const SQL_STATEMENT = `SELECT employee.id, first_name, last_name, title, manager.manager, department.department
          FROM (((employee 
          INNER JOIN role 
          ON employee.role_id = role.id) 
          INNER JOIN department 
          ON role.department_id = department.id) 
          INNER JOIN manager 
          ON employee.manager_id = manager.id) 
          WHERE manager.manager = "${answer.managerSelect}"`;

          const [rows, fields] = await connection.promise().query(SQL_STATEMENT);
          console.log("\t");
          console.table(rows);
          start();
      });
}


async function addEmployee() {

  const [roleList, fields1] = await connection.promise().query("SELECT * FROM role");
  // console.log(roleList);
  const roleWithId = roleList.map(({ id, title }) => ({
      value: id, name: `${title}`
  }));

  inquirer
      .prompt([
          {
              name: "first_name",
              type: "input",
              message: "what is the employee's first name?"
          },
          {
              name: "last_name",
              type: "input",
              message: "what is the employee's last name?"
          },
          {
              name: "role_id",
              type: "list",
              choices: roleWithId,
              loop: false
          }
      ])

      .then(async function (answer) {

          switch (answer.role_id) {

              case 1:
                  var newManagerId = 0;
                  break;
              case 2:
                  var newManagerId = 1;
                  break;
              case 3:
                  var newManagerId = 0;
                  break;
              case 4:
                  var newManagerId = 3;
                  break;
              case 5:
                  var newManagerId = 0;
                  break;
              case 6:
                  var newManagerId = 5;
                  break;
              case 7:
                  var newManagerId = 0;
                  break;
              case 8:
                  var newManagerId = 7;
                  break;

          };

          var SQL_STATEMENT = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
          VALUES ("${answer.first_name}", "${answer.last_name}", ${answer.role_id}, ${newManagerId})`;

          const [rows, fields] = await connection.promise().query(SQL_STATEMENT);

          console.log("\t");
          console.log("Added new Employee Below");

          const SQL_STATEMENT_UPDATED = `SELECT employee.id, first_name, last_name, title, department.department, role.salary, manager.manager 
          FROM (((employee 
          INNER JOIN role 
          ON employee.role_id = role.id) 
          INNER JOIN department 
          ON role.department_id = department.id) 
          LEFT JOIN manager 
          ON employee.manager_id = manager.id)
          WHERE employee.first_name = "${answer.first_name}" AND employee.last_name = "${answer.last_name}"`;

          const [rows1, fields1] = await connection.promise().query(SQL_STATEMENT_UPDATED);
          console.log("\t");
          console.table(rows1);
          start();

      });
}

async function addDepartment() {

  inquirer
      .prompt([
          {
              name: "department",
              type: "input",
              message: "what is the department name to add?"
          }
      ])

      .then(async function (answer) {

          var SQL_STATEMENT = `INSERT INTO department (department)
          VALUES ("${answer.department}")`;

          const [rows, fields] = await connection.promise().query(SQL_STATEMENT);

          console.log("\t");
          console.log("Added new Department Below");

          const SQL_STATEMENT_UPDATED = `SELECT id, department
          FROM department
          WHERE department.department = "${answer.department}"`;

          const [rows1, fields1] = await connection.promise().query(SQL_STATEMENT_UPDATED);
          console.log("\t");
          console.table(rows1);
          start();

      });
}

async function addRole() {

  const [departmentList, fields2] = await connection.promise().query(`SELECT * FROM department`);
  // console.log(departmentList);

  const departmentChoices = departmentList.map(({ id, department }) => ({
      value: id, name: department
  }));
  // console.log(departmentChoices);

  inquirer
      .prompt([
          {
              name: "title",
              type: "input",
              message: "what is the new role to add?"
          },
          {
              name: "salary",
              type: "input",
              message: "How much is the salary?"
          },
          {
              name: "department_id",
              type: "list",
              message: "What is the department of this role?",
              choices: departmentChoices,
              loop: false
          }
      ])

      .then(async function (answer) {

          // console.log(answer);

          var SQL_STATEMENT = `INSERT INTO role (title, salary, department_id)
          VALUES ("${answer.title}", ${answer.salary}, ${answer.department_id})`;

          const [rows, fields] = await connection.promise().query(SQL_STATEMENT);

          console.log("\t");
          console.log("Added new role below");

          const SQL_STATEMENT_UPDATED = `SELECT role.id, title, salary, department.department
          FROM (role
          INNER JOIN department 
          ON role.department_id = department.id) 
          WHERE role.title = "${answer.title}" AND role.department_id = ${answer.department_id}`;

          const [rows1, fields1] = await connection.promise().query(SQL_STATEMENT_UPDATED);
          console.log("\t");
          console.table(rows1);
          start();

      });
}

async function removeEmployee() {

  const [employeeList, fields1] = await connection.promise().query("SELECT * FROM employee");
  const employeeIdFirstSecond = employeeList.map(({ id, first_name, last_name }) => ({
      value: id, name: `${first_name} ${last_name}`
  }));

  inquirer
      .prompt([
          {
              name: "selectedRemoveEmployee",
              type: "list",
              message: "Which employee would you like to remove?",
              choices: employeeIdFirstSecond,
              loop: false
          }
      ])
      .then(async function (answer) {
          // console.log(answer);
          var SQL_STATEMENT = `DELETE FROM employee WHERE id = ?`;
          const [rows, fields] = await connection.promise().query(SQL_STATEMENT, [answer.selectedRemoveEmployee]);
          console.log("\t");
          console.log("Removed selected employee. Here's the updated table");

          const SQL_STATEMENT_UPDATED = `SELECT employee.id, first_name, last_name, title, department.department, role.salary, manager.manager 
          FROM (((employee 
          INNER JOIN role 
          ON employee.role_id = role.id) 
          INNER JOIN department 
          ON role.department_id = department.id) 
          LEFT JOIN manager 
          ON employee.manager_id = manager.id)`;

          const [rows1, fields1] = await connection.promise().query(SQL_STATEMENT_UPDATED);
          console.log("\t");
          console.table(rows1);
          start();
      })
}


async function updateRole() {

  const [employeeList, fields1] = await connection.promise().query("SELECT * FROM employee");
  // console.log(employeeList);
  const employeeIdFirstSecond = employeeList.map(({ id, first_name, last_name }) => ({
      value: id, name: `${first_name} ${last_name}`
  }));
  // console.log(employeeIdFirstSecond);
  const [roleList, fields2] = await connection.promise().query("SELECT * FROM role");
  // console.log(roleList);
  const roleWithId = roleList.map(({ id, title }) => ({
      value: id, name: `${title}`
  }));

  inquirer
      .prompt([
          {
              name: "roleChangeEmployee",
              type: "list",
              message: "which person would you like to change role?",
              // choices: employeeList.map(employee => employee.first_name)
              choices: employeeIdFirstSecond,
              loop: false
          },
          {
              name: "newRole",
              type: "list",
              message: "which role would you like to change to?",
              choices: roleWithId,
              loop: false
          }
      ])
      .then(async function (answer) {
          // console.log("answer.newRole " + answer.newRole);
          // console.log("answer.roleChangeEmployee " + answer.roleChangeEmployee);

          const SQL_STATEMENT = `UPDATE employee
          SET role_id = ?
          WHERE id = ?`;

          const [rows, fields] = await connection.promise().query(SQL_STATEMENT, [answer.newRole, answer.roleChangeEmployee]);

          switch (answer.newRole) {

              case 1:
                  var newManagerId = 0;
                  break;
              case 2:
                  var newManagerId = 1;
                  break;
              case 3:
                  var newManagerId = 0;
                  break;
              case 4:
                  var newManagerId = 3;
                  break;
              case 5:
                  var newManagerId = 0;
                  break;
              case 6:
                  var newManagerId = 5;
                  break;
              case 7:
                  var newManagerId = 0;
                  break;
              case 8:
                  var newManagerId = 7;
                  break;

          };
          // console.log("newManagerId " + newManagerId);
          // console.log("answer.roleChangeEmployee " + answer.roleChangeEmployee);

          const SQL_STATEMENT_MANAGER = `UPDATE employee
          SET manager_id = "${newManagerId}"
          WHERE id = "${answer.roleChangeEmployee}"`;
          const [rows2, fields2] = await connection.promise().query(SQL_STATEMENT_MANAGER);
          console.log("\t");
          console.log("Updated Employee Role Below");

          const SQL_STATEMENT_UPDATED = `SELECT employee.id, first_name, last_name, title, department.department, role.salary, manager.manager 
          FROM (((employee 
          INNER JOIN role 
          ON employee.role_id = role.id) 
          INNER JOIN department 
          ON role.department_id = department.id) 
          LEFT JOIN manager 
          ON employee.manager_id = manager.id)
          WHERE employee.id = "${answer.roleChangeEmployee}"`;

          const [rows3, fields3] = await connection.promise().query(SQL_STATEMENT_UPDATED);
          console.log("\t");
          console.table(rows3);
          start();
      })
};
//view all departments function

//view all roles function

//view all employess function

//add a department function

//add a role function

//add a employee function

//update an employee roles function