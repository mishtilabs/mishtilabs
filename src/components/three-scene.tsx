"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Points, PointMaterial, Sparkles } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";

// Mulberry32 — tiny deterministic PRNG. Used in place of Math.random()
// inside useMemo blocks so React Compiler's purity rule is satisfied
// (same seed → same output every render). The visual output is identical
// to a one-shot Math.random() seed, just reproducible.
function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function CoreSphere({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.18;
    ref.current.rotation.x += dt * 0.08;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.2, 1]} />
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.85}
        emissive={color}
        emissiveIntensity={0.7}
        roughness={0.3}
        metalness={0.6}
      />
    </mesh>
  );
}

function GlassShell({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y -= dt * 0.12;
    ref.current.rotation.z += dt * 0.05;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.75, 1]} />
      <meshPhysicalMaterial
        color={color}
        metalness={0.2}
        roughness={0.05}
        transmission={0.85}
        thickness={0.6}
        ior={1.3}
        clearcoat={1}
        clearcoatRoughness={0.1}
        opacity={0.6}
        transparent
        wireframe
      />
    </mesh>
  );
}

function OrbitingNodes({ color }: { color: string }) {
  const group = useRef<THREE.Group>(null);
  const nodes = useMemo(() => {
    const rand = mulberry32(0xC0FFEE);
    const arr: { r: number; speed: number; phase: number; tilt: number; size: number }[] = [];
    for (let i = 0; i < 6; i++) {
      arr.push({
        r: 2.1 + rand() * 1.6,
        speed: 0.18 + rand() * 0.5,
        phase: rand() * Math.PI * 2,
        tilt: rand() * Math.PI,
        size: 0.06 + rand() * 0.08,
      });
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.children.forEach((child, i) => {
      const n = nodes[i];
      const a = t * n.speed + n.phase;
      child.position.set(
        Math.cos(a) * n.r,
        Math.sin(a * 0.8 + n.tilt) * n.r * 0.4,
        Math.sin(a) * n.r,
      );
    });
  });

  return (
    <group ref={group}>
      {nodes.map((n, i) => (
        <mesh key={i}>
          <sphereGeometry args={[n.size * 0.75, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.85}
            transparent
            opacity={0.75}
          />
        </mesh>
      ))}
    </group>
  );
}

function StarField({ color }: { color: string }) {
  const positions = useMemo(() => {
    const rand = mulberry32(0xBADA55);
    const COUNT = 800;
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = 6 + rand() * 8;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.02;
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color={color}
        size={0.025}
        sizeAttenuation
        depthWrite={false}
        opacity={0.85}
      />
    </Points>
  );
}

export function ThreeScene({ paused = false }: { paused?: boolean }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  const accent = isDark ? "#60a5fa" : "#2563eb";
  const accent2 = isDark ? "#fb923c" : "#ea580c";
  const cool = isDark ? "#a78bfa" : "#7c3aed";

  return (
    <Canvas
      // Cap DPR at 1.4 — imperceptible on retina, large GPU saving on hi-dpi.
      dpr={[1, 1.4]}
      // Pause the render loop entirely when the hero is off-screen.
      frameloop={paused ? "never" : "always"}
      camera={{ position: [0, 0, 8.5], fov: 38 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={isDark ? 0.4 : 0.7} />
      <pointLight position={[4, 4, 4]} intensity={2.2} color={accent} />
      <pointLight position={[-4, -2, 3]} intensity={1.4} color={cool} />
      <pointLight position={[0, -4, -3]} intensity={1.2} color={accent2} />

      <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.8}>
        <CoreSphere color={accent} />
        <GlassShell color={cool} />
      </Float>

      <OrbitingNodes color={accent2} />
      <Sparkles count={45} scale={[8, 5, 6]} size={2.4} speed={0.45} color={accent} opacity={0.9} />
      <StarField color={isDark ? "#eef2ff" : "#0b1430"} />
    </Canvas>
  );
}
