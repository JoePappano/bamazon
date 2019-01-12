var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});



connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
})


function afterConnection() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(res);
        for (i = 0; i < res.length; i++) {
            console.log("---------------------------");
            console.log("ID#: " + res[i].item_id);
            console.log("Product: " + res[i].product_name);
            console.log("Department: " + res[i].department_name);
            console.log("Price: " + res[i].price);
            console.log("Stock: " + res[i].stock_quantity);
            console.log("---------------------------");
        }
        askQuestions();
    });
}

function askQuestions() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the ID of the item you would like to buy?",
            name: "itemId",
        },
        {
            type: "input",
            message: "How many would you like to buy?",
            name: "itemQuantity",
        }
    ])
        .then(answers => {
            var item = parseInt(answers.itemId);
            var quantity = parseInt(answers.itemQuantity);


            connection.query("SELECT * FROM `products` WHERE ?", { item_id: item }, function (err, res) {
                if (err) { throw err };

                if (quantity <= res[0].stock_quantity) {
                    console.log("Great! Your product is in stock!")
                    connection.query("UPDATE `products` SET ? WHERE ?",
                        [
                            {
                                stock_quantity: res[0].stock_quantity - quantity
                            },
                            {
                                item_id: item
                            }
                        ], function (err, res) {
                            if (err) throw err;
                        })
                    connection.query("SELECT * FROM `products` WHERE ?",
                        {
                            item_id: item,
                        }, function (err, res) {
                            if (err) throw err;
                            console.log("--------------------------------------------------------------")
                            console.log("Your order has been placed! Your " + res.product_name + " will arrive shortly! ")
                            console.log("Stock left for ID# " + res[0].item_id + ": " + res[0].stock_quantity);
                            console.log("--------------------------------------------------------------")
                        })
                        connection.end()
                }

                if (quantity >= res[0].stock_quantity) {
                    console.log("Uh oh! That's too many! Try again!");
                    askQuestions();
                }
                
            })
        });
}

