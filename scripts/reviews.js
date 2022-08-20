var reviews = [
  {
    "image": "review-1.jfif",
    "name": "Levi Swanson",
    "feedback": [
      "Great Food Quality",
      "Good Price for Serving Portion",
      "Good Presentation",
      "Easy to Order",
      "Accurate Service",
      "Accurate Pickup Time"
    ]
  },
  {
    "image": "review-2.jfif",
    "name": "Joseph Corona",
    "feedback": [
      "Great Food Quality",
      "Good Price for Serving Portion",
      "Good Presentation",
      "Easy to Order",
      "Accurate Service",
      "Accurate Pickup Time"
    ]
  },
  {
    "image": "review-3.jfif",
    "name": "Jarred Charlton",
    "feedback": [
      "Great Food Quality",
      "Good Price for Serving Portion",
      "Good Presentation",
      "Easy to Order",
      "Accurate Service",
      "Accurate Pickup Time"
    ]
  },
  {
    "image": "review-4.jfif",
    "name": "Dale Brook",
    "feedback": [
      "Great Food Quality",
      "Good Price for Serving Portion",
      "Good Presentation",
      "Easy to Order",
      "Accurate Service",
      "Accurate Pickup Time"
    ]
  },
  {
    "image": "review-5.jfif",
    "name": "Tobey Bright",
    "feedback": [
      "Great Food Quality",
      "Good Price for Serving Portion",
      "Good Presentation",
      "Easy to Order",
      "Accurate Service",
      "Accurate Pickup Time"
    ]
  },
  {
    "image": "review-6.jfif",
    "name": "Pippa Guerra",
    "feedback": [
      "Great Food Quality",
      "Good Price for Serving Portion",
      "Good Presentation",
      "Easy to Order",
      "Accurate Service",
      "Accurate Pickup Time"
    ]
  }
];

var section = document.getElementById("reviews");
window.onload = displayReviews;

function displayReviews() {
  for (let review of reviews) {
    var article = document.createElement("article");
    article.className = "review";

    var figure = document.createElement("figure");
    figure.className = "shape";
    figure.innerHTML = `
        <img class="img" 
            src="img/reviewers/${review.image}" 
            alt="${review.name}" 
        />
        <figcaption class="img-caption">
            ${review.name.split(" ")[0]}
        </figcaption>
    `;

    article.appendChild(figure);

    var text = document.createElement("div");
    text.className = "text";

    var h3 = document.createElement("h3");
    h3.innerText = review.name;
    text.appendChild(h3);

    var feedback = document.createElement("div");
    feedback.className = "feedback";
    for (let x of review.feedback) {
      var div = document.createElement("div");
      div.innerHTML = `
    <i class="fas fa-check-square"></i>
    ${x}
    `;
      text.appendChild(div);
    }

    article.appendChild(text);
    section.appendChild(article);
  }
}

function addReview() {
  var name = displayPlainText(document.getElementById("name").value);
  if (name == null || name == "") {
    document.getElementById("error").innerText = "Please enter a name";
    document.getElementById("feedback-form").scrollIntoView();
    return;
  }
  var img = "blank.png";
  var checkbox = document.querySelectorAll(".criteria");

  var criteria = [];
  for (var c of checkbox) {
    if (c.checked == true) {
      let lbl = getLabel(c.id);
      criteria.push(lbl);
    }
  }

  if (criteria.length == 0) {
    document.getElementById("error").innerText =
      "Please select a criteria we've met";
    document.getElementById("feedback-form").scrollIntoView();
    return;
  }

  var review = {
    "name": name,
    "image": img,
    "feedback": criteria
  };

  reviews.push(review);
  console.log(reviews);

  displayReviews();
}

function getLabel(id) {
  selector = "label[for=" + id + "]";
  label = document.querySelector(selector);
  text = label.innerHTML;
  return text;
}

function displayPlainText(text) {
  return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
