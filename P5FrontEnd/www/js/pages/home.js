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

  /**
   * génère le HTML d'un produit
   *
   * @param   {Object}  specs  les propriétés de l'objet
   *
   * @return  {String}         le html du produit
   */
  productHtml(specs) {
    // const colors = specs.colors;

    return `
    <article class="teddyCard">
        <a href="./produit.html?_id=${specs._id}">
          <figure>
            <img src="${specs.imageUrl}" alt="Deuxième ours">
            <figcaption>
              <h3 id="h3">${specs.name}</h3>
              <span class="displayColor">${this.showColor(specs.colors)}</span>
              <span class="price">${specs.price / 100}€</span>
              <p>${specs.description}</p>
              <input class="addButton" type="button" value="En savoir plus">
            </figcaption>
          </figure>
        </a>
    </article>
    `;
  }
 
  /**
   * génère la lise des couleurs
   *
   * @param   {Array}  colors  les variantes
   *
   * @return  {String}         les couleurs sous forme html
   */
  showColor(colors){
    let html = "";
    for (let i = 0, size = colors.length; i < size; i++) {
      html += `<i class="fas fa-circle ${this.convertToClassName(colors[i])}" ></i>`;
    }
    return html;
  }


  convertToClassName(color){
    let colors =  color
      .toLowerCase()
      .split(" ");

    let maj;
    for(let i=1, size= colors.length; i< size; i++){
      maj = colors[i].slice(0,1).toUpperCase();
      colors[i] = maj + colors[i].slice(1);
    }
    return colors.join("")+"Color";
  }
}