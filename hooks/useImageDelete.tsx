import axios from "axios";

const useImageDelete = (deletePaths: string[]) => {
  deletePaths.map((deletePath) => {
    axios.delete(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/uploads/delete`, {
      data: { path: deletePath }
    });
  })
  return;
};

export default useImageDelete;