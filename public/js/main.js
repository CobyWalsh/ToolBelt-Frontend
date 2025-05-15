import * as THREE from './lib/three.module.js';
console.log("main.js is running");

document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("nav-toggle");
    const links = document.getElementById("nav-links");

    toggle.addEventListener("click", () => {
        links.classList.toggle("active");
    });
});

let scene, camera, renderer, beltGroup;

function init() {
    // set up scene
    scene = new THREE.Scene();
    const testGeo = new THREE.BoxGeometry(1, 1, 1);
    const testMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const testCube = new THREE.Mesh(testGeo, testMat);
    scene.add(testCube);

    // set up camera
    const fov = 75;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 1000;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 8;

    // set up renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true});
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.getElementById('carousel-container').appendChild(renderer.domElement);
    console.log('Renderer added:', renderer.domElement);


    // Add ambient light
    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    // Create a group for the toolbelt pockets
    beltGroup = new THREE.Group();
    scene.add(beltGroup);

    // Add sample pockets
    createPocketRing(6);

    animate();
}

// Creates simple placeholder pockets arranged in a circle
function createPocketRing(count) {
    const radius = 3;
    for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;

        // Placeholder: Plane with color
        const geometry = new THREE.PlaneGeometry(1, 1);
        const material = new THREE.MeshBasicMaterial({color: 0xC7AE6A, side: THREE.DoubleSide});
        const plane = new THREE.Mesh(geometry, material);

        // Position in circular ring
        plane.position.x = Math.cos(angle) * radius;
        plane.position.z = Math.sin(angle) * radius;
        plane.lookAt(new THREE.Vector3(0, 0, 0));
        beltGroup.add(plane);
    }
}

// Animate the scene
function animate() {
    requestAnimationFrame(animate);
    beltGroup.rotation.y += 0.003; // slow rotation
    renderer.render(scene, camera);
}

init();