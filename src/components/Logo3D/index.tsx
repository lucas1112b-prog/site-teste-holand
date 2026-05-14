'use client';

import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { SVGLoader } from 'three-stdlib';
import * as THREE from 'three';
import { Environment, Center } from '@react-three/drei';

// Preload assets outside the component for better performance
if (typeof window !== 'undefined') {
  useLoader.preload(SVGLoader, '/logo.svg');
}

function Scene({ scale }: { scale: number }) {
  const svgData = useLoader(SVGLoader, '/logo.svg');
  const groupRef = useRef<THREE.Group>(null);

  const shapes = useMemo(() => {
    return svgData.paths.flatMap((path) => {
      const pathShapes = path.toShapes(true);
      return pathShapes.map((shape) => ({ shape }));
    });
  }, [svgData]);

  const extrudeSettings = {
    steps: 2,
    depth: 38,
    bevelEnabled: true,
    bevelThickness: 1.2,
    bevelSize: 1.0,
    bevelOffset: 0,
    bevelSegments: 8,
  };

  useFrame((state) => {
    if (!groupRef.current) return;

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
  return (
    <div
      style={{
        width: size,
        height: size,
        minHeight: '400px',
        marginTop: marginTop,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Canvas camera={{ position: [0, 0, cameraZ], fov: 45 }} shadows gl={{ antialias: true }}>
        <React.Suspense fallback={null}>
          <Scene scale={scale} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
