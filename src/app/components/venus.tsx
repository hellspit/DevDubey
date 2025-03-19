import React from "react";
import { useGLTF, OrbitControls } from "@react-three/drei";

const Venus: React.FC = () => {

  const gltf = useGLTF("/venus.glb", true);
  return <primitive object={gltf.scene} scale={[0.09,0.09,0.09]}/>;
};

export default Venus