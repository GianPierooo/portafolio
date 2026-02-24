'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

/**
 * Constellation Network Component
 * Creates the neural network / constellation effect with particles and connecting lines
 */
function ConstellationNetwork() {
  const particlesRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Generate particle positions and data
  const particlesData = useMemo(() => {
    const count = 150; // Number of particles
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const velocities: THREE.Vector3[] = [];

    for (let i = 0; i < count; i++) {
      // Distribute particles in a volume
      const x = (Math.random() - 0.5) * 30;
      const y = (Math.random() - 0.5) * 30;
      const z = (Math.random() - 0.5) * 15;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Random size variation
      sizes[i] = Math.random() * 2.5 + 0.5;

      // Color variation - mostly white with some cyan accents
      const isCyanNode = Math.random() > 0.9; // 10% cyan nodes
      if (isCyanNode) {
        colors[i * 3] = 0.024; // R
        colors[i * 3 + 1] = 0.714; // G (cyan)
        colors[i * 3 + 2] = 0.831; // B
      } else {
        const gray = 0.7 + Math.random() * 0.3;
        colors[i * 3] = gray;
        colors[i * 3 + 1] = gray;
        colors[i * 3 + 2] = gray;
      }

      // Subtle random velocities for organic movement
      velocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        )
      );
    }

    return { positions, sizes, colors, velocities, count };
  }, []);

  // Generate connecting lines between nearby particles
  const linesData = useMemo(() => {
    const linePositions: number[] = [];
    const lineColors: number[] = [];
    const maxDistance = 5; // Maximum distance to connect particles

    const { positions, colors, count } = particlesData;

    for (let i = 0; i < count; i++) {
      const x1 = positions[i * 3];
      const y1 = positions[i * 3 + 1];
      const z1 = positions[i * 3 + 2];

      for (let j = i + 1; j < count; j++) {
        const x2 = positions[j * 3];
        const y2 = positions[j * 3 + 1];
        const z2 = positions[j * 3 + 2];

        const distance = Math.sqrt(
          Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2)
        );

        if (distance < maxDistance) {
          // Add line segment
          linePositions.push(x1, y1, z1, x2, y2, z2);

          // Line opacity based on distance (closer = more visible)
          const opacity = 1 - distance / maxDistance;

          // Use cyan color if either particle is cyan
          const isCyan1 = colors[i * 3 + 1] > 0.6;
          const isCyan2 = colors[j * 3 + 1] > 0.6;
          const useCyan = isCyan1 || isCyan2;

          if (useCyan) {
            lineColors.push(0.024 * opacity, 0.714 * opacity, 0.831 * opacity);
            lineColors.push(0.024 * opacity, 0.714 * opacity, 0.831 * opacity);
          } else {
            lineColors.push(0.5 * opacity, 0.5 * opacity, 0.5 * opacity);
            lineColors.push(0.5 * opacity, 0.5 * opacity, 0.5 * opacity);
          }
        }
      }
    }

    return { linePositions, lineColors };
  }, [particlesData]);

  // Animation loop
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Slow rotation of the entire constellation
      groupRef.current.rotation.y += delta * 0.05;
      groupRef.current.rotation.x += delta * 0.02;
    }

    // Subtle particle float animation
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particlesData.count; i++) {
        const velocity = particlesData.velocities[i];
        positions[i * 3] += velocity.x * delta;
        positions[i * 3 + 1] += velocity.y * delta;
        positions[i * 3 + 2] += velocity.z * delta;

        // Bounce back if too far
        if (Math.abs(positions[i * 3]) > 15) velocity.x *= -1;
        if (Math.abs(positions[i * 3 + 1]) > 15) velocity.y *= -1;
        if (Math.abs(positions[i * 3 + 2]) > 8) velocity.z *= -1;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesData.count}
            array={particlesData.positions}
            itemSize={3}
            args={[particlesData.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-size"
            count={particlesData.count}
            array={particlesData.sizes}
            itemSize={1}
            args={[particlesData.sizes, 1]}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particlesData.count}
            array={particlesData.colors}
            itemSize={3}
            args={[particlesData.colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          sizeAttenuation
          transparent
          opacity={0.8}
          vertexColors
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Connecting Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linesData.linePositions.length / 3}
            array={new Float32Array(linesData.linePositions)}
            itemSize={3}
            args={[new Float32Array(linesData.linePositions), 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            count={linesData.lineColors.length / 3}
            array={new Float32Array(linesData.lineColors)}
            itemSize={3}
            args={[new Float32Array(linesData.lineColors), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

/**
 * SpaceBackground Component
 * Full-screen 3D canvas with space theme: stars + constellation network
 */
export default function SpaceBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 2]} // Adaptive pixel ratio for performance
      >
        {/* Ambient starfield for depth */}
        <Stars
          radius={100}
          depth={50}
          count={3000}
          factor={4}
          saturation={0}
          fade
          speed={0.5}
        />

        {/* Main constellation network effect */}
        <ConstellationNetwork />

        {/* Subtle ambient light */}
        <ambientLight intensity={0.1} />
      </Canvas>
    </div>
  );
}
