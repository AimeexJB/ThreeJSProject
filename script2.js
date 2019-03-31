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

var songs = [{"title": "Smells Like Teen Spirit - Nirvana", "source": "music/SmellsLikeTeenSpirit.mp3", "description": "Smells Like Teen Spirit is a song by American rock band Nirvana. It is the opening track and lead single from the band's second album, Nevermind (1991), released on DGC Records.Smells Like Teen Spirit was Nirvana's biggest hit, placing high on music industry charts around the world in 1991 and 1992. The unexpected success propelled Nevermind to the top of the charts at the 	start of 1992, an event often marked as the point where grunge entered the mainstream."},

			{"title": "Imagine - John Lennon", "source": "music/Imagine.mp3", "description": "Imagine is a song co-written and performed by English musician John Lennon. The best-selling single of his solo career, its lyrics encourage the listener to imagine a world at peace without the barriers of borders or the divisions of religion and nationality and to consider the possibility that the whole of humanity would live unattached to material possessions. Shortly before his death, Lennon said that much of the song's lyric and content came from his wife Yoko Ono, and in 2017, she received a co-writing credit"},

			{"title": "One - U2", "source": "music/One.mp3", "description": "One is a song by Irish rock band U2. It is the third track from their 1991 album Achtung Baby, and it was released as the record's third single in February 1992."},

			{"title": "Billie Jean - Michael Jackson", "source": "music/BillieJean.mp3", "description": "Billie Jean is a song by American singer Michael Jackson. The track was released by Epic Records on January 2, 1983 as the second single from his sixth studio album, Thriller (1982). It was written and composed by Jackson, who produced it with Quincy Jones."},

			{"title": "Bohemian Rhapsody - Queen", "source": "music/BohemianRhapsody.mp3", "description": "Bohemian Rhapsody is a song by the British rock band Queen. It was written by Freddie Mercury for the band's 1975 album A Night at the Opera. It is a six-minute suite, consisting of several sections without a chorus: an intro, a ballad segment, an operatic passage, a hard rock part and a reflective coda. The song is a more accessible take on the 1970s progressive rock genre."},

			{"title": "Hey Jude - The Beatles", "source": "music/HeyJude.mp3", "description": "Hey Jude is a song by the English rock band the Beatles that was released as a non-album single in August 1968. It was written by Paul McCartney and credited to the Lennon–McCartney partnership. The single was the Beatles' first release on their Apple record label and one of the First Four singles by Apple's roster of artists, marking the label's public launch. Hey Jude was a number-one hit in many countries around the world and became the top-selling single of 1968 in the UK, the US, Australia and Canada. Its nine-week run at number one on the Billboard Hot 100 tied the all-time record in 1968 for the longest run at the top of the US charts. It has sold approximately eight million copies and is frequently included on music critics' lists of the greatest songs of all time."},

			{"title": "I Can't Get No Satisfaction - Rolling Stones", "source": "music/ICantGetNo.mp3", "description": "(I Can't Get No) Satisfaction is a song by the English rock band the Rolling Stones, released in 1965. It was written by Mick Jagger and Keith Richards and produced by Andrew Loog Oldham. Richards three-note guitar riff—‌intended to be replaced by horns—‌opens and drives the song."},

			{"title": "Sweet Child O'Mine - Guns N' Roses", "source": "music/SweetChildMine.mp3", "description": "Sweet Child o' Mine is a song by American rock band Guns N' Roses, appearing on their debut album, Appetite for Destruction. Released in August 1988 as the album's third single, the song topped the Billboard Hot 100 chart, becoming the band's only number 1 US single. Billboard ranked it the number 5 song of 1988. Re-released in 1989, it reached number 6 on the UK Singles Chart."},

			{"title": "London Calling - The Clash", "source": "music/LondonCalling.mp3", "description": "London Calling is the third studio album by English rock band The Clash. It was originally released as a double album in the United Kingdom on 14 December 1979 by CBS Records, and in the United States in January 1980 by Epic Records."},

			{"title": "Hotel California - The Eagles", "source": "music/HotelCalifornia.mp3", "description": "Hotel California is the title track from the Eagles' album of the same name and was released as a single in February 1977. Writing credits for the song are shared by Don Felder (music), Don Henley, and Glenn Frey (lyrics). The Eagles' original recording of the song features Henley singing the lead vocals and concludes with an extended section of electric guitar interplay between Felder and Joe Walsh."},

			{"title": "Your Song - Elton John", "source": "music/YourSong.mp3", "description": "Your Song is a song composed and performed by English musician Elton John with lyrics by his longtime collaborator, Bernie Taupin. It originally appeared on John's self-titled second studio album (which was released in 1970). The song was released in the United States in October 1970 as the B-side to Take Me to the Pilot. Both songs received airplay, but Your Song was preferred by disc jockeys and replaced Take Me to the Pilot as the A-side, eventually making it to number eight on the Billboard chart. The song also peaked at number seven on the UK Singles Chart, as well as charting in the top 10 in several other countries."},

			{"title": "Stairway To Heaven - Led Zeppelin", "source": "music/StairwayToHeaven.mp3", "description": "Stairway to Heaven is a song by the English rock band Led Zeppelin, released in late 1971. It was composed by guitarist Jimmy Page and vocalist Robert Plant for the band's untitled fourth studio album (often called Led Zeppelin IV). It is often referred to as one of the greatest rock songs of all time."},

			{"title": "I Will Always Love You - Whitney Houston ", "source": "music/IWillAlwaysLoveYou.mp3", "description": "I Will Always Love You is a song originally written and recorded in 1973 by American singer-songwriter Dolly Parton. Her country version of the track was released in 1974 as a single and was written as a farewell to her one-time partner and mentor of seven years, Porter Wagoner, following Parton's decision to pursue a solo career. Whitney Houston recorded her version of the song for the 1992 film The Bodyguard. Her single spent 14 weeks at number one on the Billboard Hot 100 chart making it one of the best-selling singles of all time."},

			{"title": "Heartbreak Hotel - Elvis Presley", "source": "music/HeartbreakHotel.mp3", "description": "Heartbreak Hotel is a song recorded by American singer Elvis Presley. It was released as a single on January 27, 1956, Presley's first on his new record label RCA Victor. It was written by Tommy Durden and Mae Boren Axton. A newspaper article about the suicide of a lonely man who jumped from a hotel window inspired the lyrics. Axton presented the song to Presley in November 1955 at a country music convention in Nashville. Presley agreed to record it, and did so on January 10, 1956. Heartbreak Hotel comprises an eight-bar blues progression, with heavy reverberation throughout the track, to imitate the character of Presley's Sun recordings."},

			{"title": "Over The Rainbow - Judy Garland", "source": "music/OverTheRainbow.mp3", "description": "Over the Rainbow is a ballad composed by Harold Arlen with lyrics by Yip Harburg. It was written for the movie The Wizard of Oz and was sung by actress Judy Garland in her starring role as Dorothy Gale. It won the Academy Award for Best Original Song and became Garland's signature song."},

			{"title": "What's Goin' On - Marvin Gaye", "source": "music/WhatsGoinOn.mp3", "description": "What's Going On is a song by American recording artist Marvin Gaye, released in 1971 on the Motown subsidiary Tamla. Originally inspired by a police brutality incident witnessed by Renaldo Obie Benson, the song was composed by Benson, Al Cleveland and Gaye and produced by Gaye himself. The song marked Gayes departure from the Motown Sound towards more personal material. Later topping the Hot Soul Singles chart for five weeks and crossing over to number two on the Billboard Hot 100, it would sell over two million copies, becoming Gayes second-most successful Motown song to date."},

			{"title": "Creep - Radiohead", "source": "music/Creep.mp3", "description": "Creep is a song by the English alternative rock band Radiohead, released as their debut single in 1992. It appeared on their first album, Pablo Honey (1993). Creep was not initially a chart success, but became a worldwide hit after being rereleased in 1993. Radiohead took elements from the 1972 song The Air That I Breathe; following legal action, Albert Hammond and Mike Hazlewood are credited as cowriters."},

			{"title": "Bridge Over Troubled Water - Simon & Garfunkel", "source": "music/BridgeOverTroubledWater.mp3", "description": "Bridge over Troubled Water is the fifth and final studio album by American folk rock duo Simon & Garfunkel, released in January 1970 on Columbia Records. Following the duo's soundtrack for The Graduate, Art Garfunkel took an acting role in the film Catch-22, while Paul Simon worked on the songs, writing all tracks except Felice and Boudleaux Bryant's Bye Bye Love (previously a hit for the Everly Brothers)."},

			{"title": "Respect - Aretha Franklin", "source": "music/Respect.mp3", "description": "Respect is a song written and originally released by American recording artist Otis Redding in 1965. The song became a 1967 hit and signature song for R&B singer Aretha Franklin. The music in the two versions is significantly different, and through a few changes in the lyrics, the stories told by the songs have a different flavor. Redding's version is a plea from a desperate man, who will give his woman anything she wants. He won't care if she does him wrong, as long as he gets his due respect when he brings money home. However, Franklin's version is a declaration from a strong, confident woman, who knows that she has everything her man wants. She never does him wrong, and demands his respect. Franklin's version adds the R-E-S-P-E-C-T chorus and the backup singers' refrain of Sock it to me, sock it to me, sock it to me...."},

			{"title": "Dancing Queen - ABBA", "source": "music/DancingQueen.mp3", "description": "Dancing Queen is a Europop song by the Swedish group ABBA, and the lead single from their fourth studio album, Arrival. It was written by Benny Andersson, Björn Ulvaeus and Stig Anderson. Andersson and Ulvaeus also produced the song. Dancing Queen was released as a single in Sweden on 15 August 1976, followed by a UK release and the rest of Europe a few days later. It was a worldwide hit. It became ABBA's only number one hit in the United States, and topped the charts in Australia, Canada, the Netherlands, Belgium, Ireland, Mexico, New Zealand, Norway, South Africa, Spain, Sweden, the United Kingdom, Germany and Zimbabwe. Dancing Queen also reached the top five in many other countries"}];


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
	for (var i = 0; i < 500; i++){
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

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components
	mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

	// update the picking ray with the camera and mouse position
	raycaster.setFromCamera( mouse, camera );

	// calculate objects intersecting the picking ray
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

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components
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
			songInfo.style.margin = 'auto';
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
