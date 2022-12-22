import { useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { BuildingModel } from "../../hooks/threeHooks/useLoadingModel";

type Props = {
  buildingModel: BuildingModel;
};

const palneGeometry = new THREE.PlaneGeometry(0.5, 0.5);
const palneMaterial = new THREE.MeshBasicMaterial({
  color: "red",
  side: THREE.DoubleSide,
  transparent: true,
});

export default function Cursor({ buildingModel }: Props) {
  const texture = useTexture("/cursor/ring.png");
  palneMaterial.map = texture;
  const ref = useRef<THREE.Mesh | null>(null);
  const { raycaster } = useThree();

  useEffect(() => {
    window.addEventListener("mousemove", () => {
      const intersectObjects = raycaster.intersectObjects(buildingModel.scene.children);
      const firstintersectObject = intersectObjects[0];
      if (
        firstintersectObject &&
        firstintersectObject.object.parent?.visible &&
        ref.current &&
        (firstintersectObject.object.parent?.name.indexOf("floor") !== -1 ||
          firstintersectObject.object.name.indexOf("floor") !== -1)
      ) {
        const { x, y, z } = firstintersectObject.point;
        ref.current.position.set(x, y + 0.05, z);
      }
    });
  }, []);

  return <mesh ref={ref} geometry={palneGeometry} material={palneMaterial} rotation-x={Math.PI * -0.5} position-y={0.02} />;
}
