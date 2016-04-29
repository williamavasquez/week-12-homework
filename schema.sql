CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
  ItemID int AUTO_INCREMENT NOT NULL,
  ProductName varchar(50) NOT NULL,
  DepartmentName varchar(50) NOT NULL,
  Price decimal(10,2) NOT NULL,
  StockQuantity int,
  PRIMARY KEY (ItemID)
);

-- add data to the products table
INSERT INTO products (ProductName, DepartmentName, Price, StockQuantity) VALUES
('Greenish Stone Baoding Balls','handmade',20.80,10),
('Cell Phone Case', 'Mobile',9.10,50),
('iCarly Stationery','Office',6.49,30),
('Cool Mist Humidifier','Home',26.99,12),
('Ceramic Coffee Mug','Office',3.5,100),
('Teddy Bear','Kids',15,5),
('HDMI Cable 10ft', 'Home',24.99,25),
('Horse Head Mask','Office',34.99,1),
('Canned Unicorn Meat','handmade',159.00,30),
('Air flying turtle','Office',10,26),
('Iphone Selfie Stick','Mobile',1.50,300)
;
