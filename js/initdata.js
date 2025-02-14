let initData = function (filterByDuration, filterByData) {
    // create productitem for each package
    let pakages = apidata.obj.packageList;
    // filter out the packages and only show show the ones that have only one locationNetworkList
    pakages = pakages.filter((pakage) => pakage.locationNetworkList.length === 1);
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
                <div class="productitem">
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

        productContainer.appendChild(productItem);
    }
};

// Initialize the data
initData();
