const inquirer = require("inquirer");
const mysql = require("mysql");

// setting up connection to mysql database

let connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "bootcamp",
    database: "companyStructure_DB"

});


connection.connect((err => {
    if (err) throw err;
    startApp(); 
}))

const startApp = () => {
    inquirer
        .prompt({
            type: "list",
            message: "Welcome! What would you like to do?",
            name: "menu",
            choices: [
                "View All Employees",
                "View Employees by Department",
                "View Employees by Manager",
                "Add Employee",
                "Remove Employee",
                "Edit Employee",
                "Quit"
            ]
        })
        .then((answer) => {
            switch (answer.menu) {
                case "View All Employees":
                    viewAllEmployees();
                    break;

                case "View Employees by Department":
                    viewByDeparment();
                    break;

                case "View Employees by Manager":
                    viewByManager();
                    break;

                case "Add Employee":
                    addEmployee();
                    break;

                case "Remove Employee":
                    removeEmployee();
                    break;

                case "Edit Employee":
                    editEmployee();
                    break;
                
                case "Quit":
                    console.log("See you later!");
                    connection.end();
            }
        })
}

const viewAllEmployees = () => {
    let query = "SELECT employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.manager_first, manager.manager_last) AS manager ";
        query += "FROM department INNER JOIN role ON role.department_id = department.id ";
        query += "INNER JOIN employee ON employee.role_id = role.id ";
        query += "LEFT JOIN manager ON manager.id = employee.manager_id;";

    connection.query(query,(err,res) => {
        if (err) throw err;
        console.log("-------------------------");
        console.table(res);
        console.log("-------------------------")
        console.log("What's next?");
        startApp();
    })
}


const viewByDeparment = () => {
    let query = "SELECT employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.manager_first, manager.manager_last) AS manager ";
    query += "FROM department INNER JOIN role ON role.department_id = department.id ";
    query += "INNER JOIN employee ON employee.role_id = role.id ";
    query += "LEFT JOIN manager ON manager.id = employee.manager_id ";
    query += "ORDER BY department.name ASC";

    connection.query(query, (err,res) => {
        if (err) throw err;
        console.log("-------------------------");
        console.table(res);
        console.log("-------------------------")
        console.log("What's next?");
        startApp();
    })
}

const viewByManager = () => {
    let query = "SELECT employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.manager_first, manager.manager_last) AS manager ";
    query += "FROM department INNER JOIN role ON role.department_id = department.id ";
    query += "INNER JOIN employee ON employee.role_id = role.id ";
    query += "INNER JOIN manager ON manager.id = employee.manager_id ";
    query += "ORDER BY manager.manager_first ASC";

    connection.query(query, (err,res) => {
        if (err) throw err;
        console.log("-------------------------");
        console.table(res);
        console.log("-------------------------")
        console.log("What's next?");
        startApp();
    })
}