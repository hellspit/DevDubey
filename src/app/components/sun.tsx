import { useGLTF, OrbitControls } from "@react-three/drei";
import type { NextPage } from "next";
import React from "react";
import * as THREE from "three"; 

const Sun: React.FC = () => {
    const gltf = useGLTF('/sun.glb', true);

    // Traverse the scene and update material properties for a reddish tone
    gltf.scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        if (child.material instanceof THREE.MeshStandardMaterial) {
          child.material.color.set('#a8a232'); // reddish-orange
          child.material.emissive.set("#a8a232");
          child.material.emissiveIntensity = 1;
        } else {
          // For other material types, update the color if possible
          child.material.color = new THREE.Color(0xff4500);
        }
      }
    });
  
    return <primitive object={gltf.scene} scale={[0.51, 0.51, 0.51]} />;
  };

export default Sun;