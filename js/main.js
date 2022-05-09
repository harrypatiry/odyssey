//import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
import {PointerLockControls} from '/js/PointerLockControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
canvas: document.querySelector('#c'),
  
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(1);
camera.position.setY(100);


renderer.render(scene, camera);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)
//const controls = new OrbitControls(camera, renderer.domElement);
//controls.target.set(0, 0, 0);
let controls;
const objects = [];

			let raycaster;

			let moveForward = false;
			let moveBackward = false;
			let moveLeft = false;
			let moveRight = false;
			let canJump = false;

			let prevTime = performance.now();
			const velocity = new THREE.Vector3();
			const direction = new THREE.Vector3();
			const vertex = new THREE.Vector3();
			const color = new THREE.Color();
controls = new PointerLockControls( camera, document.body );

const blocker = document.getElementById( 'blocker' );
const instructions = document.getElementById( 'instructions' );

instructions.addEventListener( 'click', function () {

controls.lock();

} );

controls.addEventListener( 'lock', function () {

    instructions.style.display = 'none';
    blocker.style.display = 'none';

} );

controls.addEventListener( 'unlock', function () {

    blocker.style.display = 'block';
    instructions.style.display = '';

} );

scene.add( controls.getObject() );

const onKeyDown = function ( event ) {

    switch ( event.code ) {

        case 'ArrowUp':
        case 'KeyW':
        moveForward = true;
        break;

        case 'ArrowLeft':
        case 'KeyA':
        moveLeft = true;
        break;

        case 'ArrowDown':
        case 'KeyS':
        moveBackward = true;
        break;

        case 'ArrowRight':
        case 'KeyD':
        moveRight = true;
        break;

        case 'Space':
        if ( canJump === true ) velocity.y += 350;
        canJump = false;
        break;

    }

};

const onKeyUp = function ( event ) {

    switch ( event.code ) {

        case 'ArrowUp':
        case 'KeyW':
        moveForward = false;
        break;

        case 'ArrowLeft':
        case 'KeyA':
        moveLeft = false;
        break;

        case 'ArrowDown':
        case 'KeyS':
        moveBackward = false;
        break;

        case 'ArrowRight':
        case 'KeyD':
        moveRight = false;
        break;

    }

};

document.addEventListener( 'keydown', onKeyDown );
document.addEventListener( 'keyup', onKeyUp );

raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );

//plane 
var geo = new THREE.PlaneBufferGeometry(2000, 2000, 100, 100);
var mat = new THREE.MeshBasicMaterial({ color: 0xf1f1f1, side: THREE.DoubleSide, wireframe: true });
var plane = new THREE.Mesh(geo, mat);
    
    plane.rotateX( - Math.PI / 2);

scene.add(plane);

 for (var i = 0; i < 1000; i++) {
     var geometry = new THREE.BoxGeometry(2, 100, 2);
     var material = new THREE.MeshBasicMaterial({
        color: 0x080808,
        wireframe: true
    });
    var mesh = new THREE.Mesh(geometry, material);
     mesh.position.x = Math.random() * 1000;
     mesh.position.y = 50;
     mesh.position.z = Math.random() * 1000;
     scene.add(mesh);
 }

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(1500));

    star.position.set(x, y, z);
    scene.add(star);
}

Array(3000).fill().forEach(addStar);

// Background

const loader = new THREE.TextureLoader();
  const texture = loader.load(
    'images/studio.png',
    () => {
      const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
      rt.fromEquirectangularTexture(renderer, texture);
      scene.background = rt.texture;
    });


// Animation Loop

function animate() {
  requestAnimationFrame(animate);
    
    const time = performance.now();
    if ( controls.isLocked === true ) {

        raycaster.ray.origin.copy( controls.getObject().position );
        raycaster.ray.origin.y -= 10;

        const intersections = raycaster.intersectObjects( objects );
        const onObject = intersections.length > 0;

        const delta = ( time - prevTime ) / 1000;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;

        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

        direction.z = Number( moveForward ) - Number( moveBackward );
        direction.x = Number( moveRight ) - Number( moveLeft );
        direction.normalize(); // this ensures consistent movements in all directions

        if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
        if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;

        if ( onObject === true ) {

            velocity.y = Math.max( 0, velocity.y );
            canJump = true;

        }

    controls.moveRight( - velocity.x * delta );
    controls.moveForward( - velocity.z * delta );

    controls.getObject().position.y += ( velocity.y * delta ); // new behavior

    if ( controls.getObject().position.y < 10 ) {

        velocity.y = 0;
        controls.getObject().position.y = 10;

        canJump = true;

    }

}

    prevTime = time;

  //controls.update();

  renderer.render(scene, camera);
}

animate();