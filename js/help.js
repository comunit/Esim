let helptopics = document.querySelectorAll(".helptopic");
let helpquestionandanswers = document.querySelectorAll(".helpquestionandanswer");

helptopics.forEach((topic) => {
    // get id of the topic
    let topicid = topic.id;
    topic.addEventListener("click", () => {
        closeAllHelpTopics();
        // add activetopic class to the clicked topic
        topic.classList.add("activetopic");
        if (document.getElementById(topicid + "-helpmain") != null) {
            document.getElementById(topicid + "-helpmain").style.display = "block";
            // bring into view if screen size is less than 700px
            if (window.innerWidth < 700) {
                document.getElementById("contactsupport").scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "nearest",
                });
            }
        }
    });
});

function closeAllHelpTopics() {
    helptopics.forEach((topic) => {
        if (document.getElementById(topic.id + "-helpmain") != null) {
            document.getElementById(topic.id + "-helpmain").style.display = "none";
        }
        // close welcome-helpmain if open initial helpmain
        document.getElementById("welcome-helpmain").style.display = "none";
    });

    // remove activetopic class from all topics
    helptopics.forEach((topic) => {
        topic.classList.remove("activetopic");
    });
}

helpquestionandanswers.forEach((questionandanswer) => {
    questionandanswer.addEventListener("click", () => {
        // check if clicked on the one which is already open then only close clicked one else close all
        if (questionandanswer.querySelector(".answer").style.display === "block") {
            questionandanswer.querySelector(".answer").style.display = "none";
            questionandanswer.querySelector("img").style.transform = "rotate(0deg)";
            return;
        } else {
            closeAllHelpquestionandanswers();
        }

        // get .answer within the clicked questionandanswer
        let answer = questionandanswer.querySelector(".answer");
        // img within the clicked questionandanswer
        let img = questionandanswer.querySelector("img");
        img.style.transition = "transform 0.5s";
        // rotate the img
        if (img.style.transform === "rotate(90deg)") {
            img.style.transform = "rotate(0deg)";
        } else {
            img.style.transform = "rotate(90deg)";
        }
        // toggle the display of the answer
        if (answer.style.display === "block") {
            answer.style.display = "none";
        } else {
            answer.style.display = "block";
        }
    });
});

function closeAllHelpquestionandanswers() {
    helpquestionandanswers.forEach((questionandanswer) => {
        let answer = questionandanswer.querySelector(".answer");
        let img = questionandanswer.querySelector("img");
        answer.style.display = "none";
        img.style.transform = "rotate(0deg)";
    });
}
