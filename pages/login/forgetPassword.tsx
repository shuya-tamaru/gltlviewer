import Form from '../../components/nextComponents/form';
import Header from '../../components/nextComponents/header';

export default function () {
  const inputForms = ['Email'];
  const title = '登録しているEmailを入力';
  const buttonText = 'パスワードリセットフォームを送信';
  const redirectPath = '/login/checkEmail';
  const redirectPage = true;

  return (
    <>
      <Header></Header>
      <Form
        inputForms={inputForms}
        title={title}
        buttonText={buttonText}
        redirectPath={redirectPath}
        redirectPage={redirectPage}
      />
    </>
  );
}
