import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import { useEffect, useRef } from "react";

import useCommentPopUp from "../../hooks/threeHooks/useCommentPopUp";
import { BuildingModel } from "../../hooks/threeHooks/useLoadingModel";
import useCommentHandleThreejs from "../../hooks/threeHooks/useCommentHandleThreejs";
import useCommentModeState, { CommentModeStates } from "./stores/useCommentModeState";
import useCommentTransmission from "./stores/useCommentTransmission";
import useCommentActions, { CommentActions } from "./stores/useCommentActions";
import { Comments } from "../../types/Comments";

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
  const commentIconTexture = useTexture("/comment/comment.png");
  const commentIconGeometry = iconGeometry;
  const commentIconMaterial = iconMaterial;
  commentIconMaterial.map = commentIconTexture;

  const { raycaster, camera } = useThree();
  const mouseMoveCount = useRef(0);
  const groupRef = useRef<THREE.Group | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);

  const { setfocusComment } = useCommentTransmission((state) => state);
  const { commentModeState, setCommentModeState } = useCommentModeState((state) => state);
  const { setCommentAction } = useCommentActions((state) => state);

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

  const setCommentIcon = (e: MouseEvent) => {
    if (
      mouseMoveCount.current < 3 &&
      e.target instanceof HTMLElement &&
      e.target.tagName === "CANVAS" &&
      commentModeState === CommentModeStates.ACTIVE
    ) {
      addNewCommentIcon(undefined, true);
      setCommentAction(CommentActions.ADD_COMMENT);
      setTimeout(() => {
        setCommentModeState(CommentModeStates.READY);
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

  useCommentPopUp(groupRef);

  // connect To frontEndApp
  useCommentHandleThreejs(groupRef, addNewCommentIcon);

  useFrame(() => {
    groupRef.current!.children.map((commentMesh) => {
      commentMesh.lookAt(camera.position);
    });
    meshRef.current?.lookAt(camera.position);
  });

  useEffect(() => {
    window.addEventListener(
      "mouseup",
      (e) => {
        setCommentIcon(e);
      },
      { once: true }
    );
    window.addEventListener("mousemove", () => {
      commentModeState === CommentModeStates.ACTIVE && moveCommentIcon();
    });
    window.addEventListener("mousedown", () => {
      mouseMoveCount.current = 0;
    });
  }, [commentModeState]);

  return (
    <>
      <group
        ref={groupRef}
        visible={commentModeState !== CommentModeStates.INACTIVE ? true : false}
        name={"commentGroup"}
      ></group>
      <mesh
        ref={meshRef}
        visible={commentModeState === CommentModeStates.ACTIVE ? true : false}
        geometry={commentIconGeometry}
        material={commentIconMaterial}
        scale={[0.5, 0.5, 0.5]}
      />
    </>
  );
}
