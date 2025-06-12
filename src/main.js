import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';;
import {Pane} from "tweakpane";

//Initializeing pane.
const pane = new Pane({
  title: 'Solar System Controls',
  expanded: true,
});

// Control parameters
const controls_params = {
  globalSpeed: 1.0,
  showOrbits: true,
  showLightHelper: true,
  // Individual planet speeds
  mercury: 1.0,
  venus: 1.0,
  earth: 1.0,
  mars: 1.0,
  jupiter: 1.0,
  saturn: 1.0,
  uranus: 1.0,
  neptune: 1.0,
  // Moon speeds
  moon: 1.0,
  phobos: 1.0,
  deimos: 1.0,
  ganymede: 1.0,
  callisto: 1.0,
  titan: 1.0,
  rhea: 1.0,
  iapetus: 1.0,
  titania: 1.0,
  oberon: 1.0,
  umbriel: 1.0,
  triton: 1.0,
  proteus: 1.0,
  nereid: 1.0,
};

//Createing a scene.
const scene = new THREE.Scene();

//Createing camera.
const aspectRetio = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(35, aspectRetio, 0.1, 400);
camera.position.y = 5;
camera.position.z = 300;
scene.add(camera);

//Add textureLoader.
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
cubeTextureLoader.setPath('/static/textures/cubeMap/Standard-Cube-Map/');
//Sun.
const sunTexture = textureLoader.load('/static/textures/cubeMap/2k_sun.jpg');
//Earth.
const earthTexture = textureLoader.load('/static/textures/cubeMap/Earth/earthmap1k.jpg');
  //Moon.
  const moonTexture = textureLoader.load('/static/textures/cubeMap/Moon/moonmap4k.jpg');
//Mars.
const marsTexture = textureLoader.load('/static/textures/cubeMap/Mars/mars_1k_color.jpg');
  //phobos.
  const phobosTexture = textureLoader.load('/static/textures/cubeMap/Mars/phobosbump.jpg');
  //Dimos.
  const dimosTexture = textureLoader.load('/static/textures/cubeMap/Mars/dimosbump.jpg');
//Mercury
const mercuryTexture = textureLoader.load('/static/textures/cubeMap/Mercury/mercurymap.jpg');
//Jupiter.
const jupiterTexture = textureLoader.load('/static/textures/cubeMap/Jupiter/jupitermap.jpg');
//Neptune.
const neptuneTexture = textureLoader.load('/static/textures/cubeMap/Neptune/neptunemap.jpg');
//Saturn.
const saturnTexture = textureLoader.load('/static/textures/cubeMap/Saturn/saturnmap.jpg');
//Uranus.
const uranusTexture = textureLoader.load('/static/textures/cubeMap/Uranus/uranusmap.jpg');
//Venus
const venusTexture = textureLoader.load('/static/textures/cubeMap/Venus/venusmap.jpg');
//Background or Milky way
const backgroundCubemap = cubeTextureLoader.load([
  'px.png',
  'nx.png',
  'py.png',
  'ny.png',
  'pz.png',
  'nz.png',
]);
scene.background = backgroundCubemap;

//Adding texture of every planets and their moon.
//Earth.
const earthMaterial = new THREE.MeshStandardMaterial({map: earthTexture});
  //Moon.
  const moonMaterial = new THREE.MeshStandardMaterial({map: moonTexture});
//Mars.
const marsMaterial = new THREE.MeshStandardMaterial({map: marsTexture});
  //Phobos.
  const phoboshMaterial = new THREE.MeshStandardMaterial({map: phobosTexture});
  //Dimos.
  const dimosMaterial = new THREE.MeshStandardMaterial({map: dimosTexture});
//Mercury.
const mercuryMaterial = new THREE.MeshStandardMaterial({map: mercuryTexture});
//Jupiter.
const jupiterMaterial = new THREE.MeshStandardMaterial({map: jupiterTexture});
//Neptune.
const neptuneMaterial = new THREE.MeshStandardMaterial({map: neptuneTexture});
//Saturn.
const saturnMaterial = new THREE.MeshStandardMaterial({map: saturnTexture});
//Uranus.
const uranusMaterial = new THREE.MeshStandardMaterial({map: uranusTexture});
//Venus.
const venusMaterial = new THREE.MeshStandardMaterial({map: venusTexture});

//Adding Geometrys here.
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

//Sun structure.
const sunMaterial = new THREE.MeshBasicMaterial({map: sunTexture});
const sun = new THREE.Mesh(sphereGeometry, sunMaterial);
scene.add(sun);
sun.scale.setScalar(8);

