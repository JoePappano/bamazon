var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
})

connection.connect(function (err) {
    if (err) throw err;
    menu();
})

function menu() {
    inquirer.prompt([
        {
            type: "list",
            name: "menu",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    ])
        .then(answers => {
            var userChoice = answers.menu;

            if (userChoice === "View Products for Sale") {
                viewProducts();
            }
            if (userChoice === "View Low Inventory") {
                viewLowInventory();
            }
            if (userChoice === "Add to Inventory") {
                addToInventory();
            }
            if (userChoice === "Add New Product") {
                addNewProduct();
            }

        });
}

function viewProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        for (i = 0; i < res.length; i++) {
            console.log("---------------------------");
            console.log("ID#: " + res[i].item_id);
            console.log("Product: " + res[i].product_name);
            console.log("Department: " + res[i].department_name);
            console.log("Price: " + res[i].price);
            console.log("Stock: " + res[i].stock_quantity);
            console.log("---------------------------");
        }
    });
}

function viewLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
        if (err) throw err;

        for (i = 0; i < res.length; i++) {
            console.log("---------------------------");
            console.log("ID#: " + res[i].item_id);
            console.log("Product: " + res[i].product_name);
            console.log("Department: " + res[i].department_name);
            console.log("Price: " + res[i].price);
            console.log("Stock: " + res[i].stock_quantity);
            console.log("---------------------------");
        }
    })
}

function addToInventory() {

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        for (i = 0; i < res.length; i++) {
            console.log("---------------------------");
            console.log("ID#: " + res[i].item_id);
            console.log("Product: " + res[i].product_name);
            console.log("Department: " + res[i].department_name);
            console.log("Price: " + res[i].price);
            console.log("Stock: " + res[i].stock_quantity);
            console.log("---------------------------");
        }
    });

    inquirer.prompt([
        {
            type: "input",
            name: "itemId",
            message: "What is the ID of the item you would like to add stock too?"
        },
        {
            type: "input",
            name: "add",
            message: "How much would you like to add?"
        }
    ])
        .then(answers => {

            console.log("Here are the answers: " + answers);
            // connection.query("UPDATE `products` SET ? WHERE ?",
            //     {
            //         stock_quantity: 
            //     }
            //     , function (err, res) {
            //         if (err) throw err;


            //     })

        });

}