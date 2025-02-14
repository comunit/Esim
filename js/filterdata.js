let fillthefilterData = function (pakages) {
    let filterData = document.getElementById("filterdata");
    let filterDuration = document.getElementById("filterduration");
    let dropdownData = document.querySelector(".dropdownfordata");
    let dropdownDuration = document.querySelector(".dropdownforduration");

    let data = [];
    let duration = [];
    for (let i = 0; i < pakages.length; i++) {
        let package = pakages[i];
        let dataSize;
        if (package.volume >= 1024 * 1024 * 1024) {
            // If it's 1GB or more, show in GB
            dataSize = {
                size: Math.floor(package.volume / (1024 * 1024 * 1024)),
                unit: "GB",
                volume: package.volume,
            };
        } else {
            // If it's less than 1GB, show in MB
            dataSize = {
                size: Math.floor(package.volume / (1024 * 1024)),
                unit: "MB",
                volume: package.volume,
            };
        }
        if (!data.some((d) => d.size === dataSize.size && d.unit === dataSize.unit)) {
            data.push(dataSize);
        }
        if (!duration.includes(package.duration)) {
            duration.push(package.duration);
        }
    }

    // sort the data and duration in ascending order
    data.sort((a, b) => a.volume - b.volume);
    duration.sort((a, b) => a - b);

    // Fill the data filter
    let dataFilter = "";
    for (let i = 0; i < data.length; i++) {
        dataFilter += `<a class="dropdown-item" href="#" data-bs-volume="${data[i].volume}">${data[i].size} ${data[i].unit}</a>`;
    }
    dropdownData.innerHTML = dataFilter;

    // Fill the duration filter
    let durationFilter = "";
    for (let i = 0; i < duration.length; i++) {
        let dayordays = duration[i] === 1 ? "Day" : "Days";
        durationFilter += `<a class="dropdown-item" href="#" data-bs-duration="${duration[i]}">${duration[i]} ${dayordays}</a>`;
    }
    dropdownDuration.innerHTML = durationFilter;
};

if (document.getElementById("clearfilters")) {
    document.getElementById("clearfilters").addEventListener("click", function () {
        initData();
        document.getElementById("clearfilters").style.display = "none";
    });
}
