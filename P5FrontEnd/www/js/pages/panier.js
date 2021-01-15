class Panier {
  constructor(domTarget) {
    this.displayCart(domTarget);
  }
  displayCart(domTarget) {
    let panier = orinoco.cart;
    console.log(panier);
    domTarget.innerHTML = `
    <tr>
      <td>
        <img src="http://localhost:3000/images/teddy_1.jpg" alt="Premier ours">
      </td>
      <td>
        <h3>Norbert</h3>
      </td>
      <td>
        <div class="setQty">
          <div class="minusBtn">
            <i class="fas fa-minus"></i>
          </div>
          <input type="number" class="field">
          <div class="plusBtn">
            <i class="fas fa-plus"></i>
          </div>
        </div>
      </td>
      <td>
        <p>total = 58,00€</p>
      </td>
      <td>
        <i class="fas fa-trash-alt trashIcon"></i>
      </td>
    </tr>
    `;
  }
}