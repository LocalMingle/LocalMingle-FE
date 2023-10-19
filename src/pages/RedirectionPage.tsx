import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { userState } from "../recoil/atoms/UserState";
import { kakaoLogin } from "../api/api";

export default function RedirectionPage() {
  const code = new URLSearchParams(window.location.search).get("code") || "";
  const navigate = useNavigate();
  const setUserInfo = useSetRecoilState(userState);

  useEffect(() => {
    const socialLogin = async () => {
      try {
        const response = await kakaoLogin(code);

        if (!response.data || !response.data.userId) {
          throw new Error("서버에서 userId 정보가 없습니다.");
        }

        const {
          accessToken,
          refreshToken,
          userId,
        }: { accessToken: string; refreshToken: string; userId: number } =
          response.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("userId", userId.toString());

        setUserInfo({
          userId: userId,
        });

        navigate("/");
      } catch (error) {
        console.error(error);
        alert("로그인 중 에러가 발생했습니다. 다시 시도해주세요.");
      }
    };

    socialLogin();
  }, [code, navigate, setUserInfo]);

  return <div>카카오 로그인 중입니다.</div>;
}
