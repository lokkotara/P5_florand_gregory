/* eslint-disable no-undef */
const orinoco = {
  dataManager: new DataManager("http://localhost:3000/api/teddies/")
};
orinoco.cart = new Cart(document.querySelector("nav"));
orinoco.page = definePage();
console.log(typeof orinoco);
/**
 * définit le contenu à afficher sur les pages
 *
 * @return  {Home|Product|Panier|Confirmation}  retourne une page
 */
function definePage() {
  let params = (new URL(document.location)).searchParams; //récupère le paramètre de l'url. Utilisé pour récupérer l'id du produit à afficher sur la page produit.
  var url = window.location.pathname; //récupère l'url de la page sur laquelle on est.

  // retourne l'instance de la classe appropriée en fonction de la page où l'on se trouve.
  if (url == "/" || url == "/index.html") return new Home(document.querySelector("div.cardsWrapper"));
  if (url == "/produit.html") return new Product(document.querySelector("div.singleCardWrapper"), params.get("_id"));
  if (url == "/panier.html") return new Panier(document.querySelector("tbody.cartSummaryBody"));
  if (url == "/confirmation.html") return new Confirmation(document.querySelector("main.mainConfirmation"));
}