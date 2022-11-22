import { BuildingModel } from "./useLoadingModel";

function useMaterialSetup(buildingModel: BuildingModel) {
  Object.keys(buildingModel.materials).forEach((key) => {
    const material = buildingModel.materials[key] as THREE.MeshStandardMaterial;
    if (key.indexOf("ガラス") !== -1) {
      material.transparent = true;
    }
    material.roughness = 1.0;
    material.envMapIntensity = 3.0;
  });

  return;
}

export default useMaterialSetup;
