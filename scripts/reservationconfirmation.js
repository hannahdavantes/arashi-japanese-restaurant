const name = sessionStorage.getItem("name");
const email = sessionStorage.getItem("email");
const phone = sessionStorage.getItem("phone");
const date = sessionStorage.getItem("date");
const time = sessionStorage.getItem("time");
const guest = sessionStorage.getItem("guest");

document.getElementById("r_name").innerHTML = name;
document.getElementById("r_guest").innerHTML = guest;
document.getElementById("r_email").innerHTML = email;
document.getElementById("r_date").innerHTML =
  date.split(" ")[0] +
  " " +
  date.split(" ")[1] +
  ". " +
  date.split(" ")[2] +
  ", " +
  date.split(" ")[3];
document.getElementById("r_time").innerHTML = time;
document.getElementById("r_phone").innerHTML = phone;

var res_date = new Date(date);
var now = new Date();

var difference = Math.floor(res_date.getTime() - now.getTime());
var milliseconds = 1000 * 60 * 60 * 24;

var days = Math.floor(difference / milliseconds);
var months = Math.floor(days / 31);
var years = Math.floor(months / 12);

months = months % 12;
days = days % 31;

var text =
  "You have " +
  years +
  " years, " +
  months +
  " months, and " +
  days +
  " days left to cancel your reservation.";

document.getElementById("cancel").innerHTML = text;
