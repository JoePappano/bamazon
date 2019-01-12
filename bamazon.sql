DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INTEGER NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NULL,
    department_name VARCHAR(50) NULL,
    price FLOAT(10,2) NULL,
    stock_quantity INTEGER(20) NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Lamp", "Home Decor", 12.95, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Baseball Cards", "Collectibles", 100.86, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Bamazon Alexa", "Technology", 300.85, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Coding for Dummies", "Self-Help Education", 15.87, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Sound Bar", "Technology", 150.56, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Golf Clubs Set", "Sports", 625.50, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Curtains", "Home Decor", 20.00, 1034);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Football", "Sports", 5.00, 10340);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Baseball", "Sports", 1.99, 300000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Hockey Puck", "Sports", 3.50, 60000);