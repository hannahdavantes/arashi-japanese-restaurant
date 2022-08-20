var user_cart = JSON.parse(sessionStorage.getItem("cart"));

displayItems();

function displayItems() {
  console.log(user_cart);
  var table = document.getElementById("cart");
  var cart = table.getElementsByTagName("tbody")[0];
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
    dish.appendChild(dish_name);
    //create second column (qty)
    let dish2 = new_item.insertCell(1);
    let dish_qty = document.createTextNode(menu_qty);
    dish2.appendChild(dish_qty);
    //create third column (price)
    let dish3 = new_item.insertCell(2);
    let dish_price = document.createTextNode(
      (menu_price * menu_qty).toFixed(2)
    );
    dish3.appendChild(dish_price);
  }
  getTotalPrice();
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

function checkout() {
  document.getElementsByClassName("pickup-container")[0].style.display =
    "block";
  var now = new Date();
  document.getElementById("now").innerHTML = now.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  var pickup_time = new Date();
  pickup_time.setHours(now.getHours() + 4);
  console.log;

  document.getElementById("pickup-time").innerHTML = pickup_time.toLocaleString(
    "en-US",
    {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }
  );
}
