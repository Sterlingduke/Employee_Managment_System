const mysql = require("mysql");
const inquirer = require("inquirer");
// require("console.table");
// const sql = require("./sql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Naladog2817",
  database: "employeesDB"
});

// connect to the mysql server and sql database
connection.connect((err) => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);

  start();

});

//view all departments function

//view all roles function

//view all employess function

//add a department function

//add a role function

//add a employee function

//update an employee roles function