// 닉네임
export function validateNickname(nickname: string) {
  if (!nickname) {
    return "닉네임을 입력하세요.";
  }
  // 특수문자, 공백, 한글 자음/모음만 사용 불가
  if (/[!@#$%^&*(),.?":{}|<> ]|[ㄱ-ㅎㅏ-ㅣ]/.test(nickname)) {
    return "닉네임에는 특수문자, 공백, 단독 자음/모음을 사용할 수 없습니다.";
  }
  if (nickname.length < 2 || nickname.length > 8) {
    return "닉네임은 2자 이상 8자 이하로 입력해야 합니다.";
  }
  return "";
}

// 비밀번호
export function validatePassword(password: string) {
  if (!password) {
    return "비밀번호를 입력하세요.";
  }
  if (password.length < 8 || password.length > 15) {
    return "비밀번호는 8글자 이상 15글자 이하로 입력해야 합니다.";
  }
  if (
    !/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/.test(password)
  ) {
    return "비밀번호는 알파벳, 숫자 및 특수 문자를 포함해야 합니다.";
  }
  return "";
}

// 비밀번호 확인
export function validatePasswordConfirmation(
  password: string,
  passwordConfirmation: string
) {
  if (!passwordConfirmation) {
    return "비밀번호를 입력해주세요.";
  }
  if (password !== passwordConfirmation) {
    return "비밀번호를 다시 확인해주세요.";
  }
  return "";
}

// 이메일
export function validateEmail(email: string) {
  if (!email) {
    return "이메일을 입력하세요.";
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return "유효한 이메일 형식이 아닙니다.";
  }
  return "";
}

// 한 줄 자기소개
export function validateBio(bio: string) {
  if (!bio) {
    return "자기소개를 입력하세요.";
  }
  return "";
}
