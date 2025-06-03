// import * as THREE from './lib/three.module.js';
console.log("main.js is running");

document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("nav-toggle");
    const links = document.getElementById("nav-links");

    toggle.addEventListener("click", () => {
        links.classList.toggle("active");
    });

    // Scroll triggered animation
const sections = document.querySelectorAll('.signup-container');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        console.log('Observed:', entry.target, 'IsIntersecting:', entry.isIntersecting);
        if (entry.isIntersecting) {
            const direction = entry.target.getAttribute('data-direction');
            entry.target.classList.add(direction === 'right' ? 'slide-in-right' : 'slide-in-left');        }
    });
}, {
    threshold: 0.1
});

sections.forEach(section => {
    const isAlt = section.parentElement.classList.contains('alt');
    section.setAttribute('data-direction', isAlt ? 'right' : 'left');
    observer.observe(section);
   });
});

// let isDragging = false;
// let previousMouseX = 0;
// let scene, camera, renderer, beltGroup;
// let raycaster, mouse;

// const leatherTexture = new THREE.TextureLoader().load('images/leather.png'); // Add this image to assets
// leatherTexture.wrapS = leatherTexture.wrapT = THREE.RepeatWrapping;
// leatherTexture.repeat.set(2, 1); // Adjust repeat for grain

// function init() {
//     // set up scene
//     scene = new THREE.Scene();

//     // set up camera
//     const fov = 75;
//     const aspect = window.innerWidth / window.innerHeight;
//     const near = 0.1;
//     const far = 1000;
//     camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
//     camera.position.z = 8;

//     // set up renderer
//     renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true});
//     renderer.setSize(window.innerWidth, window.innerHeight);

//     document.getElementById('carousel-container').appendChild(renderer.domElement);
//     console.log('Renderer added:', renderer.domElement);


//     // Add ambient light
//     const light = new THREE.AmbientLight(0xffffff, 1);
//     scene.add(light);

//     // Directional light
//     const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
//     directionalLight.position.set(5, 5, 5);
//     scene.add(directionalLight);

//     // Create a group for the toolbelt pockets
//     beltGroup = new THREE.Group();
//     scene.add(beltGroup);
//     createToolBeltBase();

//     // Raycaster and mouse setup
//     raycaster = new THREE.Raycaster();
//     mouse = new THREE.Vector2();

//     window.addEventListener('click', onMouseClick, false);

//     // Add sample pockets
//     createPocketRing(['window', 'tree', 'plumbing']);

//     animate();
// }

// // Mouse down = start dragging
// window.addEventListener('mousedown', (event) => {
//     isDragging = true;
//     previousMouseX = event.clientX;
// });

// // Mouse up = stop dragging
// window.addEventListener('mouseup', () => {
//     isDragging = false;
// });

// // Mouse move = rotate if dragging
// window.addEventListener('mousemove', (event) => {
//     if(isDragging) {
//         const deltaX = event.clientX - previousMouseX;
//         previousMouseX = event.clientX;
//         beltGroup.rotation.y += deltaX * 0.005; // Adjust sensitivity here
//     }
// });

// function onMouseClick(event) {
//     // Normalize mouse coordinates
//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1; 

//     raycaster.setFromCamera(mouse, camera);

//     const intersects = raycaster.intersectObjects(beltGroup.children, true);

//     if (intersects.length > 0) {
//         const clickedObject = intersects[0].object;
        
//         // Traverse upward to find top-level group
//         let parent = clickedObject;
//         while (parent.parent && parent.parent != beltGroup) {
//             parent = parent.parent
//         }

//         const index = beltGroup.children.indexOf(parent);

//         const services = ['window', 'tree', 'plumbing'];
//         const clickedService = services[index];

//         if (clickedService) {
//             console.log(`Clicked on: ${clickedService}`);
//             // May have to remove later for deployment
//             window.location.href = `/public/services/${clickedService}.html`; 
//         }
//     }
// }

// function createToolBeltBase() {
//     const beltRadius = 3;
//     const beltWidth = 0.3;
//     const beltHeight = 0.1;
//     const segments = 32; // more segments = smoother belt

//     for (let i = 0; i < segments; i++) {
//         const angle = (i / segments) * Math.PI * 2;

//         // Create a flat segment (like a belt tile)
//         const geometry = new THREE.BoxGeometry(beltWidth, beltHeight, 0.05);
//         const material = new THREE.MeshStandardMaterial({
//             map: leatherTexture,
//             roughness: 0.9,
//             metalness: 0.1
//         });

