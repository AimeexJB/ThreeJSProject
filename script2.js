var camera, scene, renderer, controls, raycaster;
var cube, container, selectedObject, sound;

var  mouse, INTERSECTED;

var objects = [];

//VR
// var intersected = [];
// var controller1,  controller2;
// var group;
// var tempMatrix = new THREE.Matrix4();
//

var loader = new THREE.TextureLoader();

var songs = [{"title": "Smells Like Teen Spirit - Nirvana", "source": "music/SmellsLikeTeenSpirit.mp3", "description": "10/10 would listen to"},
			{"title": "Imagine - John Lennon", "source": "music/Imagine.mp3", "description": "10/10 would listen to"},
			{"title": "One - U2", "source": "music/One.mp3", "description": "10/10 would listen to"},
			{"title": "Billie Jean - Michael Jackson", "source": "music/BillieJean.mp3", "description": "10/10 would listen to"},
			{"title": "Bohemian Rhapsody - Queen", "source": "music/BohemianRhapsody.mp3", "description": "10/10 would listen to"},
			{"title": "Hey Jude - The Beatles", "source": "music/HeyJude.mp3", "description": "10/10 would listen to"},
			{"title": "I Can't Get No Satisfaction - Rolling Stones", "source": "music/ICantGetNo.mp3", "description": "10/10 would listen to"},
			{"title": "Sweet Child O'Mine - Guns N' Roses", "source": "music/SweetChildMine.mp3", "description": "10/10 would listen to"},
			{"title": "London Calling - The Clash", "source": "music/LondonCalling.mp3", "description": "10/10 would listen to"},
			{"title": "Hotel California - The Eagles", "source": "music/HotelCalifornia.mp3", "description": "10/10 would listen to"},
			{"title": "Your Song - Elton John", "source": "music/YourSong.mp3", "description": "10/10 would listen to"},
			{"title": "Stairway To Heaven - Led Zeppelin", "source": "music/StairwayToHeaven.mp3", "description": "Song from Your Name movie 10/10 would listen to"},
			{"title": "I Will Always Love You - Whitney Houston", "source": "music/IWillAlwaysLoveYou.mp3", "description": "Song from Your Name movie 10/10 would listen to"},
			{"title": "Heartbreak Hotel - Elvis Presley", "source": "music/HeartbreakHotel.mp3", "description": "Song from Your Name movie 10/10 would listen to"},
			{"title": "Over The Rainbow - Judy Garland", "source": "music/OverTheRainbow.mp3", "description": "Song from Your Name movie 10/10 would listen to"},
			{"title": "What's Goin' On - Marvin Gaye", "source": "music/WhatsGoinOn.mp3", "description": "Song from Your Name movie 0/10 would listen to"},
			{"title": "Creep - Radiohead", "source": "music/Creep.mp3", "description": "Song from Your Name movie 6/10 would listen to"},
			{"title": "Bridge Over Troubled Water - Simon & Garfunkel", "source": "music/BridgeOverTroubledWater.mp3", "description": "Song from Your Name movie 6/10 would listen to"},
			{"title": "Respect - Aretha Franklin", "source": "music/Respect.mp3", "description": "Song from Your Name movie 6/10 would listen to"},
			{"title": "Dancing Queen - ABBA", "source": "music/DancingQueen.mp3", "description": "Song from Your Name movie 6/10 would listen to"}];


init();
animate();

