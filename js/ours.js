window.addEventListener("load", function() {

function animateCSS(node, animationName, callback) {
    node.classList.add('animated', animationName)

    function handleAnimationEnd() {
        node.classList.remove('animated', animationName)
        node.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
}

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

const videoWidth = 200;
const videoHeight = 200;

let data = {
    age : 23,
    revenus : 0,
    loyer: 0
};

var phase1 = this.document.getElementById("phase1");
var phase2 = this.document.getElementById("phase2");
var phase3 = this.document.getElementById("phase3");
var phase4 = this.document.getElementById("phase4");
var phase5 = this.document.getElementById("phase5");
var phase3To4 = this.document.getElementById("phase-3-to-4");
var phase4To5 = this.document.getElementById("phase-4-to-5");
var phase5To6 = this.document.getElementById("phase-5-to-6");
var imStudentButton = this.document.getElementById("imStudent");
var startButton = this.document.getElementById("startButton");
var plusAge = this.document.getElementById("age-plus");
var minusAge = this.document.getElementById("age-minus");
var age = this.document.getElementById("age");
var plusRevenus = this.document.getElementById("revenus-plus");
var minusRevenus = this.document.getElementById("revenus-minus");
var revenus = this.document.getElementById("revenus");
var plusLoyer = this.document.getElementById("loyer-plus");
var minusLoyer = this.document.getElementById("loyer-minus");
var loyer = this.document.getElementById("loyer");

const COLOR = 'aqua';

async function goAR()
{

    navigator.mediaDevices.getUserMedia({video : true})
    .then(function(stream) {
        video.classList.add("animated", "fadeInUp");
        video.srcObject = stream;
        video.onloadedmetadata = function(e) {
            video.play();
            startButton.style.display = "block";
            startButton.classList.add("animated", "fadeIn");
            startRenderer();
        };
    })
    .catch(function(err) {
        console.error(err);
    });
};

async function setupCamera()
{
    const video = document.getElementById('video');
    video.width = videoWidth;
    video.height = videoHeight;

    const stream = await navigator.mediaDevices.getUserMedia({
        'audio': false,
        'video': {
            facingMode: 'user',
            width: videoWidth,
            height: videoHeight,
        },
    });
    video.srcObject = stream;

    return new Promise((resolve) => {
        video.onloadedmetadata = () => {
            resolve(video);
        };
    });
}

async function loadVideo() {
  const video = await setupCamera();
  video.play();

  return video;
}

function drawPoint(ctx, y, x, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawKeypoints(keypoints, minConfidence, ctx, scale = 1) {
  for (let i = 0; i < keypoints.length; i++) {
    const keypoint = keypoints[i];

    if (keypoint.score < minConfidence) {
      continue;
    }

    const {y, x} = keypoint.position;
    drawPoint(ctx, y * scale, x * scale, 3, COLOR);
  }
}


async function startRender(video)
{
    const canvas = document.getElementById('output');
    const ctx = canvas.getContext('2d');

    const net = await posenet.load({
        architecture: 'MobileNetV1',
        outputStride: 16,
        inputResolution: { width: videoWidth, height: videoHeight },
        multiplier: 0.5
    });


    canvas.width = videoWidth;
    canvas.height = videoHeight;


    async function frame() {
        let poses = [];

        const pose = await net.estimatePoses(video, {
          flipHorizontal: true,
          decodingMethod: 'single-person'
        });

        poses = poses.concat(pose);

        ctx.clearRect(0, 0, videoWidth, videoHeight);
        ctx.save();
        ctx.scale(-1, 1);
        ctx.translate(-videoWidth, 0);
        ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
        ctx.restore();

         poses.forEach(({score, keypoints}) => {
            if (score >= 0.1) {
                drawKeypoints(keypoints, 0.5, ctx);
            }
         });

        requestAnimationFrame(frame);
    };

    frame();
}

let video;

async function askVideo()
{
    video = await loadVideo();
    startButton.style.display = "inline";
    animateCSS(startButton, "fadeIn");
}

phase3To4.onclick = function() {
    animateCSS(phase3, "fadeOutLeft", function() {
        phase3.style.display = "none";
        phase4.style.display = "block";
        animateCSS(phase4, "fadeInRight");
    })
}

phase4To5.onclick = function() {
    animateCSS(phase4, "fadeOutLeft", function() {
        phase4.style.display = "none";
        phase5.style.display = "block";
        animateCSS(phase5, "fadeInRight");
    })
}

plusRevenus.onclick = function() {
    data.revenus = parseInt(revenus.innerHTML) + 100;
    revenus.innerHTML = data.revenus;
    revenus.classList.remove("animated", "pulse")
    revenus.classList.add("animated", "pulse")
}

minusRevenus.onclick = function() {
    data.revenus = Math.max(0, parseInt(revenus.innerHTML) - 100);
    revenus.innerHTML = data.revenus;
    revenus.classList.remove("animated", "pulse")
    revenus.classList.add("animated", "pulse")
}

plusLoyer.onclick = function() {
    data.loyer = parseInt(loyer.innerHTML) + 100;
    loyer.innerHTML = data.loyer;
    loyer.classList.remove("animated", "pulse")
    loyer.classList.add("animated", "pulse")
}

minusLoyer.onclick = function() {
    data.loyer = Math.max(0, parseInt(loyer.innerHTML) - 100);
    loyer.innerHTML = data.loyer;
    loyer.classList.remove("animated", "pulse")
    loyer.classList.add("animated", "pulse")
}

plusAge.onclick = function() {
    data.age = parseInt(age.innerHTML) + 1;
    age.innerHTML = data.age;
    age.classList.remove("animated", "pulse")
    age.classList.add("animated", "pulse")
}

minusAge.onclick = function() {
    data.age = Math.max(0, parseInt(age.innerHTML) - 1);
    age.innerHTML = data.age;
    age.classList.remove("animated", "pulse")
    age.classList.add("animated", "pulse")
}

imStudentButton.onclick = function() {
    animateCSS(phase1, "fadeOutLeft", function() {
        phase1.style.display = "none";
        phase2.style.display = "block";
        animateCSS(phase2, "fadeIn", function() {
            askVideo();
        });
    });
};

startButton.onclick = function() {
    animateCSS(phase2, "fadeOutLeft", function() {
        phase2.style.display = "none";
        phase3.style.display = "block";
        animateCSS(phase3, "fadeInRight");
    })

    //startRender(video);
}

}, false);