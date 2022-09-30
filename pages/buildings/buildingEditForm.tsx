import FormWithImage from '../../components/formWithImage';
import Header from '../../components/header';
import { useCurrentBuilding } from '../../context/CurrentBuildingContext';

export default function () {
  const currentBuilding = useCurrentBuilding();

  const inputForms = ['建物名'];
  const title = '建物情報を編集';
  const data = currentBuilding;
  const endPoint = `buildings/${currentBuilding?.id}`;

  return (
    <>
      <Header></Header>
      <FormWithImage inputForms={inputForms} title={title} data={data} endPoint={endPoint} />
    </>
  );
}
