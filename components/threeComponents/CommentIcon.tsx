import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import useCommentPopUp from "../../hooks/threeHooks/useCommentPopUp";
import { BuildingModel } from "../../hooks/threeHooks/useLoadingModel";
import useCommentAction, { CommentAction } from "./stores/useCommentAction";

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

export default function CommentIcon({ buildingModel }: Props) {
  const { raycaster, camera } = useThree();
  const { commentAction, setCommsntAction } = useCommentAction((state) => state);
  const actions = CommentAction;

  const mouseMoveCount = useRef(0);
  const groupRef = useRef<THREE.Group | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);

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

  const setCommentIcon = (e: MouseEvent) => {
    if (
      mouseMoveCount.current < 3 &&
      e.target instanceof HTMLElement &&
      e.target.tagName === "CANVAS" &&
      commentAction === actions.ACTIVE
    ) {
      const newCommentIcon = meshRef.current!.clone();
      const userData = { tag: "comment", title: "hi", description: "helooooooo" };
      newCommentIcon.userData = userData;
      groupRef.current!.add(newCommentIcon);
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
