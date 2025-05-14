import * as THREE from 'three';

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

    // set up camera
    const fov = 75;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 1000;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 5;

    // set up renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true});
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.getElementById('carousel-container').appendChild(renderer.domElement);
}