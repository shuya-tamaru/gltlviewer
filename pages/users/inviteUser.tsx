import FormWithRadio from '../../components/nextComponents/formWithRadio';
import Header from '../../components/nextComponents/header';

export default function () {
  const inputForms = ['email'];
  const radioForms = ['管理者権限を付与', '権限1', '権限2', '権限3', '権限4', '権限5'];
  const title = '新規ユーザーを招待';
  const buttonText = '新規ユーザー登録フォーム送信';
  const redirectPath = '/users/inviteSuccess';
  const redirectPage = true;

  return (
    <>
      <Header></Header>
      <FormWithRadio
        inputForms={inputForms}
        radioForms={radioForms}
        title={title}
        buttonText={buttonText}
        redirectPath={redirectPath}
        redirectPage={redirectPage}
      />
    </>
  );
}
