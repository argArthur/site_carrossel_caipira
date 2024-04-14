import './css/style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const initialZ = 10;
camera.position.setZ(initialZ);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
console.log(`resolution ${window.innerWidth} x ${window.innerHeight}`);
renderer.setSize(window.innerWidth*2, window.innerHeight*2, false);

const geometry = new THREE.BoxGeometry(3, 3, 3);
const material = new THREE.MeshStandardMaterial({ color:0xfffff });
const box = new THREE.Mesh(geometry, material);

const bgeometry = new THREE.SphereGeometry(7);
const sphere = new THREE.Mesh(bgeometry, material);
sphere.position.z = 15;
sphere.position.x = 10;

// scene.add(box, sphere) box covering up robot
scene.add(sphere);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(3, 3, 3);

const ambientLight = new THREE.AmbientLight(0xfff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(30, 30);
const polarHelper = new THREE.PolarGridHelper(30, 30);
scene.add(lightHelper, gridHelper, polarHelper);

const controls = new OrbitControls(camera, renderer.domElement);

const assetLoader = new GLTFLoader();

assetLoader.load('./carrossel.glb', (gltf) => {
  const model = gltf.scene;
  model.position.y = 1;
  scene.add(model);
}, undefined, console.error);

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    camera.position.z = t * -0.2 + initialZ;
    camera.position.x = t * -0.04;
    camera.position.y = t * -0.04;
}

moveCamera();
document.body.onscroll = moveCamera;

function animate() {
    requestAnimationFrame(animate);

    box.rotation.x += 0.01;
    box.rotation.y += 0.005;

    controls.update();

    renderer.render(scene, camera);
}

document.addEventListener('keypress', () => {
    console.log(camera.position);
}); // position camera with orbital controls to find position

animate();
