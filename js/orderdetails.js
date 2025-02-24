let androidactivationguide = document.getElementById("androidactivationguide");
let iosactivationguide = document.getElementById("iosactivationguide");
let activateandroidbutton = document.getElementById("activateandroidbutton");
let activateiosbutton = document.getElementById("activateiosbutton");
let downarrowandord = document.getElementById("downarrowandorid");
let downarrowios = document.getElementById("downarrowios");

activateandroidbutton.addEventListener("click", function () {
    androidactivationguide.classList.remove("d-none");
    iosactivationguide.classList.add("d-none");
    activateandroidbutton.classList.add("active");
    activateiosbutton.classList.remove("active");
    // bring into view
    androidactivationguide.scrollIntoView();
    downarrowandord.style.transform = "rotate(360deg)";
    downarrowios.style.transform = "rotate(270deg)";
});

activateiosbutton.addEventListener("click", function () {
    iosactivationguide.classList.remove("d-none");
    androidactivationguide.classList.add("d-none");
    activateiosbutton.classList.add("active");
    activateandroidbutton.classList.remove("active");
    // bring into view
    iosactivationguide.scrollIntoView();
    downarrowios.style.transform = "rotate(360deg)";
    downarrowandord.style.transform = "rotate(270deg)";
});
