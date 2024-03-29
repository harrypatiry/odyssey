import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from "https://unpkg.com/three@0.126.1/examples/jsm/loaders/GLTFLoader.js"

let urlSelection = window.location.href.toString().split("/").pop();
let selection = urlSelection.split("#").pop();
let texture, desc;
let sunTxt = false;

    switch (selection) {
        case "mars":
            texture = "assets/mars.jpg";
            desc = document.getElementById("mars");
            desc.classList.toggle("active");
            break;
        case "mercury":
            texture = "assets/mercury.jpg";
            desc = document.getElementById("mercury");
            desc.classList.toggle("active");
            break;
        case "venus":
            texture = "assets/venus.jpg";
            desc = document.getElementById("venus");
            desc.classList.toggle("active");
            break;
        case "jupiter":
            texture = "assets/jupiter.jpg";
            desc = document.getElementById("jupiter");
            desc.classList.toggle("active");
            break;
        case "saturn":
            texture = "assets/saturn.jpg";
            desc = document.getElementById("saturn");
            desc.classList.toggle("active");
            break;
        case "uranus":
            texture = "assets/uranus.jpg";
            desc = document.getElementById("uranus");
            desc.classList.toggle("active");
            break;
        case "neptune":
            texture = "assets/neptune.jpg";
            desc = document.getElementById("neptune");
            desc.classList.toggle("active");
            break;
        case "pluto":
            texture = "assets/pluto.jpg";
            desc = document.getElementById("pluto");
            desc.classList.toggle("active");
            break;
        case "sun":
            texture = "assets/sun.jpg";
            desc = document.getElementById("sun");
            desc.classList.toggle("active");
            sunTxt = true;
            break;
        case "titan":
            texture = "assets/titan.jpg";
            desc = document.getElementById("titan");
            desc.classList.toggle("active");
            break;
        case "earth":
            texture = "assets/earth.jpg";
            desc = document.getElementById("earth");
            desc.classList.toggle("active");
            break;
        default:
            texture = "";
            desc = document.getElementById("home");
            desc.classList.toggle("active");
            break;
    }
    const gltfLoader = new GLTFLoader();
    gltfLoader.load('assets/kepler.glb', function(glb) {
        const kepler = glb.scene;
        if (kepler) {
            kepler.rotation.x = 5;
            kepler.rotation.y = 3;
            kepler.rotation.z = .7;
            kepler.position.set(-1.5,-1,0)
            kepler.scale.set(.1,.1,.1)
        }
        if(!texture) {
            scene.add(kepler);
        }
    })
let textureSource = texture;
const loader = new THREE.TextureLoader();
const earth = loader.load(textureSource);
const circle = loader.load('assets/circle.png')
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const sphereGeometry = new THREE.SphereGeometry(1.5, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ 
    map: earth,
    transparent: true
});
const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );

const particleGeometry = new THREE.BufferGeometry;
const particleCnt = 2500;

const posArray = new Float32Array(particleCnt * 3);
for(let i = 0; i < particleCnt; i++) {
    posArray[i] = (Math.random() - 0.5) * (Math.random() * 100);
}
particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

const particleMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.01,
    map: circle,
    transparent: true
});
const particle = new THREE.Points(particleGeometry, particleMaterial)
const dirLight = new THREE.DirectionalLight(0x404040, 3)
const ambLight = new THREE.AmbientLight(0x404040 , 3)
dirLight.position.set(7, 2, 10);

scene.add( sphere, particle );
if(sunTxt) {
    scene.add( ambLight );
} else {
    scene.add( dirLight );
}

new OrbitControls(camera, renderer.domElement)
camera.position.z = 5;

//mouse
document.addEventListener('mousemove', animateParticles);
let mouseX = 0;
let mouseY = 0;

function animateParticles(event) {
    mouseY = event.clientY;
    mouseX = event.clientX;
}
const rld = (event) => {
    location.reload();
  };
const sel = document.querySelector('.nav-links');
sel.addEventListener('click', () => setTimeout(rld, 10))

function animate() {
    requestAnimationFrame( animate );

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    particle.rotation.y = mouseY / 1000;
    particle.rotation.x = mouseX / 1000;

    window.addEventListener( 'resize', onWindowResize, false );
    function onWindowResize(){

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    
        renderer.setSize( window.innerWidth, window.innerHeight );
    
    }

    renderer.render( scene, camera );
};

animate();