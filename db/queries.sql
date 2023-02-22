SELECT employee.id, first_name, last_name, role.title, department.name, role.salary, employee.manager_id
 FROM employee 
 JOIN role ON employee.role_id = role.id 
 JOIN department ON role.department_id = department.id

 SELECT e1.id AS id, e1.first_name AS first_name, e1.last_name AS last_name, role.title AS title,
  department.name AS department, role.salary AS salary, CONCAT(e2.first_name, ' ', e2.last_name) AS manager
  FROM employee e1
  LEFT JOIN employee e2 ON e1.manager_id = e2.id
  JOIN role ON e1.role_id = role.id
    JOIN department ON role.department_id = department.id;