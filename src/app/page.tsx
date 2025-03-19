"use client";

import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Stars,
  OrbitControls,
  Preload,
  useProgress,
  Html,
  Line,
} from "@react-three/drei";
import { Suspense, useRef, ReactNode, useMemo, useEffect } from "react";
import type { NextPage } from "next";

// Import planet components
import Sun from "./components/sun";
import Mercury from "./components/mercury";
import Venus from "./components/venus";
import Earth from "./components/earth";
import Mars from "./components/mars";
import Jupiter from "./components/jupiter";
import Saturn from "./components/saturn";
import Uranus from "./components/uranus";
import Neptune from "./components/neptune";

// Loader Component
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ color: "white" }}>{progress.toFixed(2)}% loaded</div>
    </Html>
  );
}

// Recenter Button Component
function RecenterButton() {
  const { camera } = useThree();

  const recenterCamera = () => {
    camera.position.set(0, 10, 20); // Reset camera position
    camera.lookAt(0, 0, 0);
  };

  return (
    <Html position={[0, 0, 0]}>
      <div
        className="fixed bottom-4 left-4 z-50"
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          zIndex: 1000, // Ensure it's above the canvas
        }}
      >
        <button
          onClick={recenterCamera}
          className="w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700"
          style={{
            border: "none",
            cursor: "pointer",
            fontSize: "20px",
          }}
        >
          ⟳
        </button>
      </div>
    </Html>
  );
}
// Rotating Planet Component
interface RotatingPlanetProps {
  children: ReactNode;
  rotationSpeed: number;
  revolutionSpeed: number;
  orbitDistance: number;
}

const RotatingPlanet: React.FC<RotatingPlanetProps> = ({
  children,
  rotationSpeed,
  revolutionSpeed,
  orbitDistance,
}) => {
  const revolutionRef = useRef<THREE.Group>(null);
  const rotationRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (rotationRef.current) rotationRef.current.rotation.y += rotationSpeed * delta;
    if (revolutionRef.current) revolutionRef.current.rotation.y += revolutionSpeed * delta;
  });

  return (
    <group ref={revolutionRef}>
      <Orbit radius={orbitDistance} />
      <group ref={rotationRef} position={[orbitDistance, 0, 0]}>
        <mesh>
          {children}
        </mesh>
      </group>
    </group>
  );
};

// Orbit Ring Component
interface OrbitProps {
  radius: number;
  segments?: number;
  color?: string;
}

const Orbit: React.FC<OrbitProps> = ({ radius, segments = 64, color = "gray" }) => {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(radius * Math.cos(theta), 0, radius * Math.sin(theta)));
    }
    return pts;
  }, [radius, segments]);

  return <Line points={points} color={color} lineWidth={1} dashed={false} />;
};

// Rotating Sun Component
interface RotatingSunProps {
  rotationSpeed: number;
}

const RotatingSun: React.FC<RotatingSunProps> = ({ rotationSpeed }) => {
  const sunRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (sunRef.current) sunRef.current.rotation.y += rotationSpeed * delta;
  });

  return (
    <group ref={sunRef}>
      <Sun />
    </group>
  );
};

// Keyboard Controls Component
interface KeyboardControlsProps {
  controlsRef: React.RefObject<any>;
}

const KeyboardControls: React.FC<KeyboardControlsProps> = ({ controlsRef }) => {
  const { camera } = useThree();
  const keys = useRef<{ [key: string]: boolean }>({});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => (keys.current[e.key.toLowerCase()] = true);
    const handleKeyUp = (e: KeyboardEvent) => (keys.current[e.key.toLowerCase()] = false);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame((state, delta) => {
    const panSpeed = 5;
    const move = new THREE.Vector3();

    const right = new THREE.Vector3();
    right.setFromMatrixColumn(camera.matrix, 0).normalize();
    if (keys.current["a"]) move.addScaledVector(right, -panSpeed * delta);
    if (keys.current["d"]) move.addScaledVector(right, panSpeed * delta);

    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.normalize();
    if (keys.current["w"]) move.addScaledVector(forward, panSpeed * delta);
    if (keys.current["s"]) move.addScaledVector(forward, -panSpeed * delta);

    const up = new THREE.Vector3();
    up.setFromMatrixColumn(camera.matrix, 1).normalize();
    if (keys.current["q"]) move.addScaledVector(up, panSpeed * delta);
    if (keys.current["e"]) move.addScaledVector(up, -panSpeed * delta);

    if (move.lengthSq() > 0) {
      camera.position.add(move);
      if (controlsRef.current) {
        controlsRef.current.target.add(move);
        controlsRef.current.update();
      }
    }
  });

  return null;
};

// Home Component
const Home: NextPage = () => {
  const controlsRef = useRef<any>(null);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "black",
      }}
    >
      <Canvas camera={{ position: [0, 10, 20], fov: 60 }}>
        <OrbitControls ref={controlsRef} />
        <KeyboardControls controlsRef={controlsRef} />
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={2} />
          <pointLight position={[10, 10, 10]} intensity={1} />

          <RotatingSun rotationSpeed={0.2} />
          <RotatingPlanet rotationSpeed={1} revolutionSpeed={0.5} orbitDistance={8}>
            <Mercury />
          </RotatingPlanet>
          <RotatingPlanet rotationSpeed={1} revolutionSpeed={0.4} orbitDistance={12}>
            <Venus />
          </RotatingPlanet>
          <RotatingPlanet rotationSpeed={1} revolutionSpeed={0.3} orbitDistance={18}>
            <Earth />
          </RotatingPlanet>
          <RotatingPlanet rotationSpeed={1} revolutionSpeed={0.2} orbitDistance={25}>
            <Mars />
          </RotatingPlanet>
          <RotatingPlanet rotationSpeed={1} revolutionSpeed={0.1} orbitDistance={34}>
            <Jupiter />
          </RotatingPlanet>
          <RotatingPlanet rotationSpeed={1} revolutionSpeed={0.08} orbitDistance={48}>
            <Saturn />
          </RotatingPlanet>
          <RotatingPlanet rotationSpeed={1} revolutionSpeed={0.06} orbitDistance={58}>
            <Uranus />
          </RotatingPlanet>
          <RotatingPlanet rotationSpeed={1} revolutionSpeed={0.05} orbitDistance={64}>
            <Neptune />
          </RotatingPlanet>

          <Stars />
        
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Home;




