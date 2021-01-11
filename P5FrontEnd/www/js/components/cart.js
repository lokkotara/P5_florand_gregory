class Cart{

  /**
   * @type {HTMLElement}
   */
  DOM;

  /**
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
    this.DOM = document.createElement("cart");
    domTarget.appendChild(this.DOM);
    this.render();
  }


  render(){
    this.DOM.innerHTML = `
    
    <a href="./panier.html" class="iconCart">
      <span>Mon panier${this.content.length}</span>
      <i class="fas fa-shopping-cart"></i>
    </a>
    
    `
  }

  add(productId){
    this.content.push(productId);
    this.render();
  }
}