class Home{
  /**
   * [constructor description]
   *
   * @param   {HTMLElement}  domTarget  [domTarget description]
   *
   * @constructor
   */
  constructor(domTarget){
    ;
    this.showAllProducts(domTarget);
  }

  async showAllProducts(domTarget){
    const produits = await orinoco.dataManager.getAllProducts();
    console.log(produits);
    let content = "";
    for (let i=0, size = produits.length; i<size; i++){
      content += this.productHtml(produits[i]);
    }
    domTarget.innerHTML = content;

  }

  /**
   * génère le HTML d'un produit
   *
   * @param   {Object}  specs  les propriétés de l'objet
   *
   * @return  {String}         le html du produit
   */
  productHtml(specs){
    return `
    <article class="teddyCard">
        <a href="./produit.html">
          <figure>
            <img src="${specs.imageUrl}" alt="Deuxième ours">
            <figcaption>
              <h3>Arnold</h3>
              <span class="displayColor">
                <i class="fas fa-circle paleBrownColor"></i>
                <i class="fas fa-circle darkBrownColor"></i>
                <i class="fas fa-circle whiteColor"></i>
              </span>
              <span class="price">39,00€</span>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <input class="addButton" type="button" value="Ajouter au panier">
            </figcaption>
          </figure>
        </a>
      </article>
    
    
    `
  }
}