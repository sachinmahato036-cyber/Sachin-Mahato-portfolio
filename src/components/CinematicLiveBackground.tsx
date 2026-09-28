/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * CinematicLiveBackground
 * 
 * A premium, live interactive 3D WebGL background engineered for a modern
 * executive/MBA portfolio in technology, AI, and digital innovation.
 * 
 * Features:
 * - Deep charcoal / obsidian base (#030508)
 * - Restrained navy & cool blue atmospheric lighting
 * - Abstract global data connectivity network (nodes, lines, traveling pulses)
 * - Situated predominantly towards the right/edges, keeping center & left-center calm and dark
 * - Subtle bottom perspective grid with exponential fog
 * - Multi-depth floating micro-particles with natural drift
 * - Smooth, damped mouse parallax interaction
 * - 100% background-only: no text, no UI, no distracting elements
 */
export default function CinematicLiveBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Detect WebGL support
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      // Graceful fallback if WebGL is unavailable
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // SCENE SETUP
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030508, 0.0009);

    // CAMERA SETUP
    const camera = new THREE.PerspectiveCamera(50, width / height, 1, 1400);
    camera.position.set(0, 0, 480);

    // MOUSE PARALLAX TRACKING (Target vs Current with smooth damping)
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      // Normalized between -1 and 1
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    // 1. GENERATE SOFT PARTICLE SPRITE TEXTURE DYNAMICALLY
    const createParticleTexture = () => {
      const pCanvas = document.createElement("canvas");
      pCanvas.width = 64;
      pCanvas.height = 64;
      const ctx = pCanvas.getContext("2d");
      if (!ctx) return null;

      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.2, "rgba(147, 197, 253, 0.95)");
      gradient.addColorStop(0.5, "rgba(56, 189, 248, 0.5)");
      gradient.addColorStop(1, "rgba(3, 5, 8, 0)");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(32, 32, 32, 0, Math.PI * 2);
      ctx.fill();

      const texture = new THREE.CanvasTexture(pCanvas);
      texture.needsUpdate = true;
      return texture;
    };

    const particleTexture = createParticleTexture();

    // 2. ATMOSPHERIC AMBIENT & ACCENT LIGHTING
    const ambientLight = new THREE.AmbientLight(0x14284b, 2.2);
    scene.add(ambientLight);

    const keyAtmosphericLight = new THREE.PointLight(0x2563eb, 3.8, 1100);
    keyAtmosphericLight.position.set(320, 160, -100);
    scene.add(keyAtmosphericLight);

    const rimCyanLight = new THREE.PointLight(0x0ea5e9, 2.2, 900);
    rimCyanLight.position.set(-280, -180, -150);
    scene.add(rimCyanLight);

    // 3. GLOBAL CONNECTIVITY NETWORK (Placed toward right & periphery)
    // Center of connectivity network shifted rightward so left/center remains clean
    const networkGroup = new THREE.Group();
    networkGroup.position.set(160, 20, -120);
    scene.add(networkGroup);

    // Generate Network Nodes
    const nodeCount = 48;
    const nodePositions: THREE.Vector3[] = [];
    const nodeSpheres: {
      mesh: THREE.Mesh;
      baseScale: number;
      pulseSpeed: number;
      pulseOffset: number;
    }[] = [];

    const nodeGeometry = new THREE.SphereGeometry(2.0, 16, 16);
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.9,
    });

    // Distribute nodes in an organic volumetric constellation
    for (let i = 0; i < nodeCount; i++) {
      // Golden spiral distribution on an ellipsoid
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const radiusX = 175 + Math.random() * 55;
      const radiusY = 125 + Math.random() * 45;
      const radiusZ = 145 + Math.random() * 65;

      const pos = new THREE.Vector3(
        radiusX * Math.sin(phi) * Math.cos(theta),
        radiusY * Math.cos(phi),
        radiusZ * Math.sin(phi) * Math.sin(theta)
      );

      nodePositions.push(pos);

      const sphere = new THREE.Mesh(nodeGeometry, nodeMaterial.clone());
      sphere.position.copy(pos);
      networkGroup.add(sphere);

      nodeSpheres.push({
        mesh: sphere,
        baseScale: 1 + Math.random() * 0.8,
        pulseSpeed: 0.6 + Math.random() * 1.2,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    // Connect Neighboring Nodes with Hairline Geometric Lines
    const lineIndices: number[] = [];
    const maxConnectionDistance = 125;

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < maxConnectionDistance) {
          lineIndices.push(i, j);
        }
      }
    }

    const linePoints: number[] = [];
    for (let i = 0; i < lineIndices.length; i += 2) {
      const p1 = nodePositions[lineIndices[i]];
      const p2 = nodePositions[lineIndices[i + 1]];
      linePoints.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePoints, 3)
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x2563eb,
      transparent: true,
      opacity: 0.42,
      blending: THREE.AdditiveBlending,
    });

    const networkLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    networkGroup.add(networkLines);

    // 4. FLOWING NETWORK DATA PACKETS (Pulses traveling along connections)
    const packetCount = 18;
    const packetGeometry = new THREE.SphereGeometry(1.6, 12, 12);
    const packetMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 1.0,
      blending: THREE.AdditiveBlending,
    });

    const packets: {
      mesh: THREE.Mesh;
      fromIdx: number;
      toIdx: number;
      progress: number;
      speed: number;
    }[] = [];

    // Valid node pairs from connected lines
    const connectedPairs: [number, number][] = [];
    for (let k = 0; k < lineIndices.length; k += 2) {
      connectedPairs.push([lineIndices[k], lineIndices[k + 1]]);
    }

    if (connectedPairs.length > 0) {
      for (let p = 0; p < packetCount; p++) {
        const randomPair = connectedPairs[Math.floor(Math.random() * connectedPairs.length)];
        const packetMesh = new THREE.Mesh(packetGeometry, packetMaterial);
        networkGroup.add(packetMesh);

        packets.push({
          mesh: packetMesh,
          fromIdx: randomPair[0],
          toIdx: randomPair[1],
          progress: Math.random(),
          speed: 0.12 + Math.random() * 0.18,
        });
      }
    }

    // 5. LONG FLOWING DATA HIGHWAY SPLINES (Global strategic connectivity curves)
    const splineCurves: THREE.CatmullRomCurve3[] = [];
    const splinePulses: {
      mesh: THREE.Mesh;
      curveIdx: number;
      progress: number;
      speed: number;
    }[] = [];

    const curveControlPoints = [
      // Curve 1: Deep arc from bottom-right up around periphery
      [
        new THREE.Vector3(260, -220, -180),
        new THREE.Vector3(320, -60, -120),
        new THREE.Vector3(280, 110, -80),
        new THREE.Vector3(120, 200, -160),
        new THREE.Vector3(-140, 240, -240),
      ],
      // Curve 2: Sweeping lower baseline arc
      [
        new THREE.Vector3(-340, -180, -260),
        new THREE.Vector3(-100, -190, -160),
        new THREE.Vector3(150, -170, -140),
        new THREE.Vector3(340, -120, -200),
      ],
    ];

    curveControlPoints.forEach((pts, cIdx) => {
      const curve = new THREE.CatmullRomCurve3(pts);
      splineCurves.push(curve);

      // Draw faint baseline curve
      const curvePoints = curve.getPoints(80);
      const curveGeom = new THREE.BufferGeometry().setFromPoints(curvePoints);
      const curveMat = new THREE.LineBasicMaterial({
        color: 0x3b82f6,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
      });
      const curveLine = new THREE.Line(curveGeom, curveMat);
      scene.add(curveLine);

      // Add 2 light pulses per curve
      for (let q = 0; q < 2; q++) {
        const pulseMesh = new THREE.Mesh(
          new THREE.SphereGeometry(2.2, 12, 12),
          new THREE.MeshBasicMaterial({
            color: 0x60a5fa,
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending,
          })
        );
        scene.add(pulseMesh);

        splinePulses.push({
          mesh: pulseMesh,
          curveIdx: cIdx,
          progress: q * 0.5 + Math.random() * 0.3,
          speed: 0.05 + Math.random() * 0.06,
        });
      }
    });

    // 6. DISTANT PERSPECTIVE ARCHITECTURAL GRID (Lower area)
    const gridHelper = new THREE.GridHelper(1000, 40, 0x3b82f6, 0x1d4ed8);
    gridHelper.position.set(0, -170, -140);
    if (Array.isArray(gridHelper.material)) {
      gridHelper.material.forEach((m) => {
        m.transparent = true;
        m.opacity = 0.32;
        m.blending = THREE.AdditiveBlending;
      });
    } else {
      gridHelper.material.transparent = true;
      gridHelper.material.opacity = 0.32;
      gridHelper.material.blending = THREE.AdditiveBlending;
    }
    scene.add(gridHelper);

    // 7. MULTI-DEPTH AMBIENT DUST / DATA PARTICLES
    const particleCount = 240;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 850;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 550;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 550;

      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.08,
        y: 0.04 + Math.random() * 0.1,
        z: (Math.random() - 0.5) * 0.08,
      });
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 5.5,
      map: particleTexture || undefined,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // 8. RESIZE LISTENER
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 9. ANIMATION LOOP
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse parallax interpolation (damping factor 0.025)
      mouseX += (targetMouseX - mouseX) * 0.025;
      mouseY += (targetMouseY - mouseY) * 0.025;

      // Subtly shift camera position for gentle volumetric depth
      camera.position.x = mouseX * 35;
      camera.position.y = mouseY * 22;
      camera.lookAt(0, 0, 0);

      // Slow majestic rotation of distant network group
      networkGroup.rotation.y = elapsedTime * 0.035;
      networkGroup.rotation.x = Math.sin(elapsedTime * 0.02) * 0.06;

      // Pulsing nodes breathing animation
      nodeSpheres.forEach((node) => {
        const scale =
          node.baseScale *
          (1 + 0.22 * Math.sin(elapsedTime * node.pulseSpeed + node.pulseOffset));
        node.mesh.scale.set(scale, scale, scale);
      });

      // Flowing data packets along node connections
      packets.forEach((packet) => {
        packet.progress += delta * packet.speed;
        if (packet.progress >= 1) {
          packet.progress = 0;
          // Pick a new connected pair periodically
          const randomPair =
            connectedPairs[Math.floor(Math.random() * connectedPairs.length)];
          packet.fromIdx = randomPair[0];
          packet.toIdx = randomPair[1];
        }

        const p1 = nodePositions[packet.fromIdx];
        const p2 = nodePositions[packet.toIdx];
        packet.mesh.position.lerpVectors(p1, p2, packet.progress);
      });

      // Flowing pulses along highway splines
      splinePulses.forEach((pulse) => {
        pulse.progress += delta * pulse.speed;
        if (pulse.progress >= 1) {
          pulse.progress = 0;
        }
        const curve = splineCurves[pulse.curveIdx];
        const pt = curve.getPoint(pulse.progress);
        pulse.mesh.position.copy(pt);
      });

      // Ambient drifting particles
      const positions = particlesGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += particleVelocities[i].y;
        positions[i * 3] += particleVelocities[i].x;
        positions[i * 3 + 2] += particleVelocities[i].z;

        // Wrap around gently in 3D box
        if (positions[i * 3 + 1] > 280) positions[i * 3 + 1] = -280;
        if (positions[i * 3] > 440) positions[i * 3] = -440;
        if (positions[i * 3] < -440) positions[i * 3] = 440;
        if (positions[i * 3 + 2] > 280) positions[i * 3 + 2] = -280;
        if (positions[i * 3 + 2] < -280) positions[i * 3 + 2] = 280;
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      // Gentle atmospheric light breathing
      keyAtmosphericLight.intensity = 2.4 + Math.sin(elapsedTime * 0.4) * 0.4;
      rimCyanLight.intensity = 1.0 + Math.cos(elapsedTime * 0.5) * 0.25;

      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP ON UNMOUNT
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);

      // Clean up geometries and materials
      nodeGeometry.dispose();
      lineGeometry.dispose();
      packetGeometry.dispose();
      particlesGeometry.dispose();
      gridHelper.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#030508]"
      aria-hidden="true"
    >
      {/* 1. Underlying Volumetric Atmosphere Layers */}
      <div className="absolute inset-0 bg-[#030508]" />

      {/* 2. Soft Ambient Deep Blue / Navy Atmospheric Glow (Periphery & Horizon) */}
      <div className="absolute top-0 right-0 w-[65vw] h-[65vh] bg-[radial-gradient(ellipse_at_70%_20%,rgba(24,78,145,0.36),rgba(14,46,90,0.18)_50%,transparent_75%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[55vw] h-[55vh] bg-[radial-gradient(ellipse_at_20%_80%,rgba(18,52,105,0.30),transparent_70%)] pointer-events-none" />

      {/* 3. Three.js Live WebGL Canvas Stage */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block pointer-events-none"
      />

      {/* 
        4. CRITICAL COMPOSITION VIGNETTE:
        Balanced so the live background is clearly visible while text contrast remains crisp
      */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 60% at 38% 46%, rgba(3, 5, 8, 0.74) 0%, rgba(3, 5, 8, 0.48) 50%, rgba(3, 5, 8, 0.04) 85%, rgba(3, 5, 8, 0.35) 100%)",
        }}
      />

      {/* 5. Minimal High-End Vignette & Architectural Hairline Framing */}
      <div className="absolute inset-0 max-w-7xl mx-auto border-x border-white/[0.04] pointer-events-none" />
      <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(3,5,8,0.5)] pointer-events-none" />
    </div>
  );
}
