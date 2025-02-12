var searchdatapacks = document.getElementById("searchdatapacks");
var coutrylistdropdown = document.getElementById("coutrylistdropdown");
var countryul = document.getElementById("countryul");
var arrow = document.getElementById("arrowdownonsearch");
var maininputdropdownicon = document.getElementById("maininputdropdownicon");
var form = document.getElementById("searchdatapakagesfrom ");

// if user type in input field then search
searchdatapacks.addEventListener("input", function () {
    let isClickOnsideButton = false;
    search(isClickOnsideButton);
});

// if user click on arrow button then search
maininputdropdownicon.addEventListener("click", function () {
    let isClickOnsideButton = true;
    search(isClickOnsideButton);
});

// if user click on input field then search
searchdatapacks.addEventListener("focus", function () {
    let isClickOnsideButton = true;
    search(isClickOnsideButton);
});

var search = (isClickOnsideButton) => {
    // call this when user click on arrow button
    if (isClickOnsideButton) {
        // empty input field then show all countries
        countryul.innerHTML = "";
        // empty search field
        searchdatapacks.value = "";
        countries.forEach(function (country) {
            var li = document.createElement("li");
            li.innerHTML = `<a class="dropdown-item d-flex align-items-center gap-2 py-2" href="#">
            <span>
            <image src="./images/countryimages/${country.isocode}.png" alt="${country.countryname}" class="img-fluid">
            </span>
            ${country.countryname.charAt(0).toUpperCase() + country.countryname.slice(1)}
            </a>`;
            countryul.appendChild(li);
        });

        searchdatapacks.focus();
        arrow.style.transform = "rotate(360deg)";
        coutrylistdropdown.style.height = countryul.scrollHeight + 3 + "px"; // Set actual height

        return;
    }

    // normal text search
    var datatosearch = countries.filter(function (country) {
        return country.countryname.toLowerCase().includes(searchdatapacks.value.toLowerCase());
    });

    countryul.innerHTML = "";

    datatosearch.forEach(function (country) {
        var li = document.createElement("li");
        li.innerHTML = `<a class="dropdown-item d-flex align-items-center gap-2 py-2" href="#">
        <span>
        <img src="./images/countryimages/${country.isocode}.png" alt="${country.countryname}" class="img-fluid">
        </span>
        ${country.countryname.charAt(0).toUpperCase() + country.countryname.slice(1)}
      </a>`;
        countryul.appendChild(li);
    });

    if (datatosearch.length > 0) {
        arrow.style.transform = "rotate(360deg)";
        coutrylistdropdown.style.height = countryul.scrollHeight + 3 + "px"; // Set actual height
    } else {
        arrow.style.transform = "rotate(270deg)";
        coutrylistdropdown.style.height = "0"; // Hide dropdown
    }

    if (searchdatapacks.value === "") {
        arrow.style.transform = "rotate(270deg)";
        coutrylistdropdown.style.height = "0"; // Hide dropdown
    }
};

// close dropdown when user click outside of dropdown or input field or arrow button or class dropdown-item
document.addEventListener("click", function (e) {
    if (
        e.target.id !== "searchdatapacks" &&
        e.target.id !== "arrowdownonsearch" &&
        e.target.id !== "maininputdropdownicon" &&
        e.target.id !== "countryul" &&
        e.target.className !== "dropdown-item d-flex align-items-center gap-2 py-2"
    ) {
        arrow.style.transform = "rotate(270deg)";
        coutrylistdropdown.style.height = "0";
    }
});

document.addEventListener("click", function (event) {
    if (event.target.closest(".dropdown-item")) {
        event.preventDefault(); // Prevent default link behavior
        console.log(`Clicked on: ${event.target.innerText.trim()}`);
        // Custom logic for handling the click event
    }
});
