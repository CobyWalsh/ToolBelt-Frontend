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
    createPocketRing(['window', 'tree', 'faucet']);

    animate();
}

function createPocketItem(services) {
    const group = new THREE.Group();

    switch (services) {
        case 'window':
            // frame
            const frame = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 0.1),
                new THREE.MeshBasicMaterial({ color: 0xccccff })
            );
            group.add(frame);
            
            // crossbars
            const hBar = new THREE.Mesh(
                new THREE.BoxGeometry(1, 0.05, 0.11),
                new THREE.MeshBasicMaterial({ color: 0x333366})
            );
            const vBar = new THREE.Mesh(
                new THREE.BoxGeometry(0.05, 1, 0.11),
                new THREE.MeshBasicMaterial({ color: 0x333366})
            );
            group.add(hBar);
            group.add(vBar);
            break;

            case 'tree':
                const trunk = new THREE.Mesh(
                    new THREE.CylinderGeometry(0.1, 0.1, 0.5, 16),
                    new THREE.MeshBasicMaterial({ color: 0x8B4513})
                );
                const leaves = new THREE.Mesh(
                    new THREE.SphereGeometry(0.4, 16, 16),
                    new THREE.MeshBasicMaterial({ color: 0x228B22})
                );
                trunk.position.y = 0.25;
                leaves.position.y = 0.8;
                group.add(trunk);
                group.add(leaves);
                break;

                case 'faucet':
                    // Vertical pipe
                    const basePipe = new THREE.Mesh(
                        new THREE.CylinderGeometry(0.1, 0.1, 0.6, 16),
                        new THREE.MeshBasicMaterial({ color: 0x888888})
                    );
                    basePipe.position.y = 0.3;

                    // Curved faucet spout
                    const spout = new THREE.Mesh(
                        new THREE.TorusGeometry(0.2, 0.05, 8, 16, Math.PI),
                        new THREE.MeshBasicMaterial({ color: 0x888888})
                    );
                    spout.rotation.x = Math.PI / 2;
                    spout.position.y = 0.6;
                    spout.position.z = -0.2;

                    // Handle on top
                    const handle = new THREE.Mesh(
                        new THREE.BoxGeometry(0.15, 0.05, 0.15),
                        new THREE.MeshBasicMaterial({ color: 0x555555 })
                    );
                    handle.position.y = 0.65;

                    group.add(basePipe);
                    group.add(spout);
                    group.add(handle);
                    break;
    }

    return group;
}

// Creates simple placeholder pockets arranged in a circle
function createPocketRing(services) {
    const radius = 3;

    for (let i = 0; i < services.length; i++) {
        const angle = (i / services.length) * Math.PI * 2;
        const pocket = createPocketItem(services[i]);

        // Position in circular ring
        pocket.position.x = Math.cos(angle) * radius;
        pocket.position.z = Math.sin(angle) * radius;
        pocket.lookAt(new THREE.Vector3(0, 0, 0));

        beltGroup.add(pocket);
    }
}

// Animate the scene
function animate() {
    requestAnimationFrame(animate);
    beltGroup.rotation.y += 0.003; // slow rotation
    renderer.render(scene, camera);
}

init();