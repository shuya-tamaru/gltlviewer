import * as THREE from "three";
import { BuildingModel } from "./useLoadingModel";
import { useTexture } from "@react-three/drei";

function setUpMaterial(buildingModel: BuildingModel) {
  const tileTexture = useTexture(["/tile/rough.jpg", "/tile/normal.png"]);
  const concreteTexture = useTexture(["/concrete/rough.jpg", "/concrete/normal.png"]);
  const homeTexture = useTexture(["/home/rough.png", "/home/normal.png"]);
  const woodTexture = useTexture(["/wood/rough.png", "/wood/normal.png"]);
  const roofTexture = useTexture(["/roof/rough.png", "/roof/normal.png"]);

  Object.keys(buildingModel.materials).forEach((key) => {
    const material = buildingModel.materials[key] as THREE.MeshStandardMaterial;
    if (key.indexOf("ガラス") !== -1) {
      material.transparent = false;
      material.color.set(new THREE.Color("#848484"));
    }

    if (key.indexOf("tesuri") !== -1) {
      material.color.set(new THREE.Color("#2d1c10"));
      woodTexture[0].wrapS = THREE.RepeatWrapping;
      woodTexture[0].wrapT = THREE.RepeatWrapping;
      woodTexture[0].repeat = new THREE.Vector2(10, 10);
      woodTexture[1].wrapS = THREE.RepeatWrapping;
      woodTexture[1].wrapT = THREE.RepeatWrapping;
      woodTexture[1].repeat = new THREE.Vector2(10, 10);
      material.roughnessMap = woodTexture[0];
      material.normalMap = woodTexture[1];
      material.normalScale = new THREE.Vector2(2.5, 2.5);
      material.normalMap.rotation = Math.PI / 2;
    }
    if (key.indexOf("コンクリート") !== -1) {
      material.color.set(new THREE.Color("#a5a5a5"));
      material.roughnessMap = concreteTexture[0];
      material.normalMap = concreteTexture[1];
      material.normalScale = new THREE.Vector2(3.0, 3.0);
    }
    if (key.indexOf("tile") !== -1) {
      material.color.set(new THREE.Color("#383838"));
      material.roughnessMap = tileTexture[0];
      material.normalMap = tileTexture[1];
      material.normalScale = new THREE.Vector2(3.0, 3.0);
    }
    if (key.indexOf("home") !== -1) {
      homeTexture[0].wrapS = THREE.RepeatWrapping;
      homeTexture[0].wrapT = THREE.RepeatWrapping;
      homeTexture[0].repeat = new THREE.Vector2(10, 10);
      homeTexture[1].wrapS = THREE.RepeatWrapping;
      homeTexture[1].wrapT = THREE.RepeatWrapping;
      homeTexture[1].repeat = new THREE.Vector2(10, 10);
      material.roughnessMap = homeTexture[0];
      material.normalMap = homeTexture[1];
      material.normalScale = new THREE.Vector2(2.0, 2.0);
    }
    if (key.indexOf("roof") !== -1) {
      material.color.set(new THREE.Color("#1b2e38"));
      roofTexture[0].wrapS = THREE.RepeatWrapping;
      roofTexture[0].wrapT = THREE.RepeatWrapping;
      roofTexture[0].repeat = new THREE.Vector2(1, 1);
      roofTexture[1].wrapS = THREE.RepeatWrapping;
      roofTexture[1].wrapT = THREE.RepeatWrapping;
      roofTexture[1].repeat = new THREE.Vector2(1, 1);
      material.roughnessMap = roofTexture[0];
      material.normalMap = roofTexture[1];
      material.normalScale = new THREE.Vector2(3.0, 3.0);
    }
    if (key.indexOf("door") !== -1) {
      material.color.set(new THREE.Color("#230c0c"));
      roofTexture[0].wrapS = THREE.RepeatWrapping;
      roofTexture[0].wrapT = THREE.RepeatWrapping;
      roofTexture[0].repeat = new THREE.Vector2(1, 1);
      roofTexture[1].wrapS = THREE.RepeatWrapping;
      roofTexture[1].wrapT = THREE.RepeatWrapping;
      roofTexture[1].repeat = new THREE.Vector2(1, 1);
      material.roughnessMap = roofTexture[0];
      material.normalMap = roofTexture[1];
      material.normalScale = new THREE.Vector2(0.1, 0.1);
    }
    if (key.indexOf("Material") !== -1) {
      material.color.set(new THREE.Color("#777777"));
      material.roughness = 0;
    }
    material.envMapIntensity = 3.0;
  });

  return;
}

export default setUpMaterial;