// Function to create orbit lines
const createOrbitLine = (radius, color = 0xffffff, opacity = 0.3) => {
  const points = [];
  const segments = 64;
  
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(
      Math.cos(angle) * radius,
      0,
      Math.sin(angle) * radius
    ));
  }
  
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ 
    color: color, 
    transparent: true, 
    opacity: opacity 
  });
  
  return new THREE.Line(geometry, material);
};

//Array containing info of planets.
const planets = [
  {
    name: 'Earth',
    radius: '1',
    distance: '20',
    speed: '0.005',
    material: earthMaterial,
    orbitColor: 0x00ff00,
    moons: [
      {
        name: 'Moon',
        radius: 0.3,
        distance: 3,
        speed: 0.015,
        material: moonMaterial,
        orbitColor: 0xcccccc,
      }
    ]
  },
  {
    name: 'Venus',
    radius: '0.95',
    distance: '15',
    speed: '0.0065',
    material: venusMaterial,
    orbitColor: 0xffc649,
    moons: []
  },
  {
    name: 'Mercury',
    radius: '0.6',
    distance: '10',
    speed: '0.008',
    material: mercuryMaterial,
    orbitColor: 0x8c7853,
    moons: []
  },
  {
    name: 'Mars',
    radius: '0.7',
    distance: '30',
    speed: '0.004',
    material: marsMaterial,
    orbitColor: 0xff4500,
    moons: [
      {
        name: 'Phobos',
        radius: 0.15,
        distance: 2,
        speed: 0.02,
        material: phoboshMaterial,
        orbitColor: 0xff6666,
      },
      {
        name: 'Deimos',
        radius: 0.1,
        distance: 3.5,
        speed: 0.01,
        material: dimosMaterial,
        orbitColor: 0xff8888,
      }
    ]
  },
  {
    name: 'Jupiter',
    radius: '2.5',
    distance: '50',
    speed: '0.002',
    material: jupiterMaterial,
    orbitColor: 0xd8ca9d,
    moons: [
      {
        name: 'Ganymede',
        radius: 0.41,
        distance: 2.7,
        speed: 0.012,
        material: moonMaterial,
        orbitColor: 0xaaaaaa,
      },
      {
        name: 'Callisto',
        radius: 0.38,
        distance: 3.9,
        speed: 0.011,
        material: moonMaterial,
        orbitColor: 0x999999,
      },
    ]
  },
  {
    name: 'Saturn',
    radius: '2.2',
    distance: '70',
    speed: '0.0018',
    material: saturnMaterial,
    orbitColor: 0xfad5a5,
    moons: [
      {
        name: 'Titan',
        radius: 0.4,
        distance: 3.5,
        speed: 0.009,
        material: moonMaterial,
        orbitColor: 0xffcc99,
      },
      {
        name: 'Rhea',
        radius: 0.15,
        distance: 2.5,
        speed: 0.008,
        material: moonMaterial,
        orbitColor: 0xffdd99,
      },
      {
        name: 'Iapetus',
        radius: 0.14,
        distance: 4.5,
        speed: 0.007,
        material: moonMaterial,
        orbitColor: 0xffee99,
      }
    ]
  },
  {
    name: 'Uranus',
    radius: '1.6',
    distance: '90',
    speed: '0.0015',
    material: uranusMaterial,
    orbitColor: 0x4fd0e3,
    moons: [
      {
        name: 'Titania',
        radius: 0.12,
        distance: 4,
        speed: 0.006,
        material: moonMaterial,
        orbitColor: 0x77ddff,
      },
      {
        name: 'Oberon',
        radius: 0.12,
        distance: 3.5,
        speed: 0.0058,
        material: moonMaterial,
        orbitColor: 0x88ddff,
      },
      {
        name: 'Umbriel',
        radius: 0.11,
        distance: 2.5,
        speed: 0.0062,
        material: moonMaterial,
        orbitColor: 0x99ddff,
      }
    ]
  },
  {
    name: 'Neptune',
    radius: '1.5',
    distance: '110',
    speed: '0.0012',
    material: neptuneMaterial,
    orbitColor: 0x4b70dd,
    moons: [
      {
        name: 'Triton',
        radius: 0.21,
        distance: 5,
        speed: 0.005,
        material: moonMaterial,
        orbitColor: 0x6666ff,
      },
      {
        name: 'Proteus',
        radius: 0.07,
        distance: 2.5,
        speed: 0.0045,
        material: moonMaterial,
        orbitColor: 0x7777ff,
      },
      {
        name: 'Nereid',
        radius: 0.03,
        distance: 6,
        speed: 0.0038,
        material: moonMaterial,
        orbitColor: 0x8888ff,
      }
    ]
  }
];

