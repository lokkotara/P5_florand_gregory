const orinoco = {
  dataManager : new DataManager("http://localhost:3000/api/teddies/")
};

new Home(document.querySelector("section"));