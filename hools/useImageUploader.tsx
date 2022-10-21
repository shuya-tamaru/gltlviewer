import axios from "axios";

type Images = File[] | []


const useImageUploader = async (images: Images, commentId: string) => {
  const imageData = new FormData();
  images.map((image) => {
    const fileName = image.name;
    imageData.append("files", image);
    imageData.append("name", fileName);
  })
  const response: string[] = await axios.post(`${process.env.NEXT_PUBLIC_LOCAL_PATH}/uploads/multiple-upload/${commentId}`, imageData).then(res => res.data);
  return;
};

export default useImageUploader;