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
const output = document.getElementById('output');

let grouped_stuff;

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
var htmlLoader = this.document.getElementById("loader");

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

let keypoints = undefined;
let showVideo = true;

async function startFaceDection(video)
{
const ctx = output.getContext('2d');

output.width = videoWidth;
output.height = videoHeight;

if (showVideo)
{
    ctx.clearRect(0, 0, videoWidth, videoHeight);
    ctx.save();
    ctx.scale(-1, 1);
    ctx.translate(-videoWidth, 0);
    ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
    ctx.restore();
}

const net = await posenet.load({
    architecture: 'MobileNetV1',
    outputStride: 16,
    inputResolution: { width: videoWidth, height: videoHeight },
    multiplier: 1.0
});

async function frame() {
    const pose = await net.estimatePoses(video, {
        flipHorizontal: true,
        decodingMethod: 'single-person'
    });

    if (keypoints === undefined)
    {
        startButton.style.display = "inline";
        animateCSS(startButton, "fadeIn");
        htmlLoader.style.display = "none";
    }

    keypoints = pose[0].keypoints;

    if (showVideo)
    {
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
    }

    requestAnimationFrame(frame);
};

frame();
}

let video;

async function askVideo()
{
    video = await loadVideo();
    startFaceDection(video);
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
    grouped_stuff.position.y = 0.3;
    animateCSS(phase9, "fadeInRight");
})
}

plusSocial.onclick = function() {
data.social = Math.min(3, data.social + 1);
update_profile();
social.innerHTML = social_quality[data.social];
}

minusSocial.onclick = function() {
data.social = Math.max(0, data.social - 1);
update_profile();
social.innerHTML = social_quality[data.social];
}

plusSchool.onclick = function() {
data.school = Math.min(3, data.school + 1);
update_profile();
school.innerHTML = school_quality[data.school];
}

minusSchool.onclick = function() {
data.school = Math.max(0, data.school - 1);
update_profile();
school.innerHTML = school_quality[data.school];
}

plusRevenus.onclick = function() {
data.revenus = parseInt(revenus.innerHTML) + 100;
update_profile();
revenus.innerHTML = data.revenus;
revenus.classList.remove("animated", "pulse")
revenus.classList.add("animated", "pulse")
}

minusRevenus.onclick = function() {
data.revenus = Math.max(0, parseInt(revenus.innerHTML) - 100);
update_profile();
revenus.innerHTML = data.revenus;
revenus.classList.remove("animated", "pulse")
revenus.classList.add("animated", "pulse")
}

plusLoyer.onclick = function() {
data.loyer = parseInt(loyer.innerHTML) + 100;
update_profile();
loyer.innerHTML = data.loyer;
loyer.classList.remove("animated", "pulse")
loyer.classList.add("animated", "pulse")
}

minusLoyer.onclick = function() {
data.loyer = Math.max(0, parseInt(loyer.innerHTML) - 100);
update_profile();
loyer.innerHTML = data.loyer;
loyer.classList.remove("animated", "pulse")
loyer.classList.add("animated", "pulse")
}

plusDistance.onclick = function() {
data.distance = parseInt(distance.innerHTML) + 5;
update_profile();
distance.innerHTML = data.distance;
}

minusDistance.onclick = function() {
data.distance = Math.max(0, parseInt(distance.innerHTML) - 5);
update_profile();
distance.innerHTML = data.distance;
}

plusAge.onclick = function() {
data.age = parseInt(age.innerHTML) + 1;
update_profile();
age.innerHTML = data.age;
age.classList.remove("animated", "pulse")
age.classList.add("animated", "pulse")
}

minusAge.onclick = function() {
data.age = Math.max(0, parseInt(age.innerHTML) - 1);
update_profile();
age.innerHTML = data.age;
age.classList.remove("animated", "pulse")
age.classList.add("animated", "pulse")
}

