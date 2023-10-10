// 토큰 설정 함수 set
// 사용자 로그인 또는 인증 시에 사용
// 로그인에 성공핬을때 서버에서 발급한 토큰을 로컬스토리지에 저장
export const setToken = (token: string | null) => {
  localStorage.setItem("token", token || "");
};

// 토큰 가져오기 함수 get
// 사용자 인증정보를 확인하거나 api요청 보낼때 사용
// 사용자가 인증되었는지 확인하거나 인증 토큰을 서버로 전송할 때 사용하여 로컬 스토리지에서 토큰을 가져온다
export const getToken = (): string | null => {
  return localStorage.getItem("token");
};
