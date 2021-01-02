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
}