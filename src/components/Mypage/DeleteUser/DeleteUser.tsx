import React, { useState } from "react";
import * as St from "./STDeleteUser";
import toast from "react-hot-toast";
import { Button } from "../../common/Button";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { deleteUser as deleteUserAPI } from "../../../api/api";
import { useLanguage } from "../../../util/Locales/useLanguage";
import { validateLoginPassword } from "../../../util/validation";

const DeleteUser: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [reason, setReason] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const mutation = useMutation(deleteUserAPI, {
    onSuccess: (data) => {
      console.log(t("회원탈퇴 성공!"), data);
      toast.success(t("탈퇴가 완료되었습니다!"), {
        className: "toast-success toast-container",
      });
      navigate("/login");
      queryClient.invalidateQueries("someQueryKey");
    },
    onError: (error) => {
      console.log(t("회원탈퇴 실패! 왜인지 알아보자"), error);
      setPasswordError(t("비밀번호를 다시 확인해주세요."));
    },
  });

  const handleDelete = () => {
    const passwordValidationError = t(validateLoginPassword(password));
    setPasswordError(passwordValidationError);
    if (passwordValidationError || reason === "") {
      toast.error(t("입력값을 다시 확인해주세요!"), {
        className: "toast-error toast-container",
      });
      return;
    }
    mutation.mutate(password);
  };

  return (
    <St.MyPageContainer>
      <St.MyPageWrap>
        <St.DeleteUserWrap>
          <p>{t("비밀번호 재입력")}</p>
          <St.InputWrap>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && (
              <St.ErrorMessage>{passwordError}</St.ErrorMessage>
            )}
          </St.InputWrap>
        </St.DeleteUserWrap>
        <St.DeleteUserWrap>
          <St.TextareaWrap>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder={`${t("탈퇴하는 사유를 입력해주세요 🙂")}\n\n${t(
                "소중한 피드백은 더 좋은 서비스를 제공하기 위해 적극적으로 반영하도록 하겠습니다!"
              )}\n\n${t(
                "소셜 로그인 하신분은 비밀번호 수정 후 이용 부탁드립니다."
              )}`}
            />
          </St.TextareaWrap>
        </St.DeleteUserWrap>
        <St.ButtonWrap>
          <Button onClick={handleDelete}>{t("탈퇴하기")}</Button>
        </St.ButtonWrap>
      </St.MyPageWrap>
    </St.MyPageContainer>
  );
};

export default DeleteUser;
