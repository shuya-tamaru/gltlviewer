import Form from '../../components/nextComponents/form';
import Header from '../../components/nextComponents/header';

export default function () {
  const title = 'パスワードのリセットが完了しました';
  const buttonText = 'ログインフォームへ';
  const redirectPath = '/login';
  const redirectPage = true;

  return (
    <>
      <Header></Header>
      <Form title={title} buttonText={buttonText} redirectPath={redirectPath} redirectPage={redirectPage} />
    </>
  );
}