function init() {

	//--------------------------Adding text to screen--------------------------//
	container = document.createElement( 'div' );
	document.body.appendChild( container );

	var info = document.createElement( 'div' );
		info.style.position = 'absolute';
		info.style.top = '20px';
		info.style.color = 'white'
		info.style.width = '100%';
		info.style.textAlign = 'center';
		info.innerHTML = 'Interactive Museum';
	container.appendChild( info );

	//--------------------------Creating Scene--------------------------//
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 60, window.innerWidth/window.innerHeight, 0.1, 100);

	//--------------------------Adding Raycasting--------------------------//
	raycaster = new THREE.Raycaster();
	mouse = new THREE.Vector2();

	//--------------------------Rendering the Scene--------------------------//
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio)
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	//VR
	// renderer.vr.enabled = true;

	//--------------------------Adding the Controls to move--------------------------//
	controls = new THREE.OrbitControls( camera, renderer.domElement );

	camera.position.z = 5;
	controls.update();

	//VR
	// group = new THREE.Group();
	// scene.add( group );
	//


	//--------------------------Adding the Start Screen--------------------------//
	// var blocker = document.getElementById( 'blocker' );
	// var start = document.getElementById( 'start' );
	//
	// start.addEventListener( 'click', function () {
	// 	controls.lock();
	// }, false );
	//
	// controls.addEventListener( 'lock', function () {
	// 	start.style.display = 'none';
	// 	blocker.style.display = 'none';
	// } );
	//
	// controls.addEventListener( 'unlock', function () {
	// 	blocker.style.display = 'block';
	// 	start.style.display = '';
	// } );
	//
	// scene.add( controls.getObject() );

	//--------------------------Loading the Background Image--------------------------//
	loader.load('public/3.png', function(texture){
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


	//--------------------------Adding the Cubes to the Scene--------------------------//
	for (var i = 0; i < 20; i++){
		if (i <= 20) {
			var geometry = new THREE.BoxGeometry( 5, 5, 5 );
		} else {
			var geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
		}

		var material = new THREE.MeshLambertMaterial();
		cube = new THREE.Mesh( geometry, material );
		cube.position.z = (Math.random()* 80) - 40;
		cube.position.x = (Math.random()* 80) - 40;
		cube.position.y = (Math.random()* 80) - 40;
		scene.add( cube );
		objects.push( cube );

		//VR
		// group.add( cube );
		//

	}

	//--------------------------Adding The lighting effects--------------------------//

	var light = new THREE.AmbientLight( 0x404040 ); // soft white light
	scene.add( light );


	//--------------------------Adding The vr controls--------------------------//

	// controller1 = renderer.vr.getController( 0 );
	// controller1.addEventListener( 'selectstart', onSelectStart );
	// controller1.addEventListener( 'selectend', onSelectEnd );
	// scene.add( controller1 );
	//
	// controller2 = renderer.vr.getController( 1 );
	// controller2.addEventListener( 'selectstart', onSelectStart );
	// controller2.addEventListener( 'selectend', onSelectEnd );
	// scene.add( controller2 );
	//
	// var geometry2 = new THREE.BufferGeometry().setFromPoints( [ new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, - 1 ) ] );
	// var line = new THREE.Line( geometry2 );
	//
	// line.name = 'line';
	// line.scale.z = 5;
	// controller1.add( line.clone() );
	// controller2.add( line.clone() );

	//

	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
	document.addEventListener( 'touchstart', onDocumentTouchStart, false );
	renderer.domElement.addEventListener("click", onclick, false)
	window.addEventListener( 'resize', onWindowResize, false );


	//VR
	// document.body.appendChild( WEBVR.createButton( renderer ) );



}

function onDocumentTouchStart( event ) {

	event.preventDefault();

	event.clientX = event.touches[0].clientX;
	event.clientY = event.touches[0].clientY;
	onDocumentMouseDown( event );

}

function onDocumentMouseDown( event ) {

	event.preventDefault();

	mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

	raycaster.setFromCamera( mouse, camera );

	var intersects = raycaster.intersectObjects( objects, true );

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
		// by setting current intersection object to "nothing"
		INTERSECTED = null;
	}

}


