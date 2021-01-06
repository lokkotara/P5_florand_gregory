class DataManager{

  produits = null;

  constructor(src){
    this.src = src;
  }

  async getAllProducts(){
    if (this.produits!== null) return this.produits;
    const data = await fetch(this.src);
    this.produits = await data.json();
    return this.produits;
  }
}