export const kakaoInit = () => {
    const kakao = (window as any).Kakao;
    if(!kakao.isInitialized()) {
        kakao.init('0ca19258a99780757880e499560b41f0');
    }

    return kakao;
}