//         const segment = new THREE.Mesh(geometry, material);

//         // Position segment in a circular arc
//         segment.position.x = Math.cos(angle) * beltRadius;
//         segment.position.z = Math.sin(angle) * beltRadius;
//         segment.position.y = -0.7; // Lower to sit under pockets
        
//         // Rotate each segment to face outward
//         segment.lookAt(new THREE.Vector3(0, -0.7, 0));

//         beltGroup.add(segment);
//     }
// }  

// function createPocketItem(services) {
//     const group = new THREE.Group();

//     switch (services) {
//         case 'window':
//             // frame
//             const frame = new THREE.Mesh(
//                 new THREE.BoxGeometry(1, 1, 0.1),
//                 new THREE.MeshBasicMaterial({ color: 0xccccff })
//             );
//             group.add(frame);
            
//             // crossbars
//             const hBar = new THREE.Mesh(
//                 new THREE.BoxGeometry(1, 0.05, 0.11),
//                 new THREE.MeshBasicMaterial({ color: 0x333366})
//             );
//             const vBar = new THREE.Mesh(
//                 new THREE.BoxGeometry(0.05, 1, 0.11),
//                 new THREE.MeshBasicMaterial({ color: 0x333366})
//             );
//             group.add(hBar);
//             group.add(vBar);
//             break;

//             case 'tree':
//                 const trunk = new THREE.Mesh(
//                     new THREE.CylinderGeometry(0.1, 0.1, 0.5, 16),
//                     new THREE.MeshBasicMaterial({ color: 0x8B4513})
//                 );
//                 const leaves = new THREE.Mesh(
//                     new THREE.SphereGeometry(0.4, 16, 16),
//                     new THREE.MeshBasicMaterial({ color: 0x228B22})
//                 );
//                 trunk.position.y = 0.25;
//                 leaves.position.y = 0.8;
//                 group.add(trunk);
//                 group.add(leaves);
//                 break;

//                 case 'plumbing':
//                     // Vertical pipe
//                     const basePipe = new THREE.Mesh(
//                         new THREE.CylinderGeometry(0.1, 0.1, 0.6, 16),
//                         new THREE.MeshBasicMaterial({ color: 0x888888})
//                     );
//                     basePipe.position.y = 0.3;

//                     // Curved faucet spout
//                     const spout = new THREE.Mesh(
//                         new THREE.TorusGeometry(0.2, 0.05, 8, 16, Math.PI),
//                         new THREE.MeshBasicMaterial({ color: 0x888888})
//                     );
//                     spout.rotation.x = Math.PI / 2;
//                     spout.position.y = 0.6;
//                     spout.position.z = -0.2;

//                     // Handle on top
//                     const handle = new THREE.Mesh(
//                         new THREE.BoxGeometry(0.15, 0.05, 0.15),
//                         new THREE.MeshBasicMaterial({ color: 0x555555 })
//                     );
//                     handle.position.y = 0.65;

//                     group.add(basePipe);
//                     group.add(spout);
//                     group.add(handle);
//                     group.scale.set(2, 2, 2);
//                     break;
//     }

//     return group;
// }

// // Creates simple placeholder pockets arranged in a circle
// function createPocketRing(services) {
//     const radius = 3;

//     for (let i = 0; i < services.length; i++) {
//         const angle = (i / services.length) * Math.PI * 2;
//         const pocketGeometry = new THREE.BoxGeometry(1.2, 1, 0.5);
//         const pocketMaterial = new THREE.MeshStandardMaterial({ map: leatherTexture });
//         const pocket = new THREE.Mesh(pocketGeometry, pocketMaterial);
//         const pocketServices = createPocketItem(services[i]);

//         // Same position as item
//         pocket.position.copy(pocketServices.position);
//         pocket.position.y = -0.6; // Slightly below each item

//         // Position in circular ring
//         pocketServices.position.x = Math.cos(angle) * radius;
//         pocketServices.position.z = Math.sin(angle) * radius;
//         pocketServices.lookAt(new THREE.Vector3(0, 0, 0));

//         beltGroup.add(pocket);
//         beltGroup.add(pocketServices);
//     }
// }

// // Animate the scene
// function animate() {
//     requestAnimationFrame(animate);
   
//     renderer.render(scene, camera);
// }

// init();