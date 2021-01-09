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

    return `
    <article class="teddyCard">
        <a href="./produit.html">
          <figure>
            <img src="${specs.imageUrl}" alt="Deuxième ours">
            <figcaption>
              <h3 id="h3">${specs.name}</h3>
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

const colors = ["blue", "red", "green"];

// Crée un nouvel élément <span> avec une classe
let createSpan = document.createElement("span");
createSpan.className = "displayColors";

// Obtient une référence à l'élément après lequel nous voulons insérer
let placeToInsert = document.getElementById("h3");
console.log(placeToInsert);

// Obtient une référence à l'élément parent
let parentDiv = placeToInsert.parentNode;

for (let i = 0; i < colors.length; i++) {
  const color = colors[i];
  console.log(color);

  // Créé une nouvelle icone avec la couleur l'intègre dans la <span>
  let icon = document.createElement("i");
  icon.className = "fas fa-circle";
  icon.style.color = color;
  createSpan.appendChild(icon);
}

// Insère le nouvel élément dans le DOM après le <H3>
parentDiv.insertBefore(createSpan, placeToInsert.nextSibling);