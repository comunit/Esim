let apidata = null;
let initData = function (filterByDuration, filterByData) {
    // create productitem for each package
    let pakages = apidata.obj.packageList;
    // filter out the packages and only show show the ones that have only one locationNetworkList
    pakages = pakages.filter((pakage) => pakage.locationNetworkList.length === 1);

    // If there are no packages, show an error message
    if (pakages.length === 0) {
        // hide spinner

        showerror("No packages available for this country");
        return;
    }

    // filter the packages by duration if filterByDuration is not null
    if (filterByDuration) {
        pakages = pakages.filter((pakage) => pakage.duration === filterByDuration.duration);
        document.getElementById("clearfilters").style.display = "block";
    }

    // filter the packages by data if filterByData is not null
    if (filterByData) {
        pakages = pakages.filter((pakage) => pakage.volume === filterByData.volume);
        document.getElementById("clearfilters").style.display = "block";
    }

    // fill the filterByDuration and filterByData
    let passDataForFiltering = apidata.obj.packageList;
    passDataForFiltering = passDataForFiltering.filter((pakage) => pakage.locationNetworkList.length === 1);
    fillthefilterData(passDataForFiltering);
    let productContainer = document.getElementById("products");
    productContainer.innerHTML = ""; // Clears previous items

    for (let i = 0; i < pakages.length; i++) {
        let package = pakages[i];
        let productItem = document.createElement("div");
        productItem.className = "product-item";

        let dataSize;
        const priceInDollars = (package.price / 10000).toFixed(2).replace(/\.00$/, "");
        if (package.volume >= 1024 * 1024 * 1024) {
            // If it's 1GB or more, show in GB
            dataSize = Math.floor(package.volume / (1024 * 1024 * 1024)) + "GB";
        } else {
            // If it's less than 1GB, show in MB
            dataSize = Math.floor(package.volume / (1024 * 1024)) + "MB";
        }

        let lowerlocationcode = package.locationNetworkList[0].locationCode.toLowerCase();

        productItem.innerHTML = `
                <div class="productitem" data-bs-productid="${package.packageCode}">
                    <div class="productdescandimage">
                        <img src="./images/countryimages/${lowerlocationcode}.png" class="img-fluid" alt="${package.locationNetworkList[0].locationName}" />
                        <p>${package.locationNetworkList[0].locationName}</p>
                        <p class="forsmallerscreendata">${dataSize}</p>
                    </div>
                    <div class="data">
                        <p>${dataSize}</p>
                    </div>
                    <div class="duration">
                        <p>${package.duration} ${package.durationUnit}</p>
                    </div>
                    <div class="price">
                        <p>$${priceInDollars}</p>
                    </div>
                    <div class="speed">
                        <p>${package.speed}</p>
                    </div>
                    <div class="buybutton">
                        <button>Buy</button>
                    </div>
                </div>
            `;

        // modal function
        productItem.querySelector(".buybutton button").addEventListener("click", () => {
            openModal(package.packageCode);
        });
        productContainer.appendChild(productItem);
    }
};

// get data from the api
let getapidata = function (location) {
    document.getElementsByClassName("productfilters")[0].style.display = "none";

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("locationcode", location);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
    };

    fetch("https://reachsim-a03f179f5949.herokuapp.com/esim/products", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            document.getElementsByClassName("productfilters")[0].style.display = "flex";
            apidata = result;
            initData();
        })
        .catch((error) => {
            showerror("Error fetching data from the server");
        });
};

// GET LOCATION FOROM THE URL /products.html?country=af
let url_string = window.location.href;
let url = new URL(url_string);
let country = url.searchParams.get("country");

getapidata(country.toUpperCase());

// showerror
let showerror = function (message) {
    document.getElementById("spinner").style.display = "none";
    document.getElementsByClassName("productfilters")[0].style.display = "none";
    document.getElementById("errormessage").innerHTML = message;
    document.getElementById("error").classList.remove("d-none");
};

// modal function
function openModal(packageCode) {
    // filter product by packageCode
    let product = apidata.obj.packageList.filter((pakage) => pakage.packageCode === packageCode)[0];
    console.log(product);
    // Set the modal title
    document.getElementById("exampleModalLabel").innerHTML = product.description;
    // flag image
    let lowerlocationcode = product.locationNetworkList[0].locationCode.toLowerCase();
    document.getElementById("modalflagpic").src = `./images/countryimages/${lowerlocationcode}.png`;
    // Select the modal element
    var myModal = new bootstrap.Modal(document.getElementById("productModal"));

    // Open the modal
    myModal.show();
}
