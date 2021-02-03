/* global orinoco */
// eslint-disable-next-line no-unused-vars
class Confirmation {

  constructor(domTarget) {
    this.domTarget = domTarget;
    this.clearCart(domTarget);
  }
  
  clearCart(domTarget) {
    localStorage.removeItem("cart");
    orinoco.cart.deleteAll();
    this.displayMessage(domTarget);
  }

  displayMessage(domTarget) {
    let contact = JSON.parse(localStorage.getItem("contact")),
      orderId = (new URL(document.location)).searchParams,
      totalOrder = JSON.parse(localStorage.getItem("total"));

    domTarget.innerHTML = /*html*/ `
    <section class="confirmationWrapper">
      <h2>${contact.firstName}, merci pour votre achat !</h2>
      <p>
        Votre commande d'un montant de <span id="orderAmount">${totalOrder},00€</span> a été validée.
      </p>
      <p>
        Elle porte la référence : <span id="orderId">${orderId.get("orderId")}</span>
      </p>
      <p>
        Votre facture va vous être envoyé par mail à : <span id="orderMail">${contact.email}</span>.
      </p>
      <p>
        L'équipe d'Orinounours vous remercie pour votre confiance !
      </p>
    </section>
    <div>
      <a href="./index.html">
        <i class="fas fa-arrow-left"> Retourner sur la page d'accueil</i>
      </a>
    </div>
    `;
  }
}