import Form from "../../components/nextComponents/form";
import TopBar from "../../components/nextComponents/topBar";

export default function () {
  const title = "招待メール送信完了";
  const buttonText = "Top画面に戻る";
  const redirectPath = "/";
  const redirectPage = true;

  return (
    <>
      <TopBar />
      <Form title={title} buttonText={buttonText} redirectPath={redirectPath} redirectPage={redirectPage} />
    </>
  );
}
