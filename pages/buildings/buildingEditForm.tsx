import FormWithImage from "../../components/formWithImage";
import Header from "../../components/header";


export default function() {

  const inputForms = ["建物名"];
  const title = "建物情報を編集";
  const buttonText = "更新";
  const redirectPath = "/";
  const redirectPage = true;

	return (
    <>
      <Header></Header>
      <FormWithImage inputForms={inputForms} title={title} buttonText={buttonText} redirectPath={redirectPath} redirectPage={redirectPage}/>
    </>
  );
}
