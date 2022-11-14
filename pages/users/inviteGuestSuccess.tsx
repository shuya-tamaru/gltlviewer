import Form from '../../components/nextComponents/form';
import Header from '../../components/nextComponents/header';

export default function () {
  const title = 'ゲストユーザー登録フォーム送信完了';
  const buttonText = 'Top画面に戻る';
  const redirectPath = '/buildings/building';
  const redirectPage = true;

  return (
    <>
      <Header></Header>
      <Form title={title} buttonText={buttonText} redirectPath={redirectPath} redirectPage={redirectPage} />
    </>
  );
}
