// We use constant because the values of the modules should not change
const mysql = require('mysql');
const prompt = require('prompt');

  customerOrder = [];

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1123581321w',
  database : 'bamazon',
  multipleStatements: true
});

connection.connect();
connection.query('SELECT * FROM products', function(err, result) {
  if (err) throw err;

  // Display the products on the terminal
  for (var i = 0; i < result.length; i++) {
    console.log('Prodcut ID: ' , result[i].ItemID);
    console.log('Product Name: ',result[i].ProductName);
    console.log('Price: ', result[i].Price);
    console.log("----------------------");
  }
    askCustomer();
});


function askCustomer(){
  // Set the information needed
  var infoSchema = {
        properties: {
          ItemID: {description: 'Which of the Products would you like, please provide the ID'},
          Qty: {description: 'How many would you like?'}
        },
      };

  // Begin Prompt (Ask the customer)
  prompt.start();
    prompt.get(infoSchema, function (err,res){
      var order = {
        ItemID: res.ItemID,
        Qty: res.Qty
      };
        customerOrder.push(order);

        // new query for the products the customer selected
        connection.query('SELECT * FROM products where ItemID=?',customerOrder[0].ItemID, function(err, result) {
        if (result[0].StockQuantity>= customerOrder[0].Qty) {
          console.log('Your total comes to: '+(customerOrder[0].Qty*result[0].Price));
          remainingStock = result[0].StockQuantity - customerOrder[0].Qty;
          // querry to update stock
          connection.query('UPDATE products set StockQuantity ='+ remainingStock+ ' where ItemID ='+ customerOrder[0].ItemID, function(err, result) {
            console.log(err);
            console.log("Sale has been Processed. Thank you!");
          connection.end();
        });
        } else {
          console.log("Sorry, we are currently out of stock");
          connection.end();
        }
        });
  })
}
