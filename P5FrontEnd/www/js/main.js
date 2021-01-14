/*eslint-disable no-unused-vars*/
const orinoco = {
  dataManager : new DataManager("http://localhost:3000/api/teddies/")
};

orinoco.cart = new Cart(document.querySelector("nav"));






new Home(document.querySelector("div.cardsWrapper"));

// new Product(document.querySelector("div.singleCardWrapper"), "5beaa8bf1c9d440000a57d94");
// new Product(document.querySelector("div.singleCardWrapper"), "5be9c8541c9d440000665243");
// new Product(document.querySelector("div.singleCardWrapper"), "5beaaa8f1c9d440000a57d95");
// new Product(document.querySelector("div.singleCardWrapper"), "5beaabe91c9d440000a57d96");
// new Product(document.querySelector("div.singleCardWrapper"), "5beaacd41c9d440000a57d97");