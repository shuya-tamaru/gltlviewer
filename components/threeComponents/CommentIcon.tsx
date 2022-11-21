import { useTexture } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { BuildingModel } from '../../hooks/threeHooks/useLoadingModel';
import useCommentAction, { CommentAction } from './stores/useCommentAction';

type Props = {
  buildingModel: BuildingModel;
};
const vec3Instance = new THREE.Vector3(0, 0, 0);

export default function CommentIcon({ buildingModel }: Props) {
  const { raycaster, camera } = useThree();
  const commentAction = useCommentAction((state) => state.commentAction);
  const actions = CommentAction;

  const mouseMoveCount = useRef(0);
  const groupRef = useRef<THREE.Group | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);

  const commentIconTexture = useTexture('/comment/comment.png');
  const commentIconGeometry = new THREE.PlaneGeometry(0.5, 0.5);
  const commentIconMaterial = new THREE.MeshStandardMaterial({
    map: commentIconTexture,
    color: 'red',
    side: THREE.DoubleSide,
    metalness: 0,
    roughness: 0,
    transparent: true,
  });

  useFrame(() => {
    groupRef.current!.children.map((commentMesh) => {
      commentMesh.lookAt(camera.position);
    });
  });

  useEffect(() => {
    window.addEventListener('mouseup', (e) => {
      if (mouseMoveCount.current < 3 && e.target instanceof HTMLElement && e.target.tagName === 'CANVAS') {
        const newCommentIcon = meshRef.current!.clone();
        groupRef.current!.add(newCommentIcon);
      }
    });
    window.addEventListener('mousemove', () => {
      mouseMoveCount.current++;
      const intersectObjects = raycaster.intersectObjects(buildingModel.scene.children);
      const firstintersectObject = intersectObjects[0];
      if (firstintersectObject && firstintersectObject.object.parent?.visible && meshRef.current) {
        const { x, y, z } = firstintersectObject.point;
        const cameraToCommentVec = vec3Instance.subVectors(camera.position, firstintersectObject.point).normalize();
        meshRef.current.position.set(
          x + cameraToCommentVec.x * 0.5,
          y + cameraToCommentVec.y * 0.5,
          z + cameraToCommentVec.z * 0.5,
        );
      }
    });
    window.addEventListener('mousedown', () => {
      mouseMoveCount.current = 0;
    });
  }, []);

  return (
    <>
      <group ref={groupRef} visible={commentAction !== actions.INACTIVE ? true : false}></group>
      <mesh
        ref={meshRef}
        visible={commentAction === actions.ACTIVE ? true : false}
        geometry={commentIconGeometry}
        material={commentIconMaterial}
        userData={{ tag: 'comment' }}
        scale={[0.7, 0.7, 0.7]}
      />
    </>
  );
}