imStudentButton.onclick = function() {
animateCSS(phase1, "fadeOutLeft", function() {
    phase1.style.display = "none";
    phase2.style.display = "block";
    htmlLoader.style.display = "block";
    animateCSS(htmlLoader, "fadeIn");
    animateCSS(phase2, "fadeIn", function() {
        output.style.display = "block";
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

// Visage 3D

var loader = new THREE.OBJLoader();
let mask;
loader.load(
'male_crop_head.obj',
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

// Profil de la personne

let vertices = [
new THREE.Vector3(0.0, 0.0, 0.0),
new THREE.Vector3(0.0, 0.5, 0.0),
new THREE.Vector3(-0.43, 0.25, 0.0),
new THREE.Vector3(-0.43, -0.25, 0.0),
new THREE.Vector3(0.0, -0.5, 0.0),
new THREE.Vector3(0.43, -0.25, 0.0),
new THREE.Vector3(0.43, 0.25, 0.0)
];

let lines_geometry = new THREE.Geometry();
lines_geometry.vertices.push(vertices[0], vertices[1]);
lines_geometry.vertices.push(vertices[0], vertices[2]);
lines_geometry.vertices.push(vertices[0], vertices[3]);
lines_geometry.vertices.push(vertices[0], vertices[4]);
lines_geometry.vertices.push(vertices[0], vertices[5]);
lines_geometry.vertices.push(vertices[0], vertices[6]);
lines_geometry.vertices.push(vertices[1], vertices[2]);
lines_geometry.vertices.push(vertices[2], vertices[3]);
lines_geometry.vertices.push(vertices[3], vertices[4]);
lines_geometry.vertices.push(vertices[4], vertices[5]);
lines_geometry.vertices.push(vertices[5], vertices[6]);
lines_geometry.vertices.push(vertices[6], vertices[1]);

let hexa_edges0 = new THREE.LineSegments(lines_geometry, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
let hexa_edges1 = new THREE.LineSegments(lines_geometry, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
hexa_edges1.scale.set(0.75, 0.75, 0.75);
let hexa_edges2 = new THREE.LineSegments(lines_geometry, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
hexa_edges2.scale.set(0.5, 0.5, 0.5);
let hexa_edges3 = new THREE.LineSegments(lines_geometry, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
hexa_edges3.scale.set(0.25, 0.25, 0.25);

let var1_mesh = new THREE.Mesh(new THREE.SphereGeometry( 0.025, 16, 16 ), new THREE.MeshLambertMaterial({color: 0xFF0000}));
let var2_mesh = new THREE.Mesh(new THREE.SphereGeometry( 0.025, 16, 16 ), new THREE.MeshLambertMaterial({color: 0xFFFF00}));
let var3_mesh = new THREE.Mesh(new THREE.SphereGeometry( 0.025, 16, 16 ), new THREE.MeshLambertMaterial({color: 0x00FF00}));
let var4_mesh = new THREE.Mesh(new THREE.SphereGeometry( 0.025, 16, 16 ), new THREE.MeshLambertMaterial({color: 0x00FFFF}));
let var5_mesh = new THREE.Mesh(new THREE.SphereGeometry( 0.025, 16, 16 ), new THREE.MeshLambertMaterial({color: 0x0000FF}));
let var6_mesh = new THREE.Mesh(new THREE.SphereGeometry( 0.025, 16, 16 ), new THREE.MeshLambertMaterial({color: 0xFF00FF}));

let variable_positions = [
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3()];
     
variable_positions[0].copy(vertices[0]);
variable_positions[1].copy(vertices[1]);
variable_positions[2].copy(vertices[2]);
variable_positions[3].copy(vertices[3]);
variable_positions[4].copy(vertices[4]);
variable_positions[5].copy(vertices[5]);
variable_positions[6].copy(vertices[6]);

let variable_colors = [new THREE.Color(0xDDDDDD),new THREE.Color(0xFF0000),new THREE.Color(0xFFFF00),new THREE.Color(0x00FF00),new THREE.Color(0x00FFFF),new THREE.Color(0x0000FF),new THREE.Color(0xFF00FF)];

let var_geometry = new THREE.Geometry();
var_geometry.vertices = variable_positions;

let face0 = new THREE.Face3(0, 1, 2);
face0.vertexColors[0] = variable_colors[0];
face0.vertexColors[1] = variable_colors[1];
face0.vertexColors[2] = variable_colors[2];
let face1 = new THREE.Face3(0, 2, 3);
face1.vertexColors[0] = variable_colors[0];
face1.vertexColors[1] = variable_colors[2];
face1.vertexColors[2] = variable_colors[3];
let face2 = new THREE.Face3(0, 3, 4);
face2.vertexColors[0] = variable_colors[0];
face2.vertexColors[1] = variable_colors[3];
face2.vertexColors[2] = variable_colors[4];
let face3 = new THREE.Face3(0, 4, 5);
face3.vertexColors[0] = variable_colors[0];
face3.vertexColors[1] = variable_colors[4];
face3.vertexColors[2] = variable_colors[5];
let face4 = new THREE.Face3(0, 5, 6);
face4.vertexColors[0] = variable_colors[0];
face4.vertexColors[1] = variable_colors[5];
face4.vertexColors[2] = variable_colors[6];
let face5 = new THREE.Face3(0, 6, 1);
face5.vertexColors[0] = variable_colors[0];
face5.vertexColors[1] = variable_colors[6];
face5.vertexColors[2] = variable_colors[1];

var_geometry.faces.push(face0);
var_geometry.faces.push(face1);
var_geometry.faces.push(face2);
var_geometry.faces.push(face3);
var_geometry.faces.push(face4);
var_geometry.faces.push(face5);

let var_mesh = new THREE.Mesh(var_geometry, new THREE.MeshLambertMaterial({vertexColors: THREE.VertexColors, transparent: true, opacity: 0.7}));
var_mesh.position.z += 0.01;

grouped_stuff = new THREE.Group();
grouped_stuff.add(hexa_edges0, hexa_edges1, hexa_edges2, hexa_edges3,var1_mesh, var2_mesh, var3_mesh, var4_mesh, var5_mesh, var6_mesh, var_mesh);
scene.add(grouped_stuff);
grouped_stuff.position.set(-0.5, 0, 0);

function set_var_positions(a, b, c, d, e, f)
{
    variable_positions[1].copy(vertices[1]).multiplyScalar(a);
    variable_positions[2].copy(vertices[2]).multiplyScalar(b);
    variable_positions[3].copy(vertices[3]).multiplyScalar(c);
    variable_positions[4].copy(vertices[4]).multiplyScalar(d);
    variable_positions[5].copy(vertices[5]).multiplyScalar(e);
    variable_positions[6].copy(vertices[6]).multiplyScalar(f);
    var1_mesh.position.copy(variable_positions[1]);
    var2_mesh.position.copy(variable_positions[2]);
    var3_mesh.position.copy(variable_positions[3]);
    var4_mesh.position.copy(variable_positions[4]);
    var5_mesh.position.copy(variable_positions[5]);
    var6_mesh.position.copy(variable_positions[6]);
    var_mesh.geometry.verticesNeedUpdate = true;
}

set_var_positions(0, 0, 0, 0, 0, 0);

// Map a value f in [0, 1]
function map(f, min, max)
{
    return Math.min(1.0, Math.max(0.0, (f - min) / (max - min)));
}

function update_profile()
{
    set_var_positions(
        map(data.age, 16.0, 26.0),
        map(data.revenus, 0.0, 1000.0),
        map(data.loyer, 0.0, 1000.0),
        map(data.distance, 0.0, 30.0),
        map(data.school, 0.0, 3.0),
        map(data.social, 0.0, 3.0));
}

function render()
{
    renderer.render( scene, camera );
}

function startAnimation() {
    update_profile();
    animate();
    renderer.domElement.style.display = "block";
    animateCSS(renderer.domElement, "fadeIn");
}

const z = new THREE.Vector3(0, 0, 1);

function animate()
{
    let nose = new THREE.Vector2(keypoints[0].position.x, keypoints[0].position.y);
    let leftEye = new THREE.Vector2(keypoints[1].position.x, keypoints[1].position.y);
    let rightEye = new THREE.Vector2(keypoints[2].position.x, keypoints[2].position.y);

    let nosex = (nose.x / videoWidth) * 1.0 - 0.5;
    let nosey = -((nose.y / videoWidth) * 1.0 - 0.5);

    let rl = new THREE.Vector2().subVectors(leftEye, rightEye);
    let tilt = rl.angle();

    mask.position.applyAxisAngle(z, tilt);


    //let leftEyeX = (leftEye.x / videoWidth) * 1.0 - 0.5;
    //let rightEyeX = (rightEye.x / videoWidth) * 1.0 - 0.5;

    //let headYRotation = (leftEyeX / nosex) / (rightEyeX / nosex) * 0.02;

    mask.position.x = 1.0 + nosex;
    mask.position.y = nosey;

    mask.rotation.y = -20.0;
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
    output.style.display = "none";
    showVideo = false;
    startAnimation();
}

}, false);