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
                "Edit Employee Role",
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

                case "Edit Employee Role":
                    editEmployeeRole();
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

const editEmployeeRole = () => {
    let query = "SELECT employee.id, employee.first_name AS employeeFirst, employee.last_name AS employeeLast, employee.role_id, role.title FROM role INNER JOIN employee ON employee.role_id = role.id";

    
    
    connection.query(query, (err, res) => {
        if (err) throw err;
    
        connection.query("SELECT * FROM companyStructure_DB.role; ", (error, response) => {
            if (err) throw err;
            inquirer.prompt([
                {
                name: "employeePick",
                type: "rawlist",
                message: "Which employee would you like to edit?",
                choices: () => {
                    let choiceArr = [];
                    for (let i = 0; i < res.length; i++) {
                        const items = res[i];
                        choiceArr.push(`${items.employeeFirst} ${items.employeeLast} | EmployeeID:${items.id}`)
                    }
                    return choiceArr;
                }
            },
            {
                name: "roleChange",
                type: "rawlist",
                message: "Which role are they changing to?",
                choices: () => {
                    let optionsArr = [];
                    for (let j = 0; j < response.length; j++) {
                        const roles = response[j];
                        optionsArr.push(`${roles.title} | Role Id:${roles.id}`)
                    }
                    return optionsArr;
                }     
            }
        ])
        .then((answer) => {

            const splitArr = answer.employeePick.split(":");
            const employeeID = splitArr[1];

            const splitRole = answer.roleChange.split(":");
            const roleID = parseInt(splitRole[1]);
            
            connection.query(
                `SELECT employee.id, employee.first_name AS employeeFirst, employee.last_name AS employeeLast, employee.role_id, role.title FROM employee INNER JOIN role ON role.id = employee.role_id WHERE employee.id = ${employeeID.toString()}; `, (err2,res2) => {
                if (err2) throw err2;

                let newRole;

                if (res2[0].role_id === roleID) {
                    console.log("They are already this role. Please choose another.");
                    editEmployeeRole();
                } else {
                    newRole = roleID;

                    connection.query("UPDATE companyStructure_DB.employee SET ? WHERE ?",
                    [
                        {
                            role_id: newRole,
                        },
                        {
                            id: employeeID,
                        }
                    ],
                    (error) => {
                        if (error) throw error;
                        console.log("Employee's role has been updated!");
                        startApp();
                    })
                }
            })

        })
        })
    })
    
}