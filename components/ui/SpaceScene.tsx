'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';

interface SceneProps {
  /** Versión ligera para móvil: menos partículas, DPR más bajo. Sigue animada. */
  lite?: boolean;
}

/**
 * Constellation Network — red neuronal / constelación de partículas con líneas.
 * Inmersión: rotación base + parallax de grupo Y de cámara (reactivo al mouse) +
 * deriva/dolly lento de cámara para sensación de profundidad. Todo en refs
 * (cero re-renders de React, cero allocations por frame).
 */
function ConstellationNetwork({ lite }: SceneProps) {
  const particlesRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);

  const pointerRef = useRef({ x: 0, y: 0 });
  const parallaxRef = useRef({ x: 0, y: 0 });
  const camRef = useRef({ x: 0, y: 0 });
  const baseRotationRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  const COUNT = lite ? 90 : 200;
  const MAX_DISTANCE = 5;

  // Posiciones, tamaños, colores y velocidades de las partículas
  const particlesData = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const colors = new Float32Array(COUNT * 3);
    const velocities: THREE.Vector3[] = [];

    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * 34;
      const y = (Math.random() - 0.5) * 34;
      const z = (Math.random() - 0.5) * 18;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      sizes[i] = Math.random() * 2.5 + 0.5;

      // Nodos de acento de marca: ~10% cyan, ~6% violeta; resto blanco/gris
      const r = Math.random();
      if (r > 0.9) {
        colors[i * 3] = 0.024; colors[i * 3 + 1] = 0.714; colors[i * 3 + 2] = 0.831; // cyan
      } else if (r > 0.84) {
        colors[i * 3] = 0.545; colors[i * 3 + 1] = 0.361; colors[i * 3 + 2] = 0.965; // violet
      } else {
        const gray = 0.7 + Math.random() * 0.3;
        colors[i * 3] = gray; colors[i * 3 + 1] = gray; colors[i * 3 + 2] = gray;
      }

      velocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.025,
          (Math.random() - 0.5) * 0.025,
          (Math.random() - 0.5) * 0.025
        )
      );
    }
    return { positions, sizes, colors, velocities };
  }, [COUNT]);

  // Líneas entre partículas cercanas (constelación)
  const linesData = useMemo(() => {
    const linePositions: number[] = [];
    const lineColors: number[] = [];
    const { positions, colors } = particlesData;

    for (let i = 0; i < COUNT; i++) {
      const x1 = positions[i * 3], y1 = positions[i * 3 + 1], z1 = positions[i * 3 + 2];
      for (let j = i + 1; j < COUNT; j++) {
        const x2 = positions[j * 3], y2 = positions[j * 3 + 1], z2 = positions[j * 3 + 2];
        const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
        if (distance < MAX_DISTANCE) {
          linePositions.push(x1, y1, z1, x2, y2, z2);
          const opacity = 1 - distance / MAX_DISTANCE;
          const cyan = colors[i * 3 + 1] > 0.6 || colors[j * 3 + 1] > 0.6;
          const c: [number, number, number] = cyan
            ? [0.024, 0.714, 0.831]
            : [0.5, 0.5, 0.5];
          lineColors.push(c[0] * opacity, c[1] * opacity, c[2] * opacity);
          lineColors.push(c[0] * opacity, c[1] * opacity, c[2] * opacity);
        }
      }
    }
    return {
      linePositions: new Float32Array(linePositions),
      lineColors: new Float32Array(lineColors),
    };
  }, [particlesData, COUNT]);

  useFrame((state, delta) => {
    const elapsed = state.clock.elapsedTime;

    if (groupRef.current) {
      // Rotación base lenta + parallax de mouse (suavizado, framerate-independent)
      const base = baseRotationRef.current;
      base.y += delta * 0.05;
      base.x += delta * 0.02;

      const parallax = parallaxRef.current;
      const targetX = pointerRef.current.y * 0.12;
      const targetY = pointerRef.current.x * 0.2;
      const t = 1 - Math.exp(-delta * 3);
      parallax.x += (targetX - parallax.x) * t;
      parallax.y += (targetY - parallax.y) * t;

      groupRef.current.rotation.x = base.x + parallax.x;
      groupRef.current.rotation.y = base.y + parallax.y;
    }

    // Parallax + deriva/dolly de cámara → profundidad inmersiva ("estás en el espacio")
    const cam = camRef.current;
    const camTargetX = pointerRef.current.x * 1.4;
    const camTargetY = -pointerRef.current.y * 0.9;
    const ct = 1 - Math.exp(-delta * 2.5);
    cam.x += (camTargetX - cam.x) * ct;
    cam.y += (camTargetY - cam.y) * ct;
    // deriva orbital lenta + respiración de profundidad en z
    state.camera.position.x = cam.x + Math.sin(elapsed * 0.06) * 0.8;
    state.camera.position.y = cam.y + Math.cos(elapsed * 0.05) * 0.5;
    state.camera.position.z = 10 + Math.sin(elapsed * 0.12) * 1.2;
    state.camera.lookAt(0, 0, 0);

    // Flotación orgánica de partículas
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const { velocities } = particlesData;
      for (let i = 0; i < COUNT; i++) {
        const v = velocities[i];
        positions[i * 3] += v.x * delta;
        positions[i * 3 + 1] += v.y * delta;
        positions[i * 3 + 2] += v.z * delta;
        if (Math.abs(positions[i * 3]) > 17) v.x *= -1;
        if (Math.abs(positions[i * 3 + 1]) > 17) v.y *= -1;
        if (Math.abs(positions[i * 3 + 2]) > 9) v.z *= -1;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={COUNT} array={particlesData.positions} itemSize={3} args={[particlesData.positions, 3]} />
          <bufferAttribute attach="attributes-size" count={COUNT} array={particlesData.sizes} itemSize={1} args={[particlesData.sizes, 1]} />
          <bufferAttribute attach="attributes-color" count={COUNT} array={particlesData.colors} itemSize={3} args={[particlesData.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.16} sizeAttenuation transparent opacity={0.85} vertexColors blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={linesData.linePositions.length / 3} array={linesData.linePositions} itemSize={3} args={[linesData.linePositions, 3]} />
          <bufferAttribute attach="attributes-color" count={linesData.lineColors.length / 3} array={linesData.lineColors} itemSize={3} args={[linesData.lineColors, 3]} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.32} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </group>
  );
}

/**
 * SpaceScene — el Canvas 3D real (dos capas de estrellas + constelación reactiva).
 * NO importar directamente: usar SpaceBackground, que lo carga lazy y decide
 * lite/full/estático.
 */
export default function SpaceScene({ lite = false }: SceneProps) {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={lite ? [1, 1.5] : [1, 2]}
        gl={{ antialias: !lite, powerPreference: 'high-performance' }}
      >
        {/* Dos capas de estrellas → parallax de profundidad (cercana rápida + lejana lenta) */}
        <Stars radius={80} depth={40} count={lite ? 1200 : 2600} factor={4} saturation={0} fade speed={1.1} />
        {!lite && <Stars radius={140} depth={70} count={1400} factor={5} saturation={0} fade speed={0.4} />}

        <ConstellationNetwork lite={lite} />
        <ambientLight intensity={0.1} />
      </Canvas>
    </div>
  );
}
