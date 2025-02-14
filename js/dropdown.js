document.addEventListener("DOMContentLoaded", function () {
    let filterData = document.getElementById("filterdata");
    let filterDuration = document.getElementById("filterduration");
    let dropdownData = document.querySelector(".dropdownfordata");
    let dropdownDuration = document.querySelector(".dropdownforduration");

    // Function to close both dropdowns
    function closeDropdowns() {
        if (dropdownData.classList.contains("show")) {
            dropdownData.classList.remove("show");
        }
        if (dropdownDuration.classList.contains("show")) {
            dropdownDuration.classList.remove("show");
        }
    }

    // Toggle dropdowns when clicked
    filterData.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevents bubbling
        closeDropdowns();
        dropdownData.classList.toggle("show");
    });

    filterDuration.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevents bubbling
        closeDropdowns();
        dropdownDuration.classList.toggle("show");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (event) {
        if (
            !filterData.contains(event.target) &&
            !dropdownData.contains(event.target) &&
            !filterDuration.contains(event.target) &&
            !dropdownDuration.contains(event.target)
        ) {
            closeDropdowns();
        }
    });

    document.querySelectorAll(".dropdown-menu").forEach((dropdown) => {
        dropdown.addEventListener("click", function (event) {
            let item = event.target.closest(".dropdown-item");
            if (!item) return;

            event.stopPropagation(); // Prevent Bootstrap from closing immediately

            if (item.textContent.includes("GB") || item.textContent.includes("MB")) {
                let volume = {
                    volume: parseInt(item.getAttribute("data-bs-volume")),
                    type: "filterByData",
                };
                initData(null, volume);
            } else {
                let duration = {
                    duration: parseInt(item.getAttribute("data-bs-duration")),
                    type: "filterByDuration",
                };
                initData(duration, null);
            }

            setTimeout(() => closeDropdowns(), 100);
        });
    });
});
