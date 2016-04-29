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


console.log("Please select one of the following: a) View Products for Sale b) View Low Inventory c) Add to Inventory d) Add New Product ");

prompt.start()
var optionSchema = {
      properties: {
        option: {description: 'Option Selection (please type letter)'}
      },
    };

function menuRequest(){
    prompt.get(optionSchema, function (err,res){
      switch (res.option) {
        case 'a':
        viewAll();
        break;
        case 'b':
        lowInventory();
        break;
        case 'c':
        addMoreStock();
        break;
        case 'd':
        addNewProduct()
        break;
        default:
        console.log("Not a valid option, please select (a,b,c,d)");
        menuRequest();
      }//Switch
    }); // prompt.get(optionSchema, function (err,res){
}
menuRequest()

// list all the products for sale
function viewAll(){
  connection.connect();
  connection.query('SELECT * FROM products', function(err, result) {
    if (err) throw err;

    // Display the products on the terminal
    for (var i = 0; i < result.length; i++) {
      console.log('Prodcut ID: ' , result[i].ItemID);
      console.log('Product Name: ',result[i].ProductName);
      console.log('Price: ', result[i].Price);
      console.log('Inventory: ', result[i].StockQuantity);
      console.log("----------------------");
    }
  });
  connection.end();
}

//All items with a stock less than 5pcs
function lowInventory(){
  connection.connect();
  connection.query('SELECT * FROM products where StockQuantity <5', function(err, result) {
    if (err) throw err;

    // Display the products on the terminal
    for (var i = 0; i < result.length; i++) {
      console.log('Prodcut ID: ' , result[i].ItemID);
      console.log('Product Name: ',result[i].ProductName);
      console.log('Price: ', result[i].Price);
      console.log('Inventory: ', result[i].StockQuantity);
      console.log("----------*****----------");
    }
  });
  connection.end();
}

function addMoreStock(){
  var addStock = {
        properties: {
          ItemID: {description: 'What item will have its Stock modified'},
          Qty: {description: 'What is the new stock of the item?'}
        },
      };

      prompt.get(addStock, function (err,res){
        var ChangeItem = {
          ItemID: res.ItemID,
          Qty: res.Qty
        };

      // querry to update stock
      connection.connect();
      connection.query('UPDATE products set StockQuantity ='+ ChangeItem.Qty + ' where ItemID ='+ ChangeItem.ItemID, function(err, result) {
        if (err) throw err;
        console.log(result.message);
        connection.end();
        });
      });
    }

    function addNewProduct(){
      var addProduct = {
            properties: {
              ProductName: {description: 'What is the name of product'},
              DepartmentName: {description: 'To What deparment is this product?'},
              Price: {description: 'Price of the product'},
              StockQuantity: {description: 'How much inventory of this product will we have'}
              },
          };

          prompt.get(addProduct, function (err,res){
            var ChangeItem = {
              ProductName: res.ProductName,
              DepartmentName: res.DepartmentName,
              Price: res.Price,
              StockQuantity: res.StockQuantity
            };

          // querry to update stock
          connection.connect();
          connection.query('INSERT INTO products set ?',ChangeItem, function(err, result) {
            if (err) throw err;
            console.log("Product has been Added.");
            connection.end();
            });
          });
        }
