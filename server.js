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