import { useFrame } from "@react-three/fiber";
import { BuildingModel } from "../../hooks/threeHooks/useLoadingModel";

type Props = {
  buildingModel: BuildingModel;
};

export default function SettingModel({ buildingModel }: Props) {
  buildingModel.scene.traverse((ele) => {
    if (ele.type === "Mesh") {
      ele.castShadow = true;
      ele.receiveShadow = true;
    }
  });
  const twoFour = buildingModel.scene.children.filter((element) => element.name === "twofour")[0];
  let defaultPosition = twoFour.position;
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const offset = 0.0013 * Math.sin(time);
    twoFour.position.set(twoFour.position.x, defaultPosition.y + offset, twoFour.position.z);
  });
  return <primitive object={buildingModel.scene} />;
}
