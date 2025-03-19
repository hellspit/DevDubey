import React from "react";
import { useGLTF, OrbitControls } from "@react-three/drei";

const Earth: React.FC = () => {

  const gltf = useGLTF("/earth/earth2.glb", true);
  return <primitive object={gltf.scene} scale={[0.2,0.2,0.2]}/>;
};

export default Earth;