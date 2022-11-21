import { useTexture } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { BuildingModel } from '../../hooks/threeHooks/useLoadingModel';
import useCommentAction, { CommentAction } from './stores/useCommentAction';

type Props = {
  buildingModel: BuildingModel;
};

export default function Cursor({ buildingModel }: Props) {
  const texture = useTexture('/cursor/ring.png');
  const palneGeometry = new THREE.PlaneGeometry(0.5, 0.5);
  const palneMaterial = new THREE.MeshStandardMaterial({
    map: texture,
    color: 'red',
    side: THREE.DoubleSide,
    metalness: 0,
    roughness: 0,
    transparent: true,
  });

  const commentAction = useCommentAction((state) => state.commentAction);
  const actions = CommentAction;

  useFrame((state) => {
    const scale = Math.abs(Math.sin(state.clock.elapsedTime)) / 2 + 0.8;
    if (ref.current) {
      ref.current.scale.set(scale, scale, scale);
    }
  });

  const ref = useRef<THREE.Mesh | null>(null);
  const { raycaster } = useThree();

  useEffect(() => {
    window.addEventListener('mousemove', () => {
      const intersectObjects = raycaster.intersectObjects(buildingModel.scene.children);
      const firstintersectObject = intersectObjects[0];
      if (
        firstintersectObject &&
        firstintersectObject.object.parent?.visible &&
        ref.current &&
        (firstintersectObject.object.parent?.name.indexOf('floor') !== -1 ||
          firstintersectObject.object.name.indexOf('floor') !== -1)
      ) {
        const { x, y, z } = firstintersectObject.point;
        ref.current.position.set(x, y + 0.05, z);
      }
    });
  }, []);

  return (
    <mesh
      ref={ref}
      visible={commentAction !== actions.ACTIVE ? true : false}
      geometry={palneGeometry}
      material={palneMaterial}
      rotation-x={Math.PI * -0.5}
      position-y={0.02}
    />
  );
}
