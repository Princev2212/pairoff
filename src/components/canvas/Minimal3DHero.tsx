import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const Minimal3DHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = () => {
      // Re-evaluates in render loop
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    // Scene setup
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let mainGroup: THREE.Group;
    let innerMesh: THREE.Mesh;
    let outerWireframe: THREE.LineSegments;
    let ringGroup: THREE.Group;
    let animationFrameId: number;
    let isVisible = true;

    try {
      scene = new THREE.Scene();

      // Camera
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || 500;
      camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
      camera.position.z = 7.5;

      // Renderer
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;

      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      renderer.domElement.style.pointerEvents = 'none';

      container.innerHTML = '';
      container.appendChild(renderer.domElement);

      // Main Group
      mainGroup = new THREE.Group();
      scene.add(mainGroup);

      // 1. Inner Architectural Geometric Core
      const innerGeometry = new THREE.OctahedronGeometry(1.65, 0);
      const innerMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#101014'),
        metalness: 0.88,
        roughness: 0.28,
        flatShading: true,
      });
      innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
      mainGroup.add(innerMesh);

      // 2. Outer Slender Wireframe Cage
      const outerGeometry = new THREE.IcosahedronGeometry(2.35, 0);
      const wireframeGeometry = new THREE.WireframeGeometry(outerGeometry);
      const wireframeMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color('#C8B89A'),
        transparent: true,
        opacity: 0.38,
      });
      outerWireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
      mainGroup.add(outerWireframe);

      // 3. Subtle Concentric Orbital Ring
      ringGroup = new THREE.Group();
      const ringGeo = new THREE.TorusGeometry(2.85, 0.008, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color('#D8CCB5'),
        transparent: true,
        opacity: 0.22,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2.6;
      ringGroup.add(ring);
      mainGroup.add(ringGroup);

      // 4. Lighting System
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight('#F5EAD4', 2.4);
      keyLight.position.set(5, 6, 6);
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight('#606578', 1.2);
      fillLight.position.set(-6, -4, 4);
      scene.add(fillLight);

      const rimLight = new THREE.PointLight('#C8B89A', 1.8, 15);
      rimLight.position.set(0, -5, -4);
      scene.add(rimLight);

    } catch (err) {
      console.warn('WebGL initialization failed, using fallback:', err);
      setWebglSupported(false);
      return;
    }

    // Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      targetX = (e.clientX - windowHalfX) * 0.00035;
      targetY = (e.clientY - windowHalfY) * 0.00035;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const delta = clock.getDelta();

      if (!mediaQuery.matches) {
        mainGroup.rotation.y += 0.12 * delta;
        mainGroup.rotation.x += 0.04 * delta;
        innerMesh.rotation.y -= 0.08 * delta;
        outerWireframe.rotation.z += 0.05 * delta;
        ringGroup.rotation.z -= 0.03 * delta;

        mouseX += (targetX - mouseX) * 0.04;
        mouseY += (targetY - mouseY) * 0.04;

        mainGroup.rotation.y += mouseX * 0.4;
        mainGroup.rotation.x += mouseY * 0.4;
      } else {
        mainGroup.rotation.set(0.3, 0.45, 0.1);
        innerMesh.rotation.set(0.2, 0.1, 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);

      if (renderer) {
        renderer.dispose();
        if (container && renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[540px] flex items-center justify-center pointer-events-none select-none">
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      />

      {!webglSupported && (
        <div className="relative z-10 flex items-center justify-center p-8">
          <div className="w-48 h-48 sm:w-64 sm:h-64 border border-champagne-500/20 rotate-45 flex items-center justify-center backdrop-blur-sm bg-studio-900/40">
            <div className="w-32 h-32 border border-champagne-500/40 -rotate-45 flex items-center justify-center">
              <div className="w-16 h-16 bg-studio-850/80 border border-studio-700 rotate-12 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-champagne-500/80" />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-40" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-studio-950 to-transparent pointer-events-none" />
    </div>
  );
};
