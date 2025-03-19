import React from "react";
import { useGLTF, OrbitControls } from "@react-three/drei";

const Uranus: React.FC = () => {

  const gltf = useGLTF("/uranus/Uranus.glb", true);
  return <primitive object={gltf.scene} 
    scale={[0.004,0.004,0.004]}
  />;
};

export default Uranus;