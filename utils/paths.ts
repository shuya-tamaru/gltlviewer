export const buildingList = [
  {
    id: `${process.env.NEXT_PUBLIC_LOCAL_SHINJUKU_ID}`,
    name: "shinjuku",
    url: `${process.env.NEXT_PUBLIC_LOCAL_SHINJUKU}`,
    password: `${process.env.NEXT_PUBLIC_LOCAL_SHINJUKU_PASSWORD}`,
  },
  {
    id: `${process.env.NEXT_PUBLIC_LOCAL_AZABU_ID}`,
    name: "azabu",
    url: `${process.env.NEXT_PUBLIC_LOCAL_AZABU}`,
    password: `${process.env.NEXT_PUBLIC_LOCAL_AZABU_PASSWORD}`,
  },
];

export const paths = buildingList.map((obj) => {
  let paramObject = { params: { id: "" } };
  paramObject.params.id = obj.id;
  return paramObject;
});
