import React from "react";
import { useGLTF, OrbitControls } from "@react-three/drei";

const Mercury: React.FC = () => {

  const gltf = useGLTF("/Mercury.glb", true);
  return <primitive object={gltf.scene} />;
};

export default Mercury;