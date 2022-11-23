import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import { RootState, useFrame } from "@react-three/fiber";

import { RefObject, useEffect, useRef } from "react";

import useRayCastFloor from "../../hooks/threeHooks/useRayCastFloor";
import useViewEvent from "../../components/threeComponents/stores/useViewEvent";
import useCurrentFloor from "../../components/threeComponents/stores/useCurrentFloor";
import useCommentAction, { CommentAction } from "../../components/threeComponents/stores/useCommentAction";
import { BuildingModel } from "./useLoadingModel";
import useBoundingBox from "./useBoundingBox";

const sightHeight = 1.4;
let walkThrougCameraPos = new THREE.Vector3();
let cameraDirection = new THREE.Vector3();
let currentCameraDirection = new THREE.Vector3();
let nextTarget = new THREE.Vector3();
let calcCameraDirection = new THREE.Vector3();

function useCameraAction(buildingModel: BuildingModel, cameraRef: RefObject<OrbitControlsImpl>) {
  //imports
  const initialRender = useRef(true);
  const { perspectiveLookAt } = useBoundingBox(buildingModel);
  const { isPerspective, setIsPerspective, cameraIsMoving, cameraMovingToggle, handleFloorVisible, perspectiveCameraPos } =
    useViewEvent((state) => state);
  const { destinationFloor, setDestinationFloor, floorDefaultPosition, setCurrentWalkingFloor } = useCurrentFloor(
    (state) => state
  );
  const commentAction = useCommentAction((state) => state.commentAction);
  const actions = CommentAction;
  const { floorRayPos, setFloorRayPos, floorName } = useRayCastFloor(buildingModel);

  //update walkthrough pos
  useEffect(() => {
    if (initialRender) {
      walkThrougCameraPos.set(floorDefaultPosition[0].x, floorDefaultPosition[0].y + sightHeight, floorDefaultPosition[0].z);
      initialRender.current = false;
    }
  }, []);

  //function
  const setRayCastPosition = (floorRayPos: THREE.Vector3) => {
    setIsPerspective(false);
    cameraMovingToggle(true);
    setCurrentWalkingFloor(floorName);
    const { x, y, z } = floorRayPos;
    walkThrougCameraPos.set(x, y + sightHeight, z);
  };

  const resetState = () => {
    setFloorRayPos(null);
    cameraMovingToggle(false);
  };

  const setSelectedFloorPoition = (destinationFloor: number) => {
    const { x, y, z } = floorDefaultPosition[destinationFloor];
    walkThrougCameraPos.set(x, y + sightHeight, z);
    cameraMovingToggle(true);
  };

  const setCameraPosition = (cameraRef: RefObject<OrbitControlsImpl>, state: RootState, delta: number) => {
    handleFloorVisible("all");
    cameraRef.current!.rotateSpeed = 0.3;
    const cameraClone = state.camera.clone();
    const currentPos = cameraClone.position;
    const cameraMoveSpeed = 2 * delta;
    const newPos = isPerspective
      ? currentPos.lerp(perspectiveCameraPos, cameraMoveSpeed)
      : currentPos.lerp(walkThrougCameraPos, cameraMoveSpeed);

    currentCameraDirection = state.camera.getWorldDirection(calcCameraDirection).multiplyScalar(0.00001);
    nextTarget = walkThrougCameraPos.add(currentCameraDirection);

    state.camera.position.copy(newPos);
    cameraRef.current!.target = isPerspective ? perspectiveLookAt : cameraDirection.lerp(nextTarget, cameraMoveSpeed);
  };

  const cameraStop = (state: RootState) => {
    const targetPoint = isPerspective ? perspectiveCameraPos : walkThrougCameraPos;
    const distanceToDestination = Math.floor(state.camera.position.distanceTo(targetPoint) * 100) / 100;
    if (distanceToDestination < 0.5) {
      cameraMovingToggle(false);
      setDestinationFloor(null);
      setFloorRayPos(null);
    }
  };

  useEffect(() => {
    cameraRef.current!.target = perspectiveLookAt;
  }, [perspectiveLookAt]);

  useFrame((state, delta) => {
    if (typeof destinationFloor === "number" && !floorRayPos) {
      setSelectedFloorPoition(destinationFloor);
    } else {
      commentAction !== actions.ACTIVE ? floorRayPos && setRayCastPosition(floorRayPos) : resetState();
    }

    if (cameraRef.current && cameraIsMoving) {
      setCameraPosition(cameraRef, state, delta);
      cameraStop(state);
    } else {
    }
  });

  return;
}

export default useCameraAction;
