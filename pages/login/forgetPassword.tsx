import Form from "../../components/form";
import Header from "../../components/header";


export default function() {

  const inputForms = ["Email"];
  const title = "登録しているEmailを入力";
  const buttonText = "パスワードリセットフォームを送信";
  const redirectPath = "/login/checkEmail";
  const redirectPage = true;

  return (
    <>
      <Header></Header>
      <Form inputForms={inputForms} title={title} buttonText={buttonText} redirectPath={redirectPath} redirectPage={redirectPage}/>
    </>
  );
}