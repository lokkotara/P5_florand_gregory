/*eslint-disable no-unused-vars*/
const orinoco = {
  dataManager : new DataManager("http://localhost:3000/api/teddies/")
};

orinoco.cart = new Cart(document.querySelector("nav"));

let params = (new URL(document.location)).searchParams;
let id = params.get("_id");


var url = window.location.pathname;
// console.log(url)
if (url == "/" || url == "/index.html") {
  new Home(document.querySelector("div.cardsWrapper"));
} else if (url == "/produit.html") {
  new Product(document.querySelector("div.singleCardWrapper"), id);
} else if (url == "/panier.html") {
  new Panier(document.querySelector("tbody.cartSummaryBody"));
} else {
  // new Confirmation(document.querySelector("div.cardsWrapper"));
}
