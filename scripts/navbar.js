const toggleBtn = document.getElementsByClassName("navbar-toggle")[0];
const navbaritem = document.getElementsByClassName("navbar-item");
toggleBtn.addEventListener("click", function () {
  for (var i = 0; i < navbaritem.length; i++)
    navbaritem[i].classList.toggle("display-block");
});
