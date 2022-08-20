function validateForm() {
  console.log("test");
  var name = displayPlainText(document.getElementById("r_name").value);
  var email = document.getElementById("r_email").value;
  var phone = document.getElementById("r_phone").value;
  var date = document.getElementById("r_date").value;
  var date_value = new Date(date);
  var today = new Date();
  var time = document.getElementById("r_time").value;
  var guest = document.getElementById("r_guest").value;
  var error = document.getElementById("error");

  if (name == null || name == "" || email == null || email == "") {
    error.innerHTML = "Name/Email should not be empty";
    return false;
  }
  if (date_value < today) {
    error.innerHTML = "Reservation Date must not be in the past";
    return false;
  }
  if (phone.length != 10) {
    error.innerHTML = "Phone Number must have 10 digits only";
    return false;
  }
  if (guest < 1 || guest > 20) {
    error.innerHTML = "Number of guests must be 1-20 only";
    return false;
  }

  sessionStorage.setItem("name", name);
  sessionStorage.setItem("email", email);
  sessionStorage.setItem("phone", phone);
  sessionStorage.setItem("date", date_value);
  sessionStorage.setItem("time", time);
  sessionStorage.setItem("guest", guest);
}

function displayPlainText(text) {
  return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
