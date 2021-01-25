/*eslint-disable no-unused-vars*/
const orinoco = {
  dataManager: new DataManager("http://localhost:3000/api/teddies/")
};
orinoco.cart = new Cart(document.querySelector("nav"));
orinoco.page = definePage();

/**
 * define the page content
 *
 * @return  {Home|Product|Panier}  returns a page
 */
function definePage() {
  let params = (new URL(document.location)).searchParams;
  var url = window.location.pathname;
  if (url == "/" || url == "/index.html") return new Home   (document.querySelector("div.cardsWrapper"));
  if (url == "/produit.html")             return new Product(document.querySelector("div.singleCardWrapper"), params.get("_id"));
  if (url == "/panier.html")              return new Panier (document.querySelector("tbody.cartSummaryBody"));
  // new Confirmation(document.querySelector("div.cardsWrapper"));
}