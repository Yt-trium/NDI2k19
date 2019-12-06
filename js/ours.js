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

const school_quality = ["Très mal", "Mal", "Bien", "Très bien"];
const social_quality = ["Très mal", "Mal", "Bien", "Très bien"];

let data = {
    age : 23,
    revenus : 0,
    loyer: 0,
    distance: 10,
    school: 2,
    social: 2
};

var phase1 = this.document.getElementById("phase1");
var phase2 = this.document.getElementById("phase2");
var phase3 = this.document.getElementById("phase3");
var phase4 = this.document.getElementById("phase4");
var phase5 = this.document.getElementById("phase5");
var phase6 = this.document.getElementById("phase6");
var phase7 = this.document.getElementById("phase7");
var phase8 = this.document.getElementById("phase8");
var phase9 = this.document.getElementById("phase9");
var phase3To4 = this.document.getElementById("phase-3-to-4");
var phase4To5 = this.document.getElementById("phase-4-to-5");
var phase5To6 = this.document.getElementById("phase-5-to-6");
var phase6To7 = this.document.getElementById("phase-6-to-7");
var phase7to8 = this.document.getElementById("phase-7-to-8");
var phase8to9 = this.document.getElementById("phase-8-to-9");
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
var plusDistance = this.document.getElementById("distance-plus");
var minusDistance = this.document.getElementById("distance-minus");
var distance = this.document.getElementById("distance");
var plusSchool = this.document.getElementById("school-plus");
var minusSchool = this.document.getElementById("school-minus");
var school = this.document.getElementById("school");
var plusSocial = this.document.getElementById("social-plus");
var minusSocial = this.document.getElementById("social-minus");
var social = this.document.getElementById("social");

const COLOR = 'aqua';

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

let firstPose = true;
let keypoints;

async function startFaceDection(video)
{
    //const canvas = document.getElementById('output');
    //const ctx = canvas.getContext('2d');

    const net = await posenet.load({
        architecture: 'MobileNetV1',
        outputStride: 16,
        inputResolution: { width: videoWidth, height: videoHeight },
        multiplier: 0.5
    });


    //canvas.width = videoWidth;
    //canvas.height = videoHeight;

    async function frame() {
        const pose = await net.estimatePoses(video, {
          flipHorizontal: true,
          decodingMethod: 'single-person'
        });

        keypoints = pose[0].keypoints;

        if (firstPose)
        {
            firstPose = false;
            startAnimation();
        }
        
        /*
        ctx.clearRect(0, 0, videoWidth, videoHeight);
        ctx.save();
        ctx.scale(-1, 1);
        ctx.translate(-videoWidth, 0);
        ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
        ctx.restore();


         pose.forEach(({score, keypoints}) => {
            if (score >= 0.1) {
                drawKeypoints(keypoints, 0.5, ctx);
            }
         });
         */

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

phase5To6.onclick = function() {
    animateCSS(phase5, "fadeOutLeft", function() {
        phase5.style.display = "none";
        phase6.style.display = "block";
        animateCSS(phase6, "fadeInRight");
    })
}

phase6To7.onclick = function() {
    animateCSS(phase6, "fadeOutLeft", function() {
        phase6.style.display = "none";
        phase7.style.display = "block";
        
        school.innerHTML = school_quality[2];

        animateCSS(phase7, "fadeInRight");
    })
}

phase7to8.onclick = function() {
    animateCSS(phase7, "fadeOutLeft", function() {
        phase7.style.display = "none";
        phase8.style.display = "block";
        
        social.innerHTML = social_quality[2];

        animateCSS(phase8, "fadeInRight");
    })
}

phase8to9.onclick = function() {
    animateCSS(phase8, "fadeOutLeft", function() {
        phase8.style.display = "none";
        phase9.style.display = "block";
        animateCSS(phase9, "fadeInRight");
    })
}

plusSocial.onclick = function() {
    data.social = Math.min(3, data.social + 1);
    social.innerHTML = social_quality[data.social];
}

minusSocial.onclick = function() {
    data.social = Math.max(0, data.social - 1);
    social.innerHTML = social_quality[data.social];
}

plusSchool.onclick = function() {
    data.school = Math.min(3, data.school + 1);
    school.innerHTML = school_quality[data.school];
}

minusSchool.onclick = function() {
    data.school = Math.max(0, data.school - 1);
    school.innerHTML = school_quality[data.school];
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

plusDistance.onclick = function() {
    data.distance = parseInt(distance.innerHTML) + 5;
    distance.innerHTML = data.distance;
}

minusDistance.onclick = function() {
    data.distance = Math.max(0, parseInt(distance.innerHTML) - 5);
    distance.innerHTML = data.distance;
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


// THEE . JS PART.

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x353435);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000.0);
camera.position.set(0, 0, 2);
const renderer = new THREE.WebGLRenderer();
renderer.domElement.className = "threejs";
renderer.domElement.style.display = "none";
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//let orbit_controls = new THREE.OrbitControls(camera, renderer.domElement)
//orbit_controls.enablePan = false;
//orbit_controls.update();
//orbit_controls.addEventListener('change', render);

let ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
scene.add(ambientLight);
var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add(directionalLight);

var loader = new THREE.OBJLoader();
let mask;
loader.load(
    '../obj/male_crop_head.obj',
    function ( object ) {
        mask = object;
        scene.add( object );
        mask.children[0].material.wireframe = true;
        mask.children[0].material.transparent = true;
        mask.children[0].material.opacity = 0.3;
    },
    function ( xhr ) {
        console.log("OBJ Progress: ", ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    function ( error ) {
        console.error( 'An error happened', error );
    }
    );


function render()
{
    renderer.render( scene, camera );

}

function startAnimation() {
    animate();
    renderer.domElement.style.display = "block";
    animateCSS(renderer.domElement, "fadeIn");
}

function animate()
{
    let nose = keypoints[0].position;
    let leftEye = keypoints[1].position;
    let rightEye = keypoints[2].position;

    let nosex = (nose.x / videoWidth) * 1.0 - 0.5;
    let nosey = (nose.y / videoWidth) * 1.0 - 0.5;

    let leftEyeX = (leftEye.x / videoWidth) * 1.0 - 0.5;
    let rightEyeX = (rightEye.x / videoWidth) * 1.0 - 0.5;

    let headYRotation = (leftEyeX / nosex) / (rightEyeX / nosex) * 0.02;

    mask.position.x = 1.0 + nosex;
    mask.position.y = nosey;

    mask.rotation.set(0.0, -20.0 + headYRotation, 0.0);
    mask.scale.set(1.5, 1.5, 1.5);


    render();

    requestAnimationFrame(animate);
}

// START 3D

startButton.onclick = function() {
    animateCSS(phase2, "fadeOutLeft", function() {
        phase2.style.display = "none";
        phase3.style.display = "block";
        animateCSS(phase3, "fadeInRight");
    })

    startFaceDection(video);
}

}, false);