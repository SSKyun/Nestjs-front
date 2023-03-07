export const kakaoInit = () => {
    const kakao = (window as any).Kakao;
    if (kakao && !kakao.isInitialized()) {
      kakao.init("32548fd96cf72e1016c7d823c860f79a"); //JavaScript Key
    }
    return kakao;
};