//Createing planets using loop.
const createPlanet = (planet) => {
  //Creating the mesh and add it to the secene.
   const planetMesh = new THREE.Mesh(sphereGeometry, planet.material);
   planetMesh.scale.setScalar(planet.radius);
   planetMesh.position.x = planet.distance;
   return planetMesh;
}

const createMoon = (moon) => {
  //Creating the mesh and add it to the secene.
  const moonMesh = new THREE.Mesh(sphereGeometry, moon.material || moonMaterial);
  moonMesh.scale.setScalar(moon.radius);
  moonMesh.position.x = moon.distance;
  return moonMesh;
}

// Showing planets on canvas using map method.
const planetMeshes = planets.map((planet) => {
  //Creating the planeMmesh using function and adding to the scene.
  const planetMesh = createPlanet(planet);
  scene.add(planetMesh);
  
  //Accessing every moon inside moons array.
  planet.moons.forEach((moon) => {
    //Creating the moonesh using function and adding to the scene.
    const moonMesh = createMoon(moon);
    planetMesh.add(moonMesh);
    
    // Create moon orbit line around the planet
    const moonOrbitLine = createOrbitLine(moon.distance, moon.orbitColor || 0xcccccc, 0.3);
    planetMesh.add(moonOrbitLine);
  });
  return planetMesh;
});

// Store orbit lines for toggling visibility
const planetOrbitLines = [];
planets.forEach((planet) => {
  const orbitLine = createOrbitLine(planet.distance, planet.orbitColor, 0.4);
  scene.add(orbitLine);
  planetOrbitLines.push(orbitLine);
});

//Adding point light(As if sun is the light source).
const pointLight = new THREE.PointLight(0xffffff, 8, 0, 0); // Higher intensity, no decay
pointLight.position.set(0, 0, 0);
scene.add(pointLight);
const helper = new THREE.PointLightHelper(pointLight, 2);
scene.add(helper);

//Adding ambient Light.
const ambientLight = new THREE.AmbientLight(0xffffff, 0.25); // Lower ambient light
scene.add(ambientLight);

// Create Tweakpane controls
const globalFolder = pane.addFolder({ title: 'Global Controls', expanded: true });
globalFolder.addBinding(controls_params, 'globalSpeed', { min: 0, max: 5, step: 0.1, label: 'Global Speed' });
globalFolder.addBinding(controls_params, 'showOrbits', { label: 'Show Orbits' }).on('change', (ev) => {
  planetOrbitLines.forEach(line => line.visible = ev.value);
  planetMeshes.forEach(planet => {
    planet.children.forEach(child => {
      if (child.type === 'Line') child.visible = ev.value;
    });
  });
});
globalFolder.addBinding(controls_params, 'showLightHelper', { label: 'Show Light Helper' }).on('change', (ev) => {
  helper.visible = ev.value;
});

const planetsFolder = pane.addFolder({ title: 'Planet Speeds', expanded: false });
planetsFolder.addBinding(controls_params, 'mercury', { min: 0, max: 5, step: 0.1, label: 'Mercury' });
planetsFolder.addBinding(controls_params, 'venus', { min: 0, max: 5, step: 0.1, label: 'Venus' });
planetsFolder.addBinding(controls_params, 'earth', { min: 0, max: 5, step: 0.1, label: 'Earth' });
planetsFolder.addBinding(controls_params, 'mars', { min: 0, max: 5, step: 0.1, label: 'Mars' });
planetsFolder.addBinding(controls_params, 'jupiter', { min: 0, max: 5, step: 0.1, label: 'Jupiter' });
planetsFolder.addBinding(controls_params, 'saturn', { min: 0, max: 5, step: 0.1, label: 'Saturn' });
planetsFolder.addBinding(controls_params, 'uranus', { min: 0, max: 5, step: 0.1, label: 'Uranus' });
planetsFolder.addBinding(controls_params, 'neptune', { min: 0, max: 5, step: 0.1, label: 'Neptune' });

