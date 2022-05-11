import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from "https://unpkg.com/three@0.126.1/examples/jsm/loaders/GLTFLoader.js"

const loader = new THREE.TextureLoader();
const circle = loader.load('assets/circle.png')
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const gltfLoader = new GLTFLoader();
gltfLoader.load('assets/kepler.glb', function(glb) {
    const kepler = glb.scene;
    if (kepler) {
        kepler.rotation.x = 5;
        kepler.rotation.y = 3;
        kepler.rotation.z = .7;
        kepler.position.set(-1,-1,0)
        kepler.scale.set(.1,.1,.1)
    }
    scene.add(kepler);
})

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// const cubeGeometry = new THREE.BoxGeometry(.1, .1, .1);
// const cubeMaterial = new THREE.MeshBasicMaterial({ 
//     color: 0xffffff 
// });
// const cube = new THREE.Mesh( cubeGeometry, cubeMaterial );

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
dirLight.position.set(7, 7, 10);

scene.add( particle, dirLight );

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