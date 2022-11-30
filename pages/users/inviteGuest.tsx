import { useRouter } from "next/router";
import FormWithRadio from "../../components/nextComponents/formWithRadio";
import Header from "../../components/nextComponents/header";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { UserRoles } from "../../types/UserRoles";

export default function () {
  const inputForms = ["email"];
  const radioForms = ["権限1", "権限2"];
  const title = "ゲストユーザーを招待";
  const buttonText = "ゲストユーザー登録フォーム送信";
  const redirectPath = "/users/inviteGuestSuccess";
  const redirectPage = true;

  const router = useRouter();
  const currentUser = useCurrentUser();
  if (currentUser) {
    currentUser.userRole > UserRoles.Editor && router.push(`/topPage/${currentUser.companyId}`);
  }

  return (
    currentUser &&
    currentUser.userRole <= UserRoles.Editor && (
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
    )
  );
}
