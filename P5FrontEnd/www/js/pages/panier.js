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
    this.displayCart();
    this.displayTotal();
  }

  async displayCart() {
    let html = "",
      i = 0,
      produit,
      specs;
    try {
      for (const [key, value] of Object.entries(this.content)) {
        i++;
        specs = await orinoco.dataManager.getProduct(key);
        html += this.templateProduit({
          ...value,
          ...specs,
          number: i
        });
      }
      if (html === "") html = this.templateEmptyCart();
    } catch (err) {
      console.error(err);
      html = this.templateError();
    }
    this.domTarget.innerHTML = html;

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
        <i class="fas fa-trash-alt trashIcon" onclick="orinoco.page.deleteLine('${specs._id}','${specs.qte}')"></i>
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

  // getTotal() {
  //   let sum = specs.qte * specs.price / 100;
  //   displayTotal(sum);
  // }

  displayTotal(sum) {
    return /*html*/ `
      <td class="totalCart">
        <p>Total du panier = ${sum},00€</p>
      </td>
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
    this.displayCart();
    if (this.content[id].qte === 0) {
      alert("Vous venez de supprimer cet article.");
      window.location.reload();
      orinoco.cart.delete(id);
    };
  }

  deleteLine(id, qty) {
    orinoco.cart.delete(id, qty);
    this.content[id].qte = 0;
    this.displayCart();
    window.location.reload();
  }

}