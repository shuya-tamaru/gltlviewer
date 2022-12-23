import { GetStaticPropsContext } from "next";
import WebGLCanvas from "../../components/threeComponents/WebGLCanvas";
import { buildingList, paths } from "../../utils/paths";

type Props = {
  id: string;
};

type FilteredList = {
  id: string;
  url: string;
};

export default function BuildingPage({ id }: Props) {
  const filteredList: FilteredList[] = buildingList.filter((value) => {
    if (value.id === id) return value;
  });

  const modelPath = filteredList[0].url;

  return (
    <>
      <WebGLCanvas modelPath={modelPath} />
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  return {
    props: {
      id: params!.id,
    },
  };
}
