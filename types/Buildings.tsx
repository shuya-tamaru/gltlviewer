export type Building = {
  id: string;
  name: string;
  companyId: string;
  modelPath: string;
  imagePath?: string;
  createdAt: string;
  updatedAt: string;
};

export type NewBuilding = {
  name: string;
  companyId: string;
  modelPath: string;
  imagePath?: string;
};
