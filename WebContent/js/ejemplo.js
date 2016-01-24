 // this function is executed on each animation frame
function animate() {

	 planet1.rotation.y += 0.0085;
	 planet2.rotation.y += 0.0085;
     // render
     renderer.render(scene, camera);

     // request new frame
     requestAnimationFrame(function () {
         animate();
     });
}

// renderer
var canvasContainer = document.getElementById("canvasContainer");
var renderer = new THREE.WebGLRenderer();
renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
canvasContainer.appendChild(renderer.domElement);

// camera
var camera = new THREE.PerspectiveCamera(45, (canvasContainer.offsetWidth) / canvasContainer.offsetHeight, 1, 2000);
camera.position.z = 1000;

// scene
var scene = new THREE.Scene();

// light
var directionalLight = new THREE.DirectionalLight( {color: 0xffffff}, 1.2 );
directionalLight.castShadow = true;
directionalLight.shadowCameraRight =  10;
directionalLight.shadowCameraLeft = -10;
directionalLight.shadowCameraTop =  10;
directionalLight.shadowCameraBottom = -10;
directionalLight.shadowBias = -0.0001;
directionalLight.shadowCameraFar = 3500;
directionalLight.position.set( 1.2, 1, 2 );
scene.add(directionalLight);

// load model 1
var planet1 = new THREE.Object3D();
var jsonLoader = new THREE.JSONLoader();
jsonLoader.load(
     'models/planeta.json', function (geometry, materials) {
    	 var planet;
    	 var planetMat = new THREE.MeshLambertMaterial({color: 0xffffff});
         
         planet = new THREE.Mesh( geometry, planetMat);
         planet.geometry.scale(30,30,30);
         
         var loader = new THREE.TextureLoader();
         loader.load('textures/earthmap1k.jpg', function (texture) {
        	planet.material.map = texture; 
         });
         var loader = new THREE.TextureLoader();
         loader.load('textures/earthspec1k.jpg', function (texture) {
        	planet.material.specularMap = texture; 
            planet.material.needsUpdate = true;
       	 	
            planet1.add(planet);
         });
     }
);

//load model 2
var planet2 = new THREE.Object3D();
var jsonLoader = new THREE.JSONLoader();
jsonLoader.load(
     'models/planeta.json', function (geometry, materials) {
    	 var planet;
    	 var planetMat = new THREE.MeshLambertMaterial({color: 0xffffff});
         
         planet = new THREE.Mesh( geometry, planetMat);
         planet.geometry.scale(300,300,300);
         
         var loader = new THREE.TextureLoader();
         loader.load('textures/jupitermap.jpg', function (texture) {
        	planet.material.map = texture; 
            //planet.material.needsUpdate = true;
       	 	
            planet2.add(planet);
         });
     }
);


scene.add(planet1);
planet1.position.x -= 350;


scene.add(planet2);
planet2.position.x += 350;


 // start animation
 animate();


