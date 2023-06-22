import { Environment, OrbitControls } from "@react-three/drei";
import useLoadingModel from "../../hooks/threeHooks/useLoadingModel";
import SettingModel from "./SettingModel";

function Experience() {
  const buildingModel = useLoadingModel();
  return (
    <>
      <OrbitControls makeDefault target={[0, 2, 0]} />
      <SettingModel buildingModel={buildingModel} />
      <directionalLight intensity={1.3} position={[-5, 5, 5]} castShadow />
      <Environment
        files={[
          "/environmentMap/px.jpg",
          "/environmentMap/nx.jpg",
          "/environmentMap/py.jpg",
          "/environmentMap/ny.jpg",
          "/environmentMap/pz.jpg",
          "/environmentMap/nz.jpg",
        ]}
      />
    </>
  );
}

export default Experience;
