import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';

const loader = new THREE.TextureLoader();
const circle = loader.load('assets/circle.png')
const canvas = document.querySelector('canvas.cnvs');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const cubeGeometry = new THREE.BoxGeometry(.1, .1, .1);
const cubeMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xffffff 
});
const cube = new THREE.Mesh( cubeGeometry, cubeMaterial );

const particleGeometry = new THREE.BufferGeometry;
const particleCnt = 5000;

const posArray = new Float32Array(particleCnt * 3);
for(let i = 0; i < particleCnt; i++) {
    posArray[i] = (Math.random() - 0.5) * (Math.random() * 5);
}
particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

const particleMaterial = new THREE.PointsMaterial({
    color: 0xffffff ,
    size: 0.0045,
    map: circle,
    transparent: true
});
const particle = new THREE.Points(particleGeometry, particleMaterial)

scene.add(cube, particle );

camera.position.z = 1;

function animate() {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene, camera );
};

animate();