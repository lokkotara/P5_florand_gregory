/*eslint-disable no-unused-vars*/
class Home {
  /**
   * [constructor description]
   *
   * @param   {HTMLElement}  domTarget  [domTarget description]
   *
   * @constructor
   */
  constructor(domTarget) {

    this.showAllProducts(domTarget);
  }

  async showAllProducts(domTarget) {
    const produits = await orinoco.dataManager.getAllProducts();
    console.log(produits);
    let content = "";
    for (let i = 0, size = produits.length; i < size; i++) {
      content += this.productHtml(produits[i]);
    }
    domTarget.innerHTML = content;

  }

  //génère les couleurs de personnalisation


  /**
   * génère le HTML d'un produit
   *
   * @param   {Object}  specs  les propriétés de l'objet
   *
   * @return  {String}         le html du produit
   */
  productHtml(specs) {
    const colors = specs.colors;

    // create a new div and set its attributes
    let div = document.createElement('div');
    div.className = 'div1';

    for (let i = 0; i < colors.length; i++) {
      const color = colors[i];
      console.log(color);


      // create a new text node and add it to the div
      let span = document.createElement('span');
      span.className = 'fas fa-circle';
      span.style.color = color;
      div.appendChild(span);

      // add div to the document
      document.body.appendChild(div);
    }
    return `
    <article class="teddyCard">
        <a href="./produit.html">
          <figure>
            <img src="${specs.imageUrl}" alt="Deuxième ours">
            <figcaption>
              <h3>${specs.name}</h3>
              <span class="displayColor">
                ${specs.colors}
              </span>
              <span class="price">${specs.price/100}€</span>
              <p>${specs.description}
              </p>
              <input class="addButton" type="button" value="Ajouter au panier">
            </figcaption>
          </figure>
        </a>
    </article>
    `;
  }
}