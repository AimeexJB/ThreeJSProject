if ( WEBGL.isWebGLAvailable() === false ) {
		document.body.appendChild( WEBGL.getWebGLErrorMessage() );
	}
	var scene, camera, renderer;
	var startButton = document.getElementById( 'startButton' );
	startButton.addEventListener( 'click', init );
	function init() {
		var overlay = document.getElementById( 'overlay' );
		overlay.remove();
		var container = document.getElementById( 'container' );
		//
		camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 100 );
		camera.position.set( 0, 1, 2 );
		var reflectionCube = new THREE.CubeTextureLoader()
			.setPath( 'textures/cube/SwedishRoyalCastle/' )
			.load( [ 'px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg' ] );
		reflectionCube.format = THREE.RGBFormat;
		scene = new THREE.Scene();
		scene.background = new THREE.Color( 0xa0a0a0 );
		scene.fog = new THREE.Fog( 0xa0a0a0, 2, 20 );
		//
		var light = new THREE.HemisphereLight( 0xffffff, 0x444444 );
		light.position.set( 0, 200, 0 );
		scene.add( light );
		light = new THREE.DirectionalLight( 0xffffff );
		light.position.set( 0, 200, 100 );
		light.castShadow = true;
		light.shadow.camera.top = 180;
		light.shadow.camera.bottom = - 100;
		light.shadow.camera.left = - 120;
		light.shadow.camera.right = 120;
		scene.add( light );
		//
		var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 20, 20 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
		mesh.rotation.x = - Math.PI / 2;
		mesh.receiveShadow = true;
		scene.add( mesh );
		var grid = new THREE.GridHelper( 20, 20, 0x000000, 0x000000 );
		grid.material.opacity = 0.2;
		grid.material.transparent = true;
		scene.add( grid );
		//
		var listener = new THREE.AudioListener();
		camera.add( listener );
		var audioElement = document.getElementById( 'music' );
		var positionalAudio = new THREE.PositionalAudio( listener );
		positionalAudio.setMediaElementSource( audioElement );
		positionalAudio.setRefDistance( 1 );
		positionalAudio.setDirectionalCone( 210, 230, 0.1 );
		//
		var gltfLoader = new THREE.GLTFLoader();
		gltfLoader.load( 'models/gltf/BoomBox/glTF-Binary/BoomBox.glb', function ( gltf ) {
			var boomBox = gltf.scene;
			boomBox.position.set( 0, 0.2, 0 );
			boomBox.scale.set( 20, 20, 20 );
			boomBox.traverse( function ( object ) {
				if ( object.isMesh ) {
					object.material.envMap = reflectionCube;
					object.geometry.rotateY( - Math.PI );
				}
			} );
			audioElement.play();
			boomBox.add( positionalAudio );
			scene.add( boomBox );
			animate();
		} );
		// sound is damped behind this wall
		var wallGeometry = new THREE.BoxBufferGeometry( 2, 1, 0.1 );
		var wallMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
		var wall = new THREE.Mesh( wallGeometry, wallMaterial );
		wall.position.set( 0, 0.5, - 0.5 );
		scene.add( wall );
		//
		renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.setPixelRatio( window.devicePixelRatio );
		container.appendChild( renderer.domElement );
		renderer.gammaOutput = true;
		//
		var controls = new THREE.OrbitControls( camera, renderer.domElement );
		controls.target.set( 0, 0.1, 0 );
		controls.update();
		controls.minDistance = 0.5;
		controls.maxDistance = 10;
		controls.maxPolarAngle = 0.5 * Math.PI;
		//
		window.addEventListener( 'resize', onWindowResize, false );
	}
	function onWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
	}
	function animate() {
		requestAnimationFrame( animate );
		renderer.render( scene, camera );
	}
	