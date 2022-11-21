import { useTexture } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import useCommentPopUp from '../../hooks/threeHooks/useCommentPopUp';
import { BuildingModel } from '../../hooks/threeHooks/useLoadingModel';
import useCommentAction, { CommentAction } from './stores/useCommentAction';

type Props = {
  buildingModel: BuildingModel;
};
const vec3Instance = new THREE.Vector3(0, 0, 0);

export default function CommentIcon({ buildingModel }: Props) {
  const { raycaster, camera } = useThree();
  const { commentAction, setCommsntAction } = useCommentAction((state) => state);
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
    meshRef.current?.lookAt(camera.position);
  });

  const setCommentIcon = (e: any) => {
    console.log(commentAction);
    if (
      mouseMoveCount.current < 3 &&
      e.target instanceof HTMLElement &&
      e.target.tagName === 'CANVAS' &&
      commentAction === actions.ACTIVE
    ) {
      console.log(groupRef);
      const newCommentIcon = meshRef.current!.clone();
      const userData = { tag: 'comment', title: 'hi', description: 'helooooooo' };
      newCommentIcon.userData = userData;
      groupRef.current!.add(newCommentIcon);
      setTimeout(() => {
        setCommsntAction(actions.READY);
      }, 100);
    }
  };

  useEffect(() => {
    window.addEventListener('mouseup', (e) => setCommentIcon(e), { once: true });
    window.removeEventListener('mouseup', (e) => setCommentIcon(e));

    window.addEventListener('mousemove', () => {
      mouseMoveCount.current++;
      const intersectObjects = raycaster.intersectObjects(buildingModel.scene.children);
      const firstintersectObject = intersectObjects[0];
      if (firstintersectObject && firstintersectObject.object.parent?.visible && meshRef.current) {
        const { x, y, z } = firstintersectObject.point;
        const cameraToCommentVec = vec3Instance.subVectors(camera.position, firstintersectObject.point).normalize();
        meshRef.current.position.set(
          x + cameraToCommentVec.x * 0.2,
          y + cameraToCommentVec.y * 0.2,
          z + cameraToCommentVec.z * 0.2,
        );
      }
    });
    window.addEventListener('mousedown', () => {
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
