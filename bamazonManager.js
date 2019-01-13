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
    process.stdout.write('\033c');
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

        addQuestions();
    });

}

function addQuestions() {
    inquirer.prompt([
        {
            type: "input",
            name: "itemId",
            message: "What is the ID of the item you would like to add stock too?"
        },
        {
            type: "input",
            name: "addStock",
            message: "How much would you like to add?"
        }
    ])
        .then(answers => {
            var item = parseInt(answers.itemId);
            var addStock = parseInt(answers.addStock);
            console.log("Here is answer 1: " + item)

            connection.query("SELECT * FROM `products` WHERE ?", { item_id: item }, function (err, res) {
                if (err) throw err;

                // console.log("Stock of " + res[0].product_name + "is " + res[0].stock_quantity)
                connection.query("UPDATE `products` SET ? WHERE ?",
                    [
                        {
                            stock_quantity: res[0].stock_quantity + addStock
                        },
                        {
                            item_id: item,
                        }
                    ]
                    , function (err, res) {
                        if (err) throw err;

                        connection.query("SELECT * FROM `products` WHERE ?",
                            {
                                item_id: item,
                            }, function (err, res) {
                                if (err) throw err;

                                console.log("--------------------------");
                                console.log(res[0].product_name + " has been updated!")
                                console.log(res[0].product_name + " inventory: " + res[0].stock_quantity)
                                console.log("--------------------------");
                            })

                    })
            })



        });

}

function addNewProduct() {
    inquirer.prompt([
        {
            type: "input",
            message: "What product would you like to add?",
            name: "productName"
        },
        {
            type: "input",
            message: "What department does your product belong in?",
            name: "productDepartment"
        },
        {
            type: "input",
            message: "What price would you like to set for your product?",
            name: "productPrice"
        },
        {
            type: "input",
            message: "How much of your product is in stock?",
            name: "productStock"
        },

    ])
        .then(answers => {
            var product = answers.productName;
            var department = answers.productDepartment;
            var price = answers.productPrice;
            var stock = answers.productStock;


            connection.query("INSERT INTO `products` SET ?",
                {
                    product_name: product,
                    department_name: department,
                    price: price,
                    stock_quantity: stock
                }, function (err, res) {
                    if (err) throw err;

                    connection.query("SELECT * FROM `products`", function (err, res) {
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
                })

        });
}