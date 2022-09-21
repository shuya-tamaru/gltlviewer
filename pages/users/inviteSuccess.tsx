import Form from "../../components/form";
import Header from "../../components/header";


export default function() {

  const title = "招待メール送信完了";
  const buttonText = "Top画面に戻る";
  const redirectPath = "/";
  const redirectPage = true;

	return (
    <>
      <Header></Header>
      <Form title={title} buttonText={buttonText} redirectPath={redirectPath} redirectPage={redirectPage}/>
    </>
  );
}