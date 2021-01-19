class Cart{

  /**
   * @type {HTMLElement}
   */
  DOM;

  /**
   * contient tous les éléments du panier
   * @type {Array}
   */
  content = [];

  /**
   * [constructor description]
   *
   * @param   {HTMLElement}  domTarget  [domTarget description]
   *
   * @constructor
   */
  constructor(domTarget){
    this.content = orinoco.dataManager.getCart();

    this.DOM = document.createElement("cart");
    domTarget.appendChild(this.DOM);
    this.render();
  }


  render(){
    this.DOM.innerHTML = `
    <a href="./panier.html" class="iconCart">
      <span>Mon panier</span>
      <i class="fas fa-shopping-cart">${this.content.length}</i>
    </a>
    `
  }

  add(productId, qty=1){
    for(let i=1; i <= qty; i++){
      this.content.push(productId);
    }
    this.render();
    orinoco.dataManager.saveCart(this.content);
  }

  remove(productId){
    const id= this.content.indexOf(productId);
    this.content.splice(id, 1);
    this.render();
    orinoco.dataManager.saveCart(this.content);
  }

}