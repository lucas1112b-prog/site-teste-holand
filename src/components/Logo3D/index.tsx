'use client';

import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { SVGLoader } from 'three-stdlib';
import * as THREE from 'three';
import { Environment, Center } from '@react-three/drei';
import Image from 'next/image';
import { useInViewport } from '@/hooks/useInViewport';

// Preload assets outside the component for better performance
if (typeof window !== 'undefined') {
  useLoader.preload(SVGLoader, '/logo.svg');
}

function Scene({ scale, active }: { scale: number; active: boolean }) {
  const svgData = useLoader(SVGLoader, '/logo.svg');
  const groupRef = useRef<THREE.Group>(null);

  const shapes = useMemo(() => {
    return svgData.paths.flatMap((path) => {
      const pathShapes = path.toShapes(true);
      return pathShapes.map((shape) => ({ shape }));
    });
  }, [svgData]);

  const extrudeSettings = useMemo(() => ({
    steps: 1,
    depth: 38,
    bevelEnabled: true,
    bevelThickness: 1.2,
    bevelSize: 1.0,
    bevelOffset: 0,
    bevelSegments: 4,
  }), []);

  useFrame((state) => {
    if (!groupRef.current || !active) return;

    const time = state.clock.getElapsedTime();

    // Auto rotation + Mouse influence
    const autoRotationY = time * 0.2;
    const mouseX = state.pointer.x * 0.5;
    const mouseY = -state.pointer.y * 0.5;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX + autoRotationY, 0.1);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouseY, 0.1);
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={1} />

      <Environment preset="city" />

      <group ref={groupRef}>
        <Center>
          <group rotation={[Math.PI, 0, 0]} scale={scale}>
            {shapes.map((item, index) => (
              <mesh key={index} castShadow receiveShadow>
                <extrudeGeometry args={[item.shape, extrudeSettings]} />
                <meshPhysicalMaterial
                  color="#EF2F0F"
                  metalness={0.9}
                  roughness={0.1}
                  envMapIntensity={1.5}
                  clearcoat={1}
                  clearcoatRoughness={0.1}
                />
              </mesh>
            ))}
          </group>
        </Center>
      </group>
    </>
  );
}

interface Logo3DProps {
  size?: string;
  scale?: number;
  cameraZ?: number;
  marginTop?: string;
}

export default function Logo3D({
  size = '100%',
  scale = 0.45,
  cameraZ = 450,
  marginTop = '0',
}: Logo3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInViewport = useInViewport(containerRef, { rootMargin: '200px' });
  const [isReady, setIsReady] = React.useState(false);
  const [shouldMountCanvas, setShouldMountCanvas] = React.useState(false);

  // Delay the mounting of the Canvas until 2.5 seconds after initial render
  // This ensures the main thread is completely free for LCP and initial GSAP animations
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShouldMountCanvas(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: size,
        height: size,
        minHeight: '400px',
        marginTop: marginTop,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}
    >
      {/* Static Image Placeholder while loading or before delayed mount */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isReady ? 0 : 1,
        pointerEvents: 'none',
        transition: 'opacity 0.8s ease'
      }}>
        <Image
          src="/images/logo-morgan-icon.png"
          alt="Morgan Logo Static"
          width={120}
          height={120}
          priority
          style={{ filter: 'brightness(1.1)' }}
        />
      </div>

      {shouldMountCanvas && (
        <Canvas
          camera={{ position: [0, 0, cameraZ], fov: 45 }}
          shadows
          gl={{ antialias: true, powerPreference: "high-performance" }}
          onCreated={() => setIsReady(true)}
        >
          <React.Suspense fallback={null}>
            <Scene scale={scale} active={isInViewport} />
          </React.Suspense>
        </Canvas>
      )}
    </div>
  );
}
