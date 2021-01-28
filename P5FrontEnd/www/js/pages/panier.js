/* global orinoco */
class Panier {

  /**
   * le contenu du panier
   * @type {Object}
   */
  content = {};

  constructor(domTarget) {
    this.domTarget = domTarget;
    this.arrayToObject(orinoco.cart.content);
    this.displayForm();
    this.displayCart();
    this.watchClick();
  }

  async displayCart() {
    let html = "",
      i = 0,
      specs,
      total = 0;
    try {
      for (const [key, value] of Object.entries(this.content)) {
        i++;
        specs = await orinoco.dataManager.getProduct(key);
        html += this.templateProduit({
          ...value,
          ...specs,
          number: i
        });
        total += specs.price * value.qte;
      }
      if (html === "") html = this.templateEmptyCart();
    } catch (err) {
      console.error(err);
      html = this.templateError();
    }
    this.domTarget.innerHTML = html;
    this.displayTotal(total / 100);

  }

  /**
   * [arrayToObject description]
   *
   * @param   {Array}  list  [list description]
   *
   * @return  {void}        met à jour le contenu du panier sous forme d'objet
   */
  arrayToObject(list) {
    this.content = {};
    for (let i = 0, size = list.length; i < size; i++) {
      if (this.content[list[i]] === undefined) this.content[list[i]] = {
        qte: 1
      };
      else this.content[list[i]].qte++;
    }
  }

  /**
   * html template of a product 
   *
   * @param   {Object}  specs           product specifications
   * @param   {String}  specs._id
   * @param   {String}  specs.imageUrl
   * @param   {Number}  specs.qte
   * @param   {String}  specs.name
   * @param   {Number}  specs.number
   * @param   {Number}  specs.price
   *
   * @return  {String}                  fully filled html template
   */
  templateProduit(specs) {
    return /*html*/ `
    <tr>
      <td>
        <img src="${specs.imageUrl}" alt="ours ${specs.number}">
      </td>
      <td>
        <h3>${specs.name}</h3>
      </td>
      <td>
        <div class="setQty">
          <div class="minusBtn" onclick="orinoco.page.decrement('${specs._id}')">
            <i class="fas fa-minus"></i>
          </div>
          <input type="number" class="field" value="${specs.qte}">
          <div class="plusBtn" onclick="orinoco.page.increment('${specs._id}')">
            <i class="fas fa-plus"></i>
          </div>
        </div>
      </td>
      <td>
        <p>total = ${specs.qte * specs.price / 100},00€</p>
      </td>
      <td>
        <i class="fas fa-trash-alt trashIcon" onclick="orinoco.page.deleteLine('${specs._id}')"></i>
      </td>
    </tr>
  `;
  }

  templateEmptyCart() {
    return `
      <p class="contentText">Votre panier est vide, pensez à ajouter des articles</p>
    `;
  }

  templateError() {
    return `
      <p class="contentText">Oups, il semble qu'une erreur soit survenue.</p>
    `;
  }


  displayTotal(sum) {
    document.getElementById('displayTotal').innerHTML = /*html*/ `
      <tr>
        <td class="totalCart">
          <p>Total du panier = ${sum},00€</p>
        </td>
      </tr>
    `;
  }

  increment(id) {
    orinoco.cart.add(id);
    this.content[id].qte++;
    this.displayCart();
  }

  decrement(id) {
    orinoco.cart.remove(id);
    this.content[id].qte--;
    if (this.content[id].qte === 0) this.deleteLine(id);
    else this.displayCart();
  }

  deleteLine(id) {
    orinoco.cart.delete(id);
    delete this.content[id];
    this.displayCart();
  }
  displayForm() {
    document.getElementById('form').innerHTML = /*html*/ `
      <label for="firstName">Prénom</label>
      <input type="text" name="firstName" id="firstName" placeholder="Jean" pattern="^[a-zA-Z]{1}[a-zA-Z'À-ÿ\s-]+$" required>
      <label for="lastName">Nom de famille</label>
      <input type="text" name="lastName" id="lastName" placeholder="Dupont"   pattern="^[a-zA-Z]{1}[a-zA-Z'À-ÿ\s-]+$" required>
      <label for="address">Adresse</label>
      <input type="text" name="address" id="address" placeholder="5 rue du pont Napoléon" pattern="[a-zA-Z0-9À-ÿ\s-']+" required>
      <label for="city">Ville</label>
      <input type="text" name="city" id="city" placeholder="Paris"   pattern="^[a-zA-Z]{1}[a-zA-Z'À-ÿ\s-]+$" required>
      <label for="email">Adresse de messagerie</label>
      <input type="email" name="email" id="email" class="lastInput" placeholder="JeanDupont@gmail.com" pattern="^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})" required>
      <button class="formBtn" type="submit">Passer commande</button>
    `;
  }
  getForm() {
    let contact = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      email: document.getElementById("email").value
    };
    console.log(contact);
  }
  watchClick() {
    const formBtn = document.getElementById("form");
    formBtn.addEventListener('submit', e => {
      e.preventDefault();
      this.getForm();
    })
  }
}