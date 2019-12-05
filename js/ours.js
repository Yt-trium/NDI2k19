window.addEventListener("load", function() {

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

const videoWidth = 200;
const videoHeight = 200;

var phase1 = this.document.getElementById("phase1");
var phase2 = this.document.getElementById("phase2");
var imStudentButton = this.document.getElementById("imStudent");
var startButton = this.document.getElementById("startButton");

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
    startButton.style.display = "block";
    startButton.classList.add("animated", "fadeIn");
}

imStudentButton.onclick = function() {
    phase1.classList.add("animated", "fadeOutLeft");
    phase2.style.display = "block";
    phase2.classList.add("animated", "bounceIn", "delay-1s");

    askVideo();
};

startButton.onclick = function() {
    phase2.classList.add("animated", "fadeOutLeft");

    startRender(video);
}

}, false);