import React from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const Neptune: React.FC = () => {
  const gltf = useGLTF("/neptune.glb", true);
  return (
    <primitive
      object={gltf.scene}
      scale={[0.18, 0.18, 0.18]}
    />
  );
};

export default Neptune;
