import React from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const Saturn: React.FC = () => {
  const gltf = useGLTF("/saturn.glb", true);

  
  gltf.scene.traverse((child) => {
    if (child instanceof THREE.Mesh && child.material) {
      if (child.material instanceof THREE.MeshStandardMaterial) {
        
        child.material.emissive = new THREE.Color(0x222222);
        child.material.emissiveIntensity = 0.3;
      
        child.material.metalness = 0.2;
        child.material.roughness = 0.7;
      }
    }
  });

  return <primitive object={gltf.scene} scale={[0.006, 0.006, 0.006]} />;
};

export default Saturn;
