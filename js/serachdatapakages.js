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

// main search function
var search = (isClickOnsideButton) => {
    // call this when user click on arrow button
    if (isClickOnsideButton) {
        // empty input field then show all countries
        countryul.innerHTML = "";
        // empty search field
        searchdatapacks.value = "";
        countries.forEach(function (country) {
            var li = document.createElement("li");
            li.innerHTML = `<a class="dropdown-item text-capitalize d-flex align-items-center gap-2 py-2" href="#">
            <span>
            <img src="./images/countryimages/${country.isocode}.png" alt="${
                country.countryname
            }" class="img-fluid" data-countrycode="${country.isocode}">
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
        li.innerHTML = `<a class="dropdown-item text-capitalize d-flex align-items-center gap-2 py-2" href="#">
        <span>
        <img src="./images/countryimages/${country.isocode}.png" alt="${
            country.countryname
        }" class="img-fluid" data-countrycode="${country.isocode}">
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

// when user click on country then fill input field with country name
document.addEventListener("click", function (event) {
    if (event.target.closest(".dropdown-item")) {
        event.preventDefault(); // Prevent default link behavior
        // close dropdown
        coutrylistdropdown.style.height = "0";
        // hide arrow
        arrow.style.display = "none";
        // show spinner
        document.getElementById("searchspinner").classList.remove("d-none");
        // remove box shadow
        document.getElementById("maininputdropdownicon").style.boxShadow = "none";
        // fill country name
        searchdatapacks.value = event.target.innerText.trim();

        // send to product page
        window.location.href = `products.html?country=${event.target.querySelector("img").dataset.countrycode}`;
    }
});
