var escena = new THREE.Scene();
// OrthographicCamera( left, right, top, bottom, near, far )
var camara = new THREE.PerspectiveCamera
( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var container = document.getElementById("container");

var renderer = new THREE.WebGLRenderer();
	//renderer.setSize( window.innerWidth, window.innerHeight );
	//document.body.appendChild( renderer.domElement );
	renderer.shadowMapEnabled = true;

renderer.setSize(container.offsetWidth, container.offsetHeight);
container.appendChild(renderer.domElement);


// Creacion cubo
var geometria = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshPhongMaterial( {color: 0x538ACD} );
var cubo = new THREE.Mesh( geometria, material );
cubo.castShadow = true;
cubo.receiveShadow = true;

// Piso
var geoPiso = new THREE.PlaneGeometry( 10, 10);
var matPiso = new THREE.MeshPhongMaterial( {color: 0xDFDFDF, specular: 0x050505});
var piso = new THREE.Mesh( geoPiso, matPiso);
piso.receiveShadow = true;
piso.castShadow = true;

// Creacion luz
// THREE.DirectionalLight( color, intensidad );
var directionalLight = new THREE.DirectionalLight( {color: 0xffffff}, 2 );
directionalLight.castShadow = true;
directionalLight.shadowCameraRight     =  10;
directionalLight.shadowCameraLeft     = -10;
directionalLight.shadowCameraTop      =  10;
directionalLight.shadowCameraBottom   = -10;
directionalLight.shadowBias = -0.0001;
directionalLight.shadowCameraFar = 3500;

escena.add( directionalLight );
escena.add( cubo );
escena.add( piso );

// .add pone todo, pero en la posicion por defecto (0,0,0), asi que toca mover la camara
camara.position.z = 5;
directionalLight.position.set( 0.5, 1, 2 );
piso.position.y = -1.5;
piso.rotation.x = -Math.PI/2;

// Loop de animacion (60 fps)
function render() {
	// Evita que este dibujando cuando se cambia de pagina o pestaña
	requestAnimationFrame( render );
	// renderiza la escena con la camara
	renderer.render( escena, camara );

	rotacionCubo();
}

function rotacionCubo() {
	cubo.rotation.x += 0.01;
	cubo.rotation.y += 0.01;
}

render();

// remember these initial values
var tanFOV = Math.tan( ( ( Math.PI / 180 ) * camera.fov / 2 ) );
var windowHeight = window.innerHeight;

// Event Listeners
// -----------------------------------------------------------------------------
window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize( event ) {

    camera.aspect = window.innerWidth / window.innerHeight;
    
    // adjust the FOV
    camera.fov = ( 360 / Math.PI ) * Math.atan( tanFOV * ( window.innerHeight / windowHeight ) );
    
    camera.updateProjectionMatrix();
    camera.lookAt( scene.position );

    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.render( scene, camera );
    
}