function onclick(event) {
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

	raycaster.setFromCamera(mouse, camera);
	var intersects = raycaster.intersectObjects(objects, true);

	if (intersects.length > 0) {
		selectedObject = intersects[0].object;

		container = document.createElement( 'div' );
		container.setAttribute("class", "container");
		document.body.appendChild( container );

		var boxinfo = document.createElement( 'div' );
		var songTitle = document.createElement( 'h3' );
		var songAudio = document.getElementById( 'myAudio' );
		var songInfo = document.createElement( 'p' );
			boxinfo.appendChild( songTitle );
			boxinfo.appendChild( songAudio );
			boxinfo.appendChild( songInfo );
			boxinfo.setAttribute("class", "modal");
			boxinfo.style.color = 'black'
			songAudio.setAttribute("style", "display:block");

			songTitle.innerHTML = songs[intersects[0].object.id -10].title;

		var source = document.createElement( 'source' );
			songAudio.appendChild( source );
			source.setAttribute("src", songs[intersects[0].object.id -10].source );

			songInfo.innerHTML = songs[intersects[0].object.id -10].description;
			container.appendChild( boxinfo );

	}
	else {
		var songAudio = document.getElementById( 'myAudio' );
		document.body.appendChild( songAudio );
		// songAudio.removeChild( source );
		songAudio.setAttribute( "style", "display:none" );

		// boxinfo.removeChild( songTitle );
		// boxinfo.removeChild( songAudio );
		// boxinfo.removeChild( songInfo );

		container.remove(boxinfo)

	}
}

//
//VR CONTROLLER
// function onSelectStart( event ) {
//
// 	var controller = event.target;
// 	var intersections = getIntersections( controller );
//
// 	if ( intersections.length > 0 ) {
//
// 		var intersection = intersections[ 0 ];
// 		tempMatrix.getInverse( controller.matrixWorld );
//
// 		var object = intersection.object;
// 		object.matrix.premultiply( tempMatrix );
// 		object.matrix.decompose( object.position, object.quaternion, object.scale );
// 		object.material.emissive.b = 1;
//
// 		controller.add( object );
// 		controller.userData.selected = object;
// 	}
// }
//
// function onSelectEnd( event ) {
//
// 	var controller = event.target;
//
// 	if ( controller.userData.selected !== undefined ) {
//
// 		var object = controller.userData.selected;
// 		object.matrix.premultiply( controller.matrixWorld );
// 		object.matrix.decompose( object.position, object.quaternion, object.scale );
// 		object.material.emissive.b = 0;
//
// 		group.add( object );
//
// 		controller.userData.selected = undefined;
// 	}
// }
//
// function getIntersections( controller ) {
//
// 	tempMatrix.identity().extractRotation( controller.matrixWorld );
//
// 	raycaster.ray.origin.setFromMatrixPosition( controller.matrixWorld );
// 	raycaster.ray.direction.set( 0, 0, - 1 ).applyMatrix4( tempMatrix );
//
// 	return raycaster.intersectObjects( group.children );
// }
//
// function intersectObjects( controller ) {
//
// 	// Do not highlight when already selected
// 	if ( controller.userData.selected !== undefined ) return;
//
// 	var line = controller.getObjectByName( 'line' );
// 	var intersections = getIntersections( controller );
//
// 	if ( intersections.length > 0 ) {
//
// 		var intersection = intersections[ 0 ];
// 		var object = intersection.object;
// 		object.material.emissive.r = 1;
// 		intersected.push( object );
// 		line.scale.z = intersection.distance;
//
// 	} else {
//
// 		line.scale.z = 5;
// 	}
// }
//
// function cleanIntersected() {
//
// 	while ( intersected.length ) {
//
// 		var object = intersected.pop();
// 		object.material.emissive.r = 0;
//
// 	}
// }

//

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}


function animate() {

	//VR
	// renderer.setAnimationLoop( render );

	requestAnimationFrame( animate );

	render();
};


function render() {

	controls.update();

	//VR CONTROLLER
	// cleanIntersected();
	// intersectObjects( controller1 );
	// intersectObjects( controller2 );
	//

	renderer.render( scene, camera );

};
