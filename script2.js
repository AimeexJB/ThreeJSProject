var camera, scene, renderer, controls, raycaster;
var cube;

var  mouse, INTERSECTED;
var loader = new THREE.TextureLoader();

init();
animate();

function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 60, window.innerWidth/window.innerHeight, 0.1, 100);

	var listener = new THREE.AudioListener();
	camera.add( listener );

	raycaster = new THREE.Raycaster();
	mouse = new THREE.Vector2();

	raycaster.setFromCamera( mouse, camera );

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	controls = new THREE.OrbitControls( camera, renderer.domElement );

	camera.position.z = 5;

	loader.load('public/tron3.jpg', function(texture){
		var cubeGeom = new THREE.BoxGeometry(90, 90, 90);
		var cubeMat = new THREE.MeshBasicMaterial({
			map: texture,
			side: THREE.DoubleSide
		});
		cubeGeom.scale(-1, 1, 1);
		var mesh4 = new THREE.Mesh(cubeGeom, cubeMat);
		scene.add(mesh4);
		mesh4.position.set(0,0,0);
	})

	for (var i = 0; i < 1500; i++){
		var geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
		var material = new THREE.MeshLambertMaterial();
		//var material = new THREE.MeshBasicMaterial();
		cube = new THREE.Mesh( geometry, material );
		cube.position.z = (Math.random()* 100) - 50;
		cube.position.x = (Math.random()* 100) - 50;
		cube.position.y = (Math.random()* 100) - 50;
		scene.add( cube );
	}

	// var light = new THREE.PointLight(0xffffff, 20, 100);
	// light.position.set(30,0,0);
	// scene.add(light);

	var light = new THREE.AmbientLight( 0x404040 ); // soft white light
	scene.add( light );


	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
}

function onDocumentMouseMove( event ) {

	event.preventDefault();

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}


function animate() {

	requestAnimationFrame( animate );

	render();
};

function render() {

	raycaster.setFromCamera( mouse, camera );

	var intersects = raycaster.intersectObjects( scene.children );

 // 	if ( intersects.length > 0 ) {

	// 	var object = intersects[ 0 ].object;

	// 	if ( INTERSECTED !== object ) {

	// 		INTERSECTED = object;
	// 		INTERSECTED.material.color.set(0x7d00fd);

	// 	}
	// 	else if (INTERSECTED) {
	// 		INTERSECTED.material.color.set(0xffffff);
	// 		INTERSECTED = null;
	// 	}

	// }

	if ( intersects.length > 0 )
	{
		// if the closest object intersected is not the currently stored intersection object
		if ( intersects[ 0 ].object != INTERSECTED )
		{
		    // restore previous intersection object (if it exists) to its original color
			if ( INTERSECTED )
				INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
			// store reference to closest object as current intersection object
			INTERSECTED = intersects[ 0 ].object;
			// store color of closest object (for later restoration)
			INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
			// set a new color for closest object
			INTERSECTED.material.color.setHex( 0x7d00fd );
		}
	}
	else // there are no intersections
	{
		// restore previous intersection object (if it exists) to its original color
		if ( INTERSECTED )
			INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
		// remove previous intersection object reference
		//     by setting current intersection object to "nothing"
		INTERSECTED = null;
	}

	renderer.render( scene, camera );

}
