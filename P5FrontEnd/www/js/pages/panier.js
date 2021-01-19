/* global orinoco */
class Panier {

  /**
   * le contenu du panier
   * @type {Object}
   */
  content = {};

  constructor(domTarget) {
    this.displayCart(domTarget);
    let panier = orinoco.cart.content;
    this.arrayToObject(panier);
    this.displayCart(domTarget);
  }
  async displayCart(domTarget) {
    let html = "",
      i =0, 
      produit, 
      specs;
    for (const [key, value] of Object.entries(this.content)) {
      i++;
      specs = await orinoco.dataManager.getProduct(key);
      produit = new Produit({...value, ...specs, number:i});
      html += produit.cartHtml();
    }
    domTarget.innerHTML = html;
  }




  /**
   * [arrayToObject description]
   *
   * @param   {Array}  list  [list description]
   *
   * @return  {void}        met à jour le contenu du panier sous forme d'objet
   */
  arrayToObject(list){
    this.content = {};
    for (let i=0, size=list.length; i<size; i++){
      if (this.content[list[i]] === undefined) this.content[list[i]] = { qte : 1 };
      else this.content[list[i]].qte++;
    }
  }
  /*
  remove(productId){
    this.contentQty--;
    this.content[productId].qte--;
    if (this.content[productId].qte === 0) delete this.content[productId];
    this.render();
    orinoco.dataManager.saveCart(this.content);
  }
  */



}