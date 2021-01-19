class Produit {

  constructor(specs) {
    for (const [key, value] of Object.entries(specs)) {
      this[key] = value;
    }
  }

  cartHtml() {
    console.log(this);
    return `
      <tr>
        <td>
          <img src="${this.imageUrl}" alt="ours ${this.number}">
        </td>
        <td>
          <h3>${this.name}</h3>
        </td>
        <td>
          <div class="setQty">
            <div class="minusBtn">
              <i class="fas fa-minus"></i>
            </div>
            <input type="number" class="field" value="${this.qte}">
            <div class="plusBtn">
              <i class="fas fa-plus"></i>
            </div>
          </div>
        </td>
        <td>
          <p>total = ${this.qte * this.price / 100}€</p>
        </td>
        <td>
          <i class="fas fa-trash-alt trashIcon"></i>
        </td>
      </tr>
    `;
  }
}