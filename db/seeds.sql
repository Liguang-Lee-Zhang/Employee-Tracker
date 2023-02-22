INSERT INTO department (name)
VALUES  ("Sales"),
        ("Research and production"),
        ("Finance"),
        ("Human Resources");

INSERT INTO role (title, department_id, salary)
VALUES  ("Sales Lead", 1, 90000),
        ("Salesperson", 1, 50000),
        ("Engineering manager", 2, 180000),
        ("Engineer", 2, 125000),
        ("Accounting Director", 3, 160000),
        ("Accountant", 3, 125000),
        ("HR director", 4, 200000),
        ("HR staff", 4, 80000);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("John", "Doe", 1, null),
        ("Jason", "Derulo", 2, 1),
        ("Selena", "Gomez", 3, null),
        ("Tracy", "Mclaren", 4, 3),
        ("Kawai", "Singh", 5, null),
        ("Khaled", "Kord", 6, 5),
        ("Emma", "Qu", 7, null),
        ("Tom", "Hagen", 8, 7);