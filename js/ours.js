window.addEventListener("load", function() {

var phase1 = this.document.getElementById("phase1");
var phase2 = this.document.getElementById("phase2");
var imStudentButton = this.document.getElementById("imStudent");
var startButton = this.document.getElementById("startButton");
var firstCamera = document.getElementById("firstCamera");

imStudentButton.onclick = function() {
    phase1.classList.add("animated", "fadeOutLeft");
    phase2.style.display = "block";
    phase2.classList.add("animated", "bounceIn", "delay-1s");

    navigator.mediaDevices.getUserMedia({video : true})
    .then(function(stream) {
        firstCamera.classList.add("animated", "fadeInUp");
        firstCamera.srcObject = stream;
        firstCamera.onloadedmetadata = function(e) {
            firstCamera.play();
            startButton.style.display = "block";
            startButton.classList.add("animated", "fadeIn");
        };
    })
    .catch(function(err) {
        console.error(err);
    });
};

}, false);