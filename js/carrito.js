/* document.addEventListener('DOMContentLoaded',() => {
    fetchData();
})
let carrito = {}
items.addEventListener('click', e =>{
    addToCart(e);
})
const fetchData = async () => {
    try{
        const res = await fetch("http://localhost:9000/api/pc/")
        const data = await res.json()
        console.log(data)
    }catch(error){
        console.log(error)
    }
}
const addToCart = e =>{
    console.log(e.target)
    console.log(e.target.classList.contains('addToCart'))
    if(e.target.classList.contains('addToCart')){
        
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation();
}
const setCarrito = objeto =>{
    console.log(objeto)
    const producto = {
        id: objeto.querySelector('.addToCart').dataset.id,
        nombre: objeto.querySelector('.name').textContent,
        precio: objeto.querySelector('.precio').textContent,
        cantidad: 1
    }
    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1
    }
    carrito[producto.id] = {...producto}
    console.log(producto)
}
 */

document.addEventListener('click', event => {
    if (event.target && event.target.className.includes('addToCart')){
        addToCartClicked(event); 
    }

});

const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked);

const shoppingCartItemsContainer = document.querySelector(
  '.shoppingCartItemsContainer'
);

function addToCartClicked(event) {
  const button = event.target;
  const item = button.closest('.item');

  const itemTitle = item.querySelector('.name').textContent;
  const itemPrice = item.querySelector('.precio').textContent;
  const itemImage = item.querySelector('.image').src;

  addItemToShoppingCart(itemTitle, itemPrice, itemImage);
}

function addItemToShoppingCart(itemTitle, itemPrice, itemImage) {
  const elementsTitle = shoppingCartItemsContainer.getElementsByClassName(
    'shoppingCartItemTitle'
  );
  for (let i = 0; i < elementsTitle.length; i++) {
    if (elementsTitle[i].innerText === itemTitle) {
      let elementQuantity = elementsTitle[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        '.shoppingCartItemQuantity'
      );
      elementQuantity.value++;
      $('.toast').toast('show');
      updateShoppingCartTotal();
      return;
    }
  }

  const shoppingCartRow = document.createElement('div');
  const shoppingCartContent = `
  <div class="row shoppingCartItem">
        <div class="col-5">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${itemImage} class="shopping-cart-image">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;
  shoppingCartRow.innerHTML = shoppingCartContent;
  shoppingCartItemsContainer.append(shoppingCartRow);

  shoppingCartRow
    .querySelector('.buttonDelete')
    .addEventListener('click', removeShoppingCartItem);

  shoppingCartRow
    .querySelector('.shoppingCartItemQuantity')
    .addEventListener('change', quantityChanged);
    console.log(itemPrice)

  updateShoppingCartTotal();
}
function updateShoppingCartTotal() {
  let total = 0;
  const shoppingCartTotal = document.querySelector('.shoppingCartTotal');
    console.log(shoppingCartTotal)
  const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');
  shoppingCartItems.forEach((shoppingCartItem) => {
    const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
      '.shoppingCartItemPrice'
    );      console.log(shoppingCartItemPriceElement)

    const shoppingCartItemPrice = shoppingCartItemPriceElement.textContent
    console.log(shoppingCartItemPrice)
    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
      '.shoppingCartItemQuantity'
    );
    const shoppingCartItemQuantity = Number(
      shoppingCartItemQuantityElement.value
      
    );
    console.log(shoppingCartItemPriceElement)
    total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
    console.log(total)
  });
  shoppingCartTotal.innerHTML = ` S/${total.toFixed(2)}`;
}

function removeShoppingCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.closest('.shoppingCartItem').remove();
  updateShoppingCartTotal();
}

function quantityChanged(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  updateShoppingCartTotal();
}

function comprarButtonClicked() {
  shoppingCartItemsContainer.innerHTML = '';
  updateShoppingCartTotal();
}
