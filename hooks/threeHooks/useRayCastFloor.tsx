import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

import useCurrentFloor from "../../components/threeComponents/stores/useCurrentFloor";
import { BuildingModel } from "./useLoadingModel";

export default function useRayCastFloor(buildingModel: BuildingModel) {
  const { raycaster, scene } = useThree();
  const floorRayPos = useRef<THREE.Vector3 | null>(null);

  const setCurrentWalkingFloor = useCurrentFloor((state) => state.setCurrentWalkingFloor);
  const mouseMoveCount = useRef(0);
  const commentGroup = scene.children.filter((child) => child.name === "commentGroup");

  useEffect(() => {
    const rayTarget = buildingModel.scene.children;

    window.addEventListener("mouseup", (e) => {
      if (mouseMoveCount.current < 3 && e.target instanceof HTMLElement && e.target.tagName === "CANVAS") {
        const intersectObjects = raycaster.intersectObjects(buildingModel.scene.children);

        const floorIntersectObject = intersectObjects.filter((mesh) => {
          if (mesh.object.parent?.name.indexOf("floor") !== -1 || mesh.object.name.indexOf("floor") !== -1) return mesh;
        });
        if (floorIntersectObject.length > 0 && floorIntersectObject[0].object.parent?.visible) {
          const parentName = floorIntersectObject[0].object.parent.name;
          const meshName = floorIntersectObject[0].object.name;
          const getFloorName = parentName.indexOf("floor") !== -1 ? parentName : meshName;
          setCurrentWalkingFloor(getFloorName);
          floorRayPos.current = floorIntersectObject[0].point;
        } else {
          floorRayPos.current = null;
        }
      }
      mouseMoveCount.current = 0;
    });
    window.addEventListener("mousemove", () => {
      mouseMoveCount.current++;
    });
    window.addEventListener("mousedown", () => {
      mouseMoveCount.current = 0;
    });
  }, []);

  return { floorRayPos };
}
