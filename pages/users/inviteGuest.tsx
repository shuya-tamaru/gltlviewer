import FormWithRadio from '../../components/formWithRadio';
import Header from '../../components/header';

export default function () {
  const inputForms = ['email'];
  const radioForms = ['権限1', '権限2'];
  const title = 'ゲストユーザーを招待';
  const buttonText = 'ゲストユーザー登録フォーム送信';
  const redirectPath = '/users/inviteGuestSuccess';
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
