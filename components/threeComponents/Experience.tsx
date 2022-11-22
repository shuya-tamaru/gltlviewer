import { Environment, OrbitControls, Stage } from '@react-three/drei';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

import { useRef } from 'react';

import useViewEvent from './stores/useViewEvent';
import useLoadingModel, { BuildingModel } from '../../hooks/threeHooks/useLoadingModel';
import SettingModel from './SettingModel';
import useCameraAction from '../../hooks/threeHooks/useCameraAction';

export default function Experience() {
  const buildingModel: BuildingModel = useLoadingModel();

  const cameraRef = useRef<OrbitControlsImpl>(null);
  const isPerspective = useViewEvent((state) => state.isPerspective);

  useCameraAction(buildingModel, cameraRef);

  return (
    <>
      <OrbitControls ref={cameraRef} enableZoom={isPerspective ? true : false} makeDefault />
      <SettingModel buildingModel={buildingModel} />
      <Environment
        files={[
          '/environmentMap/px.jpg',
          '/environmentMap/nx.jpg',
          '/environmentMap/py.jpg',
          '/environmentMap/ny.jpg',
          '/environmentMap/pz.jpg',
          '/environmentMap/nz.jpg',
        ]}
      />
    </>
  );
}
