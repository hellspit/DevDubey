import React from "react";
import { useGLTF, OrbitControls } from "@react-three/drei";

const Mars: React.FC = () => {

  const gltf = useGLTF("/Mars2.glb", true);
  return <primitive object={gltf.scene} 
    scale={[0.0038,0.0038,0.0038]}
  />;
};

export default Mars;