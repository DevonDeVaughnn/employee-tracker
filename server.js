var mysql = require("mysql");
var inquirer = require("inquirer");
const { allowedNodeEnvironmentFlags } = require("process");
const { error } = require("console");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "employee_db",
});

connection.connect(function (err) {
  if (err) throw err;
  runApp();
});

function runApp() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add department",
        "Add role",
        "Add employee",
        "View employee by department",
        "View employee by role",
        "View an employee",
        "Update an employee's role",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Add a department":
          addDepartment();
          break;

        case "Add new role":
          addRole();
          break;

        case "Add employee":
          addEmployee();
          break;

        case "View employees by department":
          viewByDept();
          break;

        case "View employee by role":
          viewByRole();
          break;

        case "View all employees":
          viewAll();
          break;

        case "Update employee role":
          updateEmployeeRole();
          break;
      }
    });
}

function addDepartment() {
  inquirer
    .prompt({
      name: "dept",
      type: "input",
      message: "What is the name of the new department?",
    })
    .then(function (answer) {
      connection.query(
        "INSERT INTO employee_db.department(dpt_name) VALUES('" +
          answer.dept +
          "')",
        function (err, res) {
          if (err) throw err;
          console.table(res);
        }
      );
      runApp();
    });
}

function addRole() {
  const questions = [
    {
      name: "title",
      type: "input",
      message: "What is the title of the new role?",
    },

    {
      name: "salary",
      type: "input",
      message: "What is the base salary",
    },

    {
      name: "departmentId",
      type: "input",
      message: "What is the department ID",
    },
  ];

  inquirer.prompt(questions).then(function (answer) {
    let queryStrRole =
      "INSERT INTO employee_db.role(title, Salary, department_id) VALUES('" +
      answer.title +
      "', " +
      answer.salary +
      ", " +
      answer.departmentId +
      ")";
    connection.query(queryStrRole, function (err, res) {
      if (err) throw err;
      console.table(res);
    });
    runApp();
  });
}

function addEmployee() {
  const questions = [
    {
      name: "firstName",
      type: "input",
      message: "What is the new employee's first name?",
    },

    {
      name: "lastName",
      type: "input",
      message: "What is the new employee's last name?",
    },

    {
      name: "roleId",
      type: "input",
      message: "What is the new employee's role ID?",
    },

    {
      name: "managerId",
      type: "input",
      message: "What is the new employee's manager's ID?",
    },
  ];

  inquirer.prompt(questions).then(function (answer) {
    let queryStr =
      "INSERT INTO employee_db.employee(first_name, last_name, role_id, manager_id) VALUES('" +
      answer.firstName +
      "', '" +
      answer.lastName +
      "', " +
      answer.roleId +
      ", " +
      answer.managerId +
      ")";
    connection.query(queryStr, function (err, res) {
      if (err) throw err;
      console.table(res);
    });
    runApp();
  });
}

function viewByDept() {
  const question = [
    {
      name: "DptName",
      type: "input",
      message: "What department would you like to see?",
    },
  ];
  inquirer.prompt(question).then(function (answer) {
    let query =
      "SELECT * FROM employee INNER JOIN role ON role.id = employee.role_id INNER JOIN department ON department.id and role.department_id WHERE department.dpt_name = ?";

    connection.query(query, [answer.DptName], function (err, res) {
      if (err) throw err;
      console.table(res);
      runApp();
    });
  });
}
function viewByRole() {
  const question = [
    {
      name: "roleName",
      type: "input",
      message: "What role would you like to see?",
    },
  ];
  inquirer.prompt(question).then(function (answer) {
    let query =
      "SELECT * FROM role LEFT JOIN employee ON role.id = employee.role_id WHERE role.title = ?";

    connection.query(query, [answer.roleName], function (err, res) {
      if (err) throw err;
      console.table(res);
      runApp();
    });
  });
}

function viewAll(data) {
  let query = "SELECT * FROM employee_db.employee;";

  connection.query(query, function (err, data) {
    console.log(data);
    console.table(data);
    runApp();
  });
}

function updateEmployeeRole(table) {
  let query = "SELECT * FROM employee_db.employee;";

  connection.query(query, function (err, data) {
    let question = {
      name: "action",
      type: "list",
      message: "Please select an employee from the list to update the role",
      choices: [],
    };

    data.forEach((element) => {
      question.choices.push(
        element.id + ": " + element.first_name + " " + element.last_name
      );
    });

    inquirer
      .prompt(question)

      .then(function (answer) {
        let id = answer.action.split(":")[0];

        let query =
          "SELECT * FROM employee_db.employee(title, Salary, department_id) VALUES('" +
          answer.title +
          "', " +
          answer.salary +
          ", " +
          answer.departmentId +
          ")";
        connection.query(queryStrRole, function (err, res) {
          if (err) throw err;
          console.table(res);

          update_employee_db.employee;
          set_role_id = 2;
          where_id = 2;
        });
        runApp();
      });
  });
}
