class DataManager {

  produits = null;

  constructor(src) {
    this.src = src;
  }

  async getAllProducts() {
    if (this.produits !== null) return this.produits;
    const data = await fetch(this.src);
    this.produits = await data.json();
    return this.produits;
  }

  async getProduct(productId) {
    if (this.produits === null) await this.getAllProducts();
    return this.extractFromArray(productId);
  }

  /**
   * [extractFromArray description]
   *
   * @param   {String}  productId  [productId description]
   *
   * @return  {Object}             [return description]
   */
  extractFromArray(productId) {
    for (let i = 0, size = this.produits.length; i < size; i++) {
      if (this.produits[i]._id === productId) return this.produits[i];
    }
    return {};
  }

  saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  getCart() {
    return localStorage.getItem("cart") === null ? [] : JSON.parse(localStorage.getItem("cart"));
  }

  postOrder(contactItems) {
    fetch("http://localhost:3000/api/teddies/order", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: contactItems
    }).then(response => {
      return response.json();

    }).then(r => {
      localStorage.setItem('contact', JSON.stringify(r.contact));
      window.location.assign("confirmation.html?orderId="+r.orderId);
    })

  }
}