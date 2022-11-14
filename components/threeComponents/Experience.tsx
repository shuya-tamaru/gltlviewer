import * as THREE from 'three';
import { Html, OrbitControls } from '@react-three/drei';
import LoadingModel from './LoadingModel';

export default function Experience() {
  return (
    <>
      <OrbitControls makeDefault />
      <LoadingModel />
    </>
  );
}
