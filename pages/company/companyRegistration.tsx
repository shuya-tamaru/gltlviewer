import Form from "../../components/form";
import Header from "../../components/header";


export default function() {

  const inputForms = ["会社名", "会社住所", "電話番号"];
  const title = "会社登録";
  const buttonText = "登録";
  const redirectPath = "/registration";
  const redirectPage = true;

	return (
    <>
      <Header></Header>
      <Form inputForms={inputForms} title={title} buttonText={buttonText} redirectPath={redirectPath} redirectPage={redirectPage}/>
    </>
  );
}
