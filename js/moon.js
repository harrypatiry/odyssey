// FPS
(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);})();

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer( );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// update viewport on resize
window.addEventListener( 'resize', function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize( width, height );
    camera.aspect = width / height; //aspect ratio
    camera.updateProjectionMatrix();
});

// controls
controls = new THREE.OrbitControls( camera, renderer.domElement);

// creates the shape
var geometry = new THREE.CubeGeometry( 250, 250, 250 );
var cubeMaterials = [
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load( '../img/sp2_ft.jpg' ), side: THREE.DoubleSide }), //front side
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load( '../img/sp2_bk.jpg' ), side: THREE.DoubleSide }), //back side
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load( '../img/sp2_up.jpg' ), side: THREE.DoubleSide }), //up side
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load( '../img/sp2_dn.jpg' ), side: THREE.DoubleSide }), //down side
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load( '../img/sp2_rt.jpg' ), side: THREE.DoubleSide }), //right side
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load( '../img/sp2_lf.jpg' ), side: THREE.DoubleSide }) //left side
];

var cubeMaterial = new THREE.MeshFaceMaterial( cubeMaterials );
var cube = new THREE.Mesh( geometry, cubeMaterial );
scene.add( cube );


// Camera Position
camera.position.z = 3;

// lighting
var ambientLight = new THREE.AmbientLight( 0xFFFFFF, 0.3 );
scene.add( ambientLight );



//game logic
var update = function ( ) {
    //cube.rotation.x += 0.01;
    //cube.rotation.y += 0.005;
};

//render logic
var render = function ( ) {
    renderer.render( scene, camera );
};

//run game loop (update, render, repeat)
var GameLoop = function () {
    requestAnimationFrame( GameLoop);
    update();
    render();
};

GameLoop();