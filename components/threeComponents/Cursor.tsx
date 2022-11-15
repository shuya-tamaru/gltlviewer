import { useTexture } from '@react-three/drei';
import { ObjectMap, useThree } from '@react-three/fiber';
import { Ref, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

type Props = {
  model: GLTF & ObjectMap;
};

export default function Cursor({ model }: Props) {
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

  const ref = useRef<THREE.Mesh | null>(null);

  const { raycaster } = useThree();

  useEffect(() => {
    window.addEventListener('mousemove', () => {
      const intersectObjects = raycaster.intersectObjects(model.scene.children);
      const firstintersectObject = intersectObjects[0];
      if (firstintersectObject && ref.current) {
        const { x, y, z } = firstintersectObject.point;
        ref.current.position.set(x, y, z);
      }
    });
  }, []);

  return (
    <mesh
      ref={ref}
      geometry={palneGeometry}
      material={palneMaterial}
      rotation-x={Math.PI * -0.5}
      position-y={0.02}
    ></mesh>
  );
}
