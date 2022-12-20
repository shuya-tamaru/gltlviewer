import { Button, Input, useToast } from "@chakra-ui/react";
import axios from "axios";

import { useState } from "react";
import { formStyle } from "../../styles/formStyle";

import { Building } from "../../types/Buildings";
import { toastText } from "../utils/toastStatus";
import IconUploadForm from "./iconUploadForm";

type inputForms = {
  inputForms: string[];
  data: Building;
};

export default function ({ inputForms, data }: inputForms) {
  const toast = useToast();
  const [buildingName, setBuildingName] = useState<string>(data.name);
  const [loading, setLoading] = useState(false);
  const [file, setFiles] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const updateBuilding: Building = {
        ...data,
        name: buildingName,
      };

      //buildingIconUpload
      if (file) {
        if (data.imagePath) {
          await axios.delete(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/uploads/delete`, {
            data: { path: data.imagePath },
          });
        }
        const imageData = new FormData();
        const fileName = file.name;
        imageData.append("name", fileName);
        imageData.append("file", file);
        const imagePath: string = await axios
          .post(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/uploads/upload`, imageData)
          .then((res) => res.data);
        updateBuilding.imagePath = imagePath;
      }

      //buildingUpdate
      const buildingUpdate = async () => {
        await axios.patch(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/buildings/${data.id}`, updateBuilding);
      };
      buildingUpdate();
      toast({ ...toastText.success, title: "更新が完了しました" });
      setLoading(false);
      location.reload();
    } catch (error) {
      toast({ ...toastText.error, title: "更新に失敗しました" });
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        {inputForms &&
          inputForms.map((form: string) => (
            <Input
              key={form}
              value={buildingName}
              onChange={(e) => setBuildingName(e.target.value)}
              type="text"
              placeholder={form}
              required
              sx={formStyle}
            />
          ))}
        <IconUploadForm setFiles={setFiles} action={"buildingUpdate"} building={data} />
        <Button isLoading={loading} type="submit" sx={style} color="#ffffff" colorScheme="red" fontWeight="800">
          更新
        </Button>
      </form>
    </>
  );
}

const style = {
  w: "90%",
  h: "50",
  py: "5",
  ml: "5",
  mt: "5",
};
