const priceText = document.querySelector("#total");
const purchaseInfo = [];

document.getElementById("cart-btn").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("sidebar-show");
});
document.getElementById("sidebar-close").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("sidebar-show");
});

const items = document.querySelectorAll(".grid-item");
items.forEach((item) => {
  item.addEventListener("click", () => {
    addItem(item);
  });
});

function addItem(item) {
  const itemName = item.children[1].innerHTML;
  // if (purchaseInfo.find((item)=>item['name']==itemName)){
  //     const quantityInput = document.getElementById(itemName).children[1].children[2];
  //     quantityInput.value = parseInt(quantityInput.value) + 1;
  //     updateInfo(itemName, quantityInput.value);
  //     return;
  // }
  if (purchaseInfo.includes(itemName)) {
    const quantityInput =
      document.getElementById(itemName).children[1].children[2];
    quantityInput.value = parseInt(quantityInput.value) + 1;
    updateInfo(itemName, quantityInput.value);
    return;
  }
  const itemImage = item.querySelector("img").getAttribute("src");
  const itemPrice = item.children[2].innerHTML;
  const newDiv = document.createElement("div");
  // var newItem = {'name':itemName, 'quantity':1, 'price':itemPrice};
  // purchaseInfo.push(newItem);
  purchaseInfo.push(itemName);
  newDiv.innerHTML = `<div id="${itemName}" class="item-box">
        <img src="${itemImage}" class="item-image">
        <div class="detail-box">
        <div class="item-cart-title">${itemName}</div>
        <div class="price-box">
            <div class="item-price">${itemPrice}</div>
            <div class="item-amt">${itemPrice}</div>
        </div>
        <input type="number" value="1" min="0" class="item-quantity" onkeydown="javascript: return ['Backspace','Delete','ArrowLeft','ArrowRight'].includes(event.code) ? true : !isNaN(Number(event.key)) && event.code!=='Space'">
        </div>
        <img src="images/trash.jpg" class="item-remove">
    </div>`;
  const cartItems = document.querySelector(".sidebar-contents");
  cartItems.appendChild(newDiv);

  const itemDetails = document.getElementById(itemName);
  const quantityInput = itemDetails.children[1].children[2];
  quantityInput.addEventListener("input", () => {
    updateInfo(itemName, quantityInput.value);
  });

  const trash = itemDetails.children[2];
  trash.addEventListener("click", () => {
    removeInfo(itemName);
  });
}

function updateInfo(itemName, itemQuantity) {
  const itemDetails = document.getElementById(itemName).children[1];
  const priceBox = itemDetails.children[1];
  // const price = priceBox.children[0].textContent.replace('$','');
  const price = priceBox.children[0].textContent.substring(1);
  const itemSubtotal = priceBox.children[1];
  let result = itemQuantity * parseFloat(price);
  itemSubtotal.textContent = "$" + result.toFixed(2);
  calculateTotal();
}

function removeInfo(itemName) {
  const item = document.getElementById(itemName);
  item.parentNode.removeChild(item);
  purchaseInfo.splice(purchaseInfo.indexOf(itemName), 1);
  calculateTotal();
}

function calculateTotal() {
  prices = document.querySelectorAll(".item-amt");
  let total = 0;
  prices.forEach((price) => {
    const strPrice = price.textContent.substring(1);
    total += parseFloat(strPrice);
  });
  total = total.toFixed(2);
  const totalPrice = document.querySelector(".total-price");
  totalPrice.textContent = total;
}