const moonsFolder = pane.addFolder({ title: 'Moon Speeds', expanded: false });
moonsFolder.addBinding(controls_params, 'moon', { min: 0, max: 5, step: 0.1, label: 'Moon (Earth)' });
moonsFolder.addBinding(controls_params, 'phobos', { min: 0, max: 5, step: 0.1, label: 'Phobos (Mars)' });
moonsFolder.addBinding(controls_params, 'deimos', { min: 0, max: 5, step: 0.1, label: 'Deimos (Mars)' });
moonsFolder.addBinding(controls_params, 'ganymede', { min: 0, max: 5, step: 0.1, label: 'Ganymede (Jupiter)' });
moonsFolder.addBinding(controls_params, 'callisto', { min: 0, max: 5, step: 0.1, label: 'Callisto (Jupiter)' });
moonsFolder.addBinding(controls_params, 'titan', { min: 0, max: 5, step: 0.1, label: 'Titan (Saturn)' });
moonsFolder.addBinding(controls_params, 'rhea', { min: 0, max: 5, step: 0.1, label: 'Rhea (Saturn)' });
moonsFolder.addBinding(controls_params, 'iapetus', { min: 0, max: 5, step: 0.1, label: 'Iapetus (Saturn)' });
moonsFolder.addBinding(controls_params, 'titania', { min: 0, max: 5, step: 0.1, label: 'Titania (Uranus)' });
moonsFolder.addBinding(controls_params, 'oberon', { min: 0, max: 5, step: 0.1, label: 'Oberon (Uranus)' });
moonsFolder.addBinding(controls_params, 'umbriel', { min: 0, max: 5, step: 0.1, label: 'Umbriel (Uranus)' });
moonsFolder.addBinding(controls_params, 'triton', { min: 0, max: 5, step: 0.1, label: 'Triton (Neptune)' });
moonsFolder.addBinding(controls_params, 'proteus', { min: 0, max: 5, step: 0.1, label: 'Proteus (Neptune)' });
moonsFolder.addBinding(controls_params, 'nereid', { min: 0, max: 5, step: 0.1, label: 'Nereid (Neptune)' });

// Helper function to get planet speed multiplier
const getPlanetSpeedMultiplier = (planetIndex) => {
  const planetNames = ['earth', 'venus', 'mercury', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
  return controls_params[planetNames[planetIndex]] || 1.0;
};

// Helper function to get moon speed multiplier
const getMoonSpeedMultiplier = (planetIndex, moonIndex) => {
  const moonMappings = [
    ['moon'], // Earth moons
    [], // Venus moons
    [], // Mercury moons  
    ['phobos', 'deimos'], // Mars moons
    ['ganymede', 'callisto'], // Jupiter moons
    ['titan', 'rhea', 'iapetus'], // Saturn moons
    ['titania', 'oberon', 'umbriel'], // Uranus moons
    ['triton', 'proteus', 'nereid'] // Neptune moons
  ];
  
  const moonName = moonMappings[planetIndex]?.[moonIndex];
  return moonName ? controls_params[moonName] : 1.0;
};

//Createing Canvas.
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({canvas, antialias: true});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//Createing controls.
const controls = new OrbitControls(camera, canvas);
// controls.autoRotate = true;
controls.enableDamping = true;
controls.minDistance = 20;
controls.maxDistance = 200;

//Changing aspect ratio after change on every screen size change.
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
})

//Rendering the canvas after every frame.
const renderLooop = () => {
  planetMeshes.forEach((planet, planetIndex) => {
    const planetSpeedMultiplier = getPlanetSpeedMultiplier(planetIndex);
    const finalPlanetSpeed = planets[planetIndex].speed * controls_params.globalSpeed * planetSpeedMultiplier;
    
    planet.rotation.y += finalPlanetSpeed;
    planet.position.x = Math.sin(planet.rotation.y) * planets[planetIndex].distance;
    planet.position.z = Math.cos(planet.rotation.y) * planets[planetIndex].distance;
    
    // Filter out orbit lines and only animate actual moons
    const moons = planet.children.filter(child => child.type === 'Mesh');
    moons.forEach((moon, moonIndex) => {
      if (planets[planetIndex].moons[moonIndex]) {
        const moonSpeedMultiplier = getMoonSpeedMultiplier(planetIndex, moonIndex);
        const finalMoonSpeed = planets[planetIndex].moons[moonIndex].speed * controls_params.globalSpeed * moonSpeedMultiplier;
        
        moon.rotation.y += finalMoonSpeed;
        moon.position.x = Math.sin(moon.rotation.y) * planets[planetIndex].moons[moonIndex].distance;
        moon.position.z = Math.cos(moon.rotation.y) * planets[planetIndex].moons[moonIndex].distance;
      }
    })
  })

  controls.update()
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLooop);
}

renderLooop();