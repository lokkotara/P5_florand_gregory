/*eslint-disable no-unused-vars*/
const orinoco = {
  dataManager : new DataManager("http://localhost:3000/api/teddies/")
};

orinoco.cart = new Cart(document.querySelector("nav"));

// new Home(document.querySelector("div.cardsWrapper"));
new Product(document.querySelector("div.cardsWrapper"), "5be9c8541c9d440000665243");