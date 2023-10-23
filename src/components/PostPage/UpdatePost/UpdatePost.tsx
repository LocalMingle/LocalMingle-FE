import React from "react";
import * as St from "./STUpdatePost";
import { useNavigate } from "react-router-dom";
import { Selector } from "../../common/Selector";
import { Button } from "../../common/Button";
import { useLanguage } from "../../../util/Locales/useLanguage";

const ModifyPost: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const postCancel = () => {
    navigate("/mypage/makelist");
  };

  const postModify = () => {
    alert("[TEST] 게시글이 수정되었습니다!");
    navigate("/mypage/makelist");
  };

  return (
    <>
      <St.PostSection>
        <St.SelectorWrap>
          <Selector></Selector>
          <Selector></Selector>
        </St.SelectorWrap>
        <St.TitleWrap>
          <input type="text" placeholder={t("제목을 입력하세요")} />
        </St.TitleWrap>
        <St.InputWrap>
          <div>
            <p>{t("모임일시")}</p>
            <input type="date" />
          </div>
          <div>
            <p>{t("참가신청 기간")}</p>
            <input type="date" />
            &nbsp;~&nbsp;
            <input type="date" />
          </div>
          <div>
            <p>{t("모임주소")}</p>
            <input type="text" placeholder="ex. 서울시 마포구" />
          </div>
          <div>
            <p>{t("모임인원")}</p>
            <input type="number" placeholder="ex. 10" />
            <span>{t("명")}</span>
          </div>
        </St.InputWrap>
        <St.ContentsWrap>
          <textarea placeholder={t("내용을 입력하세요")} />
        </St.ContentsWrap>
        <St.ButtonWrap>
          <Button bgcolor="#fff" onClick={postCancel}>
            {t("취소")}
          </Button>
          <Button onClick={postModify}>{t("수정")}</Button>
        </St.ButtonWrap>
      </St.PostSection>
    </>
  );
};

export default ModifyPost;
