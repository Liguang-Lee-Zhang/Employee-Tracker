// Import and require mysql2
const mysql = require('mysql2/promise');
const inquirer = require('inquirer');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // TODO: Add MySQL password here
        password: 'password',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

const viewDepartments = () => {
    sql = `SELECT * FROM department ORDER BY id ASC`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.error({ error: err.message });
            return;
        }
        console.table(rows);
    });
}

const viewRoles = () => {
    sql = `SELECT role.id, title, salary, department.name FROM role LEFT JOIN department ON role.department_id = department.id`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.error({ error: err.message });
            return;
        }
        console.table(rows);
    });
}

const viewEmployees = () => {
    sql = ` SELECT e1.id AS id, e1.first_name AS first_name, e1.last_name AS last_name, role.title AS title,
            department.name AS department, role.salary AS salary, CONCAT(e2.first_name, ' ', e2.last_name) AS manager
            FROM employee e1
            LEFT JOIN employee e2 ON e1.manager_id = e2.id
            JOIN role ON e1.role_id = role.id
            JOIN department ON role.department_id = department.id; `;
    db.query(sql, (err, rows) => {
        if (err) {
            console.error({ error: err.message });
            return;
        }
        console.table(rows);
    });
}

const addDepartment = (response) => {
    sql = `INSERT INTO department(name) VALUES(?) `;
    const params = [response.departmentName];
    db.query(sql, params, (err, rows) => {
        if (err) {
            console.error({ error: err.message });
            return;
        }
        console.log(`Added ${response.departmentName} to the database`);
    });
}

const addRole = (response) => {

    db.query('SELECT id FROM department WHERE name = ?', [response.department], (err, rows) =>{
         const departmentID = departmentRows[0].id;
         db.query('INSERT INTO role(name, salary, department_id) VALUES(?,?,?)', [response.role, response.salary, departmentID]);
        console.log(`Added ${response.role} to the database`);

});



}

const addEmployee = (response) => {
    sql = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?) `;
    const params = [response.fname, response.lname, response.role, response.manager];
    db.query(sql, params, (err, rows) => {
        if (err) {
            console.error({ error: err.message });
            return;
        }
        console.log(`Added ${response.fname} ${response.lname} to the database`);
    });
}

// const updateRole = () => {
//     sql = `UPDATE role SET title = ? WHERE id = ? `;
//     const params = [response.fname, response.lname, response.role, response.manager];
//     db.query(sql, params, (err, rows) => {
//         if (err) {
//             console.error({ error: err.message });
//             return;
//         }
//         console.log(`Updated ${response.role} to the database`);
//     });
// }

function startPrompt() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role", "Quit"],
                name: 'action',
            }
        ])
        .then((response) => {
            switch (response.action) {
                case "View all departments":
                    viewDepartments();
                    startPrompt();
                    break;
                case "View all roles":
                    viewRoles();
                    startPrompt();
                    break;
                case "View all employees":
                    viewEmployees();
                    startPrompt();
                    break;
                case "Add a department":
                    inquirer.prompt([{
                        type: 'input',
                        message: 'What is the name of the department?',
                        name: 'departmentName',
                    }]).then(response => {
                        addDepartment(response);
                        startPrompt();
                    })
                    break;
                case "Add a role":
                    inquirer.prompt([{
                        type: 'input',
                        message: 'What is the name of the role?',
                        name: 'role',
                    },
                    {
                        type: 'input',
                        message: 'What is the salary of the role?',
                        name: 'salary',
                    },
                    {
                        type: 'input',
                        message: 'What is the deparment of the role?',
                        name: 'department',

                    }])
                        .then(response => { addRole(response); startPrompt(); })
                    break;
                case "Add an employee":
                    inquirer.prompt([{
                        type: 'input',
                        message: "What is the employee's first name?",
                        name: 'fname',
                    },
                    {
                        type: 'input',
                        message: "What is the employee's last name?",
                        name: 'lname',
                    },
                    {
                        type: 'input',
                        message: "What is the employee's role?",
                        name: 'role',
                    },
                    {
                        type: 'input',
                        message: "Who is the employee's manager?",
                        name: 'manager',
                    },])
                        .then(response => { addEmployee(response); startPrompt(); })
                    break;
                // case "Update an employee role":
                //     inquirer.prompt([{
                //         type: 'input',
                //         message: "Which employee's role do you want to update?",
                //         choices: [getEmployees()],
                //         name: 'employee',
                //     }])
                //         .then(response => { updateRole(); })
                //     break;
                case "Quit":
                    process.exit();

            }
        });
}

startPrompt();

