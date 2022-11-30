import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

import { Building } from "../../../../types/Buildings";

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  // storage: sessionStorage,
});

const initialValue: Building = {
  id: "",
  name: "",
  companyId: "",
  modelPath: "",
  imagePath: undefined,
  createdAt: "",
  updatedAt: "",
};

export const buildingState = atom({
  key: "building",
  default: initialValue,
  effects_UNSTABLE: [persistAtom],
});
