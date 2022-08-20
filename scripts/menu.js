async function initialize() {
  try {
    const response = await fetch(
      "https://hannahabigaildavantes.github.io/data/arashi-menu.json"
    );
    const menu_data = await response.json();
    console.log(menu_data);
    createMenu(menu_data);
  } catch (e) {
    console.log(e);
    console.log("There is a problem getting the menu items.");
  }
}

initialize();

function createMenu(menu_data) {
  for (let m of menu_data) {
    console.log(m.name);
    console.log(getIdCategory(m.category));
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
        <h3 class="menu-name">${m.name}</h3>
        <h4 class="menu-price">$${m.price}</h4>
    `;

    cards.appendChild(card);
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
