export const buildingList = [
  {
    id: "shinjuku",
    url: `${process.env.NEXT_PUBLIC_LOCAL_SHINJUKU}`,
    user: `${process.env.NEXT_PUBLIC_LOCAL_SHINJUKU_UER}`,
    password: `${process.env.NEXT_PUBLIC_LOCAL_SHINJUKU_PASSWORD}`,
  },
  {
    id: "azabu",
    url: `${process.env.NEXT_PUBLIC_LOCAL_AZABU}`,
    user: `${process.env.NEXT_PUBLIC_LOCAL_AZABU_UER}`,
    password: `${process.env.NEXT_PUBLIC_LOCAL_AZABU_PASSWORD}`,
  },
];

export const paths = buildingList.map((obj) => {
  let paramObject = { params: { id: "" } };
  paramObject.params.id = obj.id;
  return paramObject;
});
