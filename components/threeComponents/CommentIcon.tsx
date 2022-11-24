import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import { useEffect, useRef } from "react";

import useCommentPopUp from "../../hooks/threeHooks/useCommentPopUp";
import { BuildingModel } from "../../hooks/threeHooks/useLoadingModel";
import useCommentAction, { CommentAction } from "./stores/useCommentAction";
import useCommentTransmission from "./stores/useCommentTransmission";
import { Comments } from "../../types/Comments";
import useCanvasState, { CanvasState } from "./stores/useCanvasState";
import useInitialFetchComment from "../../hooks/threeHooks/useInitialFetchComment";
import useCommentIconHandle from "../../hooks/threeHooks/useCommentIconHandle";

type Props = {
  buildingModel: BuildingModel;
};
const vec3Instance = new THREE.Vector3(0, 0, 0);
const iconGeometry = new THREE.PlaneGeometry(0.5, 0.5);
const iconMaterial = new THREE.MeshBasicMaterial({
  color: "red",
  side: THREE.DoubleSide,
  transparent: true,
});

type Coordinate = {
  x: number;
  y: number;
  z: number;
};

export default function CommentIcon({ buildingModel }: Props) {
  const { raycaster, camera } = useThree();
  const mouseMoveCount = useRef(0);
  const groupRef = useRef<THREE.Group | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);

  const { setfocusComment } = useCommentTransmission((state) => state);
  const { commentAction, setCommsntAction } = useCommentAction((state) => state);
  const actions = CommentAction;
  const canvasState = CanvasState;
  const { setCanvasState } = useCanvasState((state) => state);

  const commentIconTexture = useTexture("/comment/comment.png");
  const commentIconGeometry = iconGeometry;
  const commentIconMaterial = iconMaterial;
  commentIconMaterial.map = commentIconTexture;

  useFrame(() => {
    groupRef.current!.children.map((commentMesh) => {
      commentMesh.lookAt(camera.position);
    });
    meshRef.current?.lookAt(camera.position);
  });

  const addNewCommentIcon = (commentData?: Comments, FocusTemp?: boolean) => {
    const newCommentIcon = meshRef.current!.clone();
    let userData = { tag: "comment" };
    if (commentData) {
      const coordinate = commentData.coordinate as string;
      const parseCoordinate: Coordinate = JSON.parse(coordinate);
      const commentCoordinate = vec3Instance.set(parseCoordinate.x, parseCoordinate.y, parseCoordinate.z);
      newCommentIcon.position.set(commentCoordinate.x, commentCoordinate.y, commentCoordinate.z);
      userData = { ...userData, ...commentData };
    }
    newCommentIcon.visible = true;
    newCommentIcon.userData = userData;
    groupRef.current!.add(newCommentIcon);

    const focusComment = FocusTemp ? { guid: newCommentIcon.uuid, coordinate: newCommentIcon.position } : null;
    focusComment && setfocusComment(focusComment);
  };

  useInitialFetchComment(addNewCommentIcon);
  useCommentIconHandle(groupRef);

  const setCommentIcon = (e: MouseEvent) => {
    if (
      mouseMoveCount.current < 3 &&
      e.target instanceof HTMLElement &&
      e.target.tagName === "CANVAS" &&
      commentAction === actions.ACTIVE
    ) {
      addNewCommentIcon(undefined, true);
      setCanvasState(canvasState.ADD_COMMENT);
      setTimeout(() => {
        setCommsntAction(actions.READY);
      }, 100);
    }
  };

  const moveCommentIcon = () => {
    mouseMoveCount.current++;
    const intersectObjects = raycaster.intersectObjects(buildingModel.scene.children);
    const firstintersectObject = intersectObjects[0];
    if (firstintersectObject && firstintersectObject.object.parent?.visible && meshRef.current) {
      const { x, y, z } = firstintersectObject.point;
      const cameraToCommentVec = vec3Instance.subVectors(camera.position, firstintersectObject.point).normalize();
      meshRef.current.position.set(
        x + cameraToCommentVec.x * 0.2,
        y + cameraToCommentVec.y * 0.2,
        z + cameraToCommentVec.z * 0.2
      );
    }
  };

  useEffect(() => {
    window.addEventListener("mouseup", (e) => setCommentIcon(e), { once: true });
    window.addEventListener("mousemove", moveCommentIcon);
    window.addEventListener("mousedown", () => {
      mouseMoveCount.current = 0;
    });
  }, [commentAction]);

  useCommentPopUp(groupRef);

  return (
    <>
      <group ref={groupRef} visible={commentAction !== actions.INACTIVE ? true : false}></group>
      <mesh
        ref={meshRef}
        visible={commentAction === actions.ACTIVE ? true : false}
        geometry={commentIconGeometry}
        material={commentIconMaterial}
        scale={[0.5, 0.5, 0.5]}
      />
    </>
  );
}
