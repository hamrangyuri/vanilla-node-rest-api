const products = require("../data/products.json");
const { v4: uuidv4 } = require("uuid");
const { writeDataToFile } = require("../utils");

function FindAll() {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
}

function FindByID(id) {
  return new Promise((resolve, reject) => {
    const product = products.find((item) => item.id === id);
    resolve(product);
  });
}

function Create(product) {
  return new Promise((resolve, reject) => {
    const newProduct = {
      id: uuidv4(),
      ...product,
    };
    products.push(newProduct);
    writeDataToFile("./data/products.json", products);
    resolve(newProduct);
  });
}

function Update(id, product) {
  return new Promise((resolve, reject) => {
    const index = products.findIndex((p) => p.id === id);
    products[index] = { id, ...product };
    writeDataToFile("./data/products.json", products);
    resolve(products[index]);
  });
}

function Delete(id) {
  return new Promise((resolve, reject) => {
    let filteredProducts = products.filter((p) => p.id !== id);
    writeDataToFile("./data/products.json", filteredProducts);
    resolve();
  });
}

module.exports = { FindAll, FindByID, Create, Update, Delete };
