var camera, scene, renderer, controls, raycaster;
var cube, container, selectedObject, sound;

var  mouse, INTERSECTED;

var objects = [];

var loader = new THREE.TextureLoader();

var songs = [{"title": "Smells Like Teen Spirit - Nirvana", "source": "music/song.mp3", "description": "10/10 would listen to"},
			{"title": "Imagine - John Lennon", "source": "music/song.mp3", "description": "10/10 would listen to"},
			{"title": "One - U2", "source": "music/song.mp3", "description": "10/10 would listen to"},
			{"title": "Billie Jean - Michael Jackson", "source": "music/song.mp3", "description": "10/10 would listen to"},
			{"title": "Bohemian Rhapsody - Queen", "source": "music/song.mp3", "description": "10/10 would listen to"},
			{"title": "Hey Jude - The Beatles", "source": "music/song.mp3", "description": "10/10 would listen to"},
			{"title": "I Can't Get No Satisfaction - Rolling Stones", "source": "music/song.mp3", "description": "10/10 would listen to"},
			{"title": "Sweet Child O'Mine - Guns N' Roses", "source": "music/song.mp3", "description": "10/10 would listen to"},
			{"title": "London Calling - The Clash", "source": "music/song.mp3", "description": "10/10 would listen to"},
			{"title": "Hotel California - The Eagles", "source": "music/song.mp3", "description": "10/10 would listen to"},
			{"title": "Your Song - Elton John", "source": "music/song.mp3", "description": "10/10 would listen to"},
			{"title": "Stairway To Heaven - Led Zeppelin", "source": "music/song.mp3", "description": "Song from Your Name movie 10/10 would listen to"},
			{"title": "I Will Always Love You - Whitney Houston", "source": "music/song.mp3", "description": "Song from Your Name movie 10/10 would listen to"},
			{"title": "Heartbreak Hotel - Elvis Presley", "source": "music/song.mp3", "description": "Song from Your Name movie 10/10 would listen to"},
			{"title": "Over The Rainbow - Judy Garland", "source": "music/song.mp3", "description": "Song from Your Name movie 10/10 would listen to"},
			{"title": "What's Goin' On - Marvin Gaye", "source": "music/song.mp3", "description": "Song from Your Name movie 0/10 would listen to"},
			{"title": "Creep - Radiohead", "source": "music/song.mp3", "description": "Song from Your Name movie 6/10 would listen to"},
			{"title": "Bridge Over Troubled Water - Simon & Garfunkel", "source": "music/song.mp3", "description": "Song from Your Name movie 6/10 would listen to"},
			{"title": "Respect - Aretha Franklin", "source": "music/song.mp3", "description": "Song from Your Name movie 6/10 would listen to"},
			{"title": "Dancing Queen - ABBA", "source": "music/song.mp3", "description": "Song from Your Name movie 6/10 would listen to"}];


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
	// renderer.vr.enabled = true;

	//--------------------------Adding the Controls to move--------------------------//
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	// controls = new THREE.FirstPersonControls( camera );

	// camera.position.set( 0, 20, 100 );
	camera.position.z = 5;
	controls.update();

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

	}

	//--------------------------Adding The lighting effects--------------------------//

	var light = new THREE.AmbientLight( 0x404040 ); // soft white light
	scene.add( light );

	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
	document.addEventListener( 'touchstart', onDocumentTouchStart, false );
	renderer.domElement.addEventListener("click", onclick, false)

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
			songAudio.innerHTML = songs[intersects[0].object.id -10].source;
			songInfo.innerHTML = songs[intersects[0].object.id -10].description;
			container.appendChild( boxinfo );

	}
	else {
		var songAudio = document.getElementById( 'myAudio' );
		document.body.appendChild( songAudio );
		songAudio.setAttribute("style", "display:none");
		container.remove(boxinfo)

	}
}

function animate() {

	// renderer.setAnimationLoop( render );

	requestAnimationFrame( animate );

	render();
};


function render() {

	controls.update();

	renderer.render( scene, camera );

};
