/*eslint-disable no-unused-vars*/
/* global orinoco */

class Product {
  /**
   * [constructor description]
   *
   * @param   {HTMLElement}  domTarget  [domTarget description]
   *
   * @constructor
   */
  constructor(domTarget, productId) {

    this.showProduct(domTarget, productId);
  }

  async showProduct(domTarget, productId) {
    const produit = await orinoco.dataManager.getProduct(productId);
    domTarget.innerHTML = this.productHtml(produit);
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
    <article class="singleProduct">
      <figure>
        <img src="${specs.imageUrl}" alt="Ours en peluche marron">
      </figure>
      <section>
        <div class="productHeading">
          <h2>${specs.name}</h2>
          <span class="price">${specs.price / 100}€</span>
        </div>
        <p class="first">${specs.description}</p>
        <div class="setQty">
          <div class="minusBtn">
            <i class="fas fa-minus"></i>
          </div>
          <input type="number" class="field" id="field">
          <div class="plusBtn">
            <i class="fas fa-plus"></i>
          </div>
        </div>
        <div class="customize">
          <div class="displayColor">
            ${this.showColor(specs.colors)}
          </div>
          <label for="colors">Choisir sa couleur </label>
          <select name="colors" id="colors">
            ${this.showOptionColor(specs.colors)}
          </select>
        </div>
        <input class="addButton" id="addButton" type="button" value="Ajouter au panier">
      </section>
    </article>
    `;
  }


  /**
   * génère la liste des couleurs
   *
   * @param   {Array}  colors  les variantes
   *
   * @return  {String}         les couleurs sous forme html
   */
  showOptionColor(colors) {
    let html = "";
    for (let i = 0, size = colors.length; i < size; i++) {
      html += ` <option value="firstChoice">${this.convertToDisplayName(colors[i])}</option>`;
    }
    return html;
  }

  convertToDisplayName(color) {
    let colors = color
      .toLowerCase()
      .split(" ");

    let maj;
    for (let i = 0, size = colors.length; i < size; i++) {
      maj = colors[i].slice(0, 1).toUpperCase();
      colors[i] = maj + colors[i].slice(1);
    }
    return colors.join(" ");
  }

  showColor(colors) {
    let html = "";
    for (let i = 0, size = colors.length; i < size; i++) {
      html += `<i class="fas fa-circle ${this.convertToClassName(colors[i])}" ></i>`;
    }
    return html;
  }

  convertToClassName(color) {
    let colors = color
      .toLowerCase()
      .split(" ");

    let maj;
    for (let i = 1, size = colors.length; i < size; i++) {
      maj = colors[i].slice(0, 1).toUpperCase();
      colors[i] = maj + colors[i].slice(1);
    }
    return colors.join("") + "Color";
  }





}