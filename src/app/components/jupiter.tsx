import React from "react";
import { useGLTF, OrbitControls } from "@react-three/drei";

const Jupiter: React.FC = () => {

  const gltf = useGLTF("/jupiter/Jupiter1.glb", true);
  return <primitive object={gltf.scene} 
     scale={[0.0089,0.0089,0.0089]}
  />;
};

export default Jupiter;