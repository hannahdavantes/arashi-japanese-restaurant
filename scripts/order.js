var menu_data;
var user_cart = [];

async function initialize() {
  try {
    const response = await fetch(
      "https://hannahabigaildavantes.github.io/data/arashi-menu.json"
    );
    menu_data = await response.json();
    createMenu(menu_data);
  } catch (e) {
    console.log(e);
    console.log("There is a problem getting the menu items.");
  }
}

initialize();

function createMenu(menu_data) {
  for (let m of menu_data) {
    var cards = document
      .getElementById(getIdCategory(m.category))
      .querySelectorAll(".menu-cards")[0];

    var card = document.createElement("div");
    card.className = "menu-card";

    card.innerHTML = `
      <img
        src="img/menu/${m.photo}"
        alt="${m.name}"
        class="menu-img"
      />
      <input type="hidden" id="id" name="id" value="${m.id}">
      <h3 class="menu-name">${m.name}</h3>
      <h4 class="menu-price-left">$${m.price}</h4>
      <div onclick="addToCart(event)" class="btn-add">
      <i class="fas fa-plus-circle"></i>
    </div>
    `;

    cards.appendChild(card);
    hideOrShowOrderButton();
  }
}

function getIdCategory(category) {
  if (category == "appetizer") {
    return "appetizers";
  } else if (category == "Tempura") {
    return "tempuradishes";
  } else if (category == "Donburi Bowl") {
    return "donburibowls";
  } else if (category == "Udon") {
    return "udondishes";
  } else if (category == "Sashimi") {
    return "sashimi";
  } else if (category == "Sushi") {
    return "sushirolls";
  }
}

function showMenu(e, menuID) {
  var i;
  var x = document.getElementsByClassName("menu-category");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  var tablinks = document.getElementsByClassName("tab-link");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" tab-active", "");
  }

  document.getElementById(menuID).style.display = "block";
  e.currentTarget.className += " tab-active";
}

function addToCart(event) {
  var add_button = event.target;
  var menu_card = add_button.parentElement.parentElement;
  var selected_id = menu_card.querySelectorAll("input[type=hidden]")[0].value;
  console.log(id);

  let menu_object = menu_data.find((obj) => obj.id == selected_id);
  if (user_cart.find((obj) => obj.item.id == selected_id)) {
    let obj = user_cart.find((obj) => obj.item.id == selected_id);
    let old_qty = obj.quantity;
    obj.quantity = old_qty + 1;
  } else {
    // Create new object -> menu item and qty as properties
    var cart_item_obj = {
      "item": menu_object,
      "quantity": 1,
    };
    user_cart.push(cart_item_obj);
  }

  updateCartItems();
}

function updateCartItems() {
  var table = document.getElementById("cart");
  var cart = table.getElementsByTagName("tbody")[0];
  cart.innerHTML = "";

  for (let menu_object of user_cart) {
    var menu_id = menu_object.item.id;
    var menu_name = menu_object.item.name;
    var menu_price = menu_object.item.price;
    var menu_qty = menu_object.quantity;
    //create new row
    let new_item = cart.insertRow(-1);
    new_item.id = menu_id;
    //create first column (name)
    let dish = new_item.insertCell(0);
    let dish_name = document.createTextNode(menu_name);
    let dish_id = document.createElement("input");
    dish_id.type = "hidden";
    dish_id.name = "id";
    dish.appendChild(dish_name);
    //create second column (qty)
    let dish2 = new_item.insertCell(1);
    // let dish_qty = document.createTextNode(menu_qty);
    let dish_qty = document.createElement("input");
    dish_qty.type = "number";
    dish_qty.value = menu_qty;
    dish_qty.min = 1;
    dish_qty.max = 15;

    dish_qty.step = 1;
    dish_qty.keyp;
    dish_qty.addEventListener("input", function (event) {
      var td = event.target.parentNode;
      var tr = td.parentNode; // the row to be removed
      var id = tr.id;
      var item = user_cart.find((obj) => obj.item.id == id);
      var new_qty = Math.round(this.value);
      if (new_qty == 0) {
        new_qty = 1;
      }
      this.value = new_qty;
      item.quantity = new_qty;
      tr.cells[2].innerText = (menu_price * new_qty).toFixed(2);
      hideOrShowOrderButton();
      getTotalPrice();
    });
    dish2.appendChild(dish_qty);
    //create third column (price)
    let dish3 = new_item.insertCell(2);
    let dish_price = document.createTextNode(
      (menu_price * menu_qty).toFixed(2)
    );
    dish3.appendChild(dish_price);
    //create last column (delete button)
    let dish4 = new_item.insertCell(3);
    let dish_delete = document.createElement("i");
    dish_delete.className = "fas fa-trash";
    dish_delete.onclick = function (event) {
      var td = event.target.parentNode;
      var tr = td.parentNode; // the row to be removed
      var id = tr.id;
      var item = user_cart.find((obj) => obj.item.id == id);
      item.quantity = 0;
      tr.parentNode.removeChild(tr);
      user_cart.splice(
        user_cart.findIndex((obj) => obj.item.id == id),
        1
      );
      hideOrShowOrderButton();
      getTotalPrice();
    };
    dish4.appendChild(dish_delete);
    hideOrShowOrderButton();
    getTotalPrice();
    console.log(user_cart);
    document.getElementById("cart").scrollIntoView();
  }
}

function getTotalPrice() {
  console.log(user_cart);
  var cart = document.getElementById("cart");
  var table_body = cart.getElementsByTagName("tbody")[0];
  var row_count = table_body.rows.length;
  var total = 0;
  for (var i = 0; i < row_count; i++) {
    var tr = table_body.rows[i];
    var td = tr.getElementsByTagName("td")[2].innerText;
    // var price = td.innerText;
    var price_value = parseFloat(td.replace("$", ""));
    total += price_value;
  }

  document.getElementById("total").innerHTML = total.toFixed(2);
}

function showOrderSummary() {
  console.log(user_cart);
  sessionStorage.setItem("cart", JSON.stringify(user_cart));
}

function hideOrShowOrderButton() {
  if (user_cart.length == 0) {
    document.getElementById("total-box").style.display = "none";
    document.getElementById("order-button").style.display = "none";
    document.getElementById("empty-box").style.display = "block";
  } else {
    document.getElementById("order-button").style.display = "block";
    document.getElementById("total-box").style.display = "block";
    document.getElementById("empty-box").style.display = "none";
  }
}
