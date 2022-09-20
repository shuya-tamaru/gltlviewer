import Form from "../../components/form";
import Header from "../../components/header";


export default function() {

  const inputForms = ["新しいパスワード", "新しいパスワード確認"];
  const title = "パスワードをリセット";
  const buttonText = "パスワードをリセットする";
  const redirectPath = "/login/resetSuccessful";
  const redirectPage = true;

  return (
    <>
      <Header></Header>
      <Form inputForms={inputForms} title={title} buttonText={buttonText} redirectPath={redirectPath} redirectPage={redirectPage}/>
    </>
  );
}