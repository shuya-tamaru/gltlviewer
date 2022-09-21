import FormWithImage from '../../components/formWithImage';
import Header from '../../components/header';

export default function () {
  const inputForms = ['ユーザー名', 'email'];
  const title = 'ユーザー情報を編集';
  const buttonText = '更新';
  const redirectPath = '/';
  const redirectPage = true;

  return (
    <>
      <Header></Header>
      <FormWithImage inputForms={inputForms} title={title} buttonText={buttonText} redirectPath={redirectPath} redirectPage={redirectPage} />
    </>
  );
}
