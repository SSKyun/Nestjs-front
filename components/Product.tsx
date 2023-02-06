export default function Product() {
  return (
    <div className="h-[900px] w-full  bg-[#f5f9fd] p-16">
      <div className="ml-20 text-5xl font-bold">상품소개</div>
      <div className="mt-20 flex flex-row justify-around">
        <div className="w-1/4">
          <div className="h-[400px] w-full bg-slate-400"></div>
          <div className="mt-4 ml-4 w-full text-2xl font-semibold">
            직접 관수
          </div>
        </div>
        <div className="w-1/4">
          <div className="h-[400px] w-full bg-slate-400"></div>
          <div className="mt-4 ml-4 w-full text-2xl font-semibold">
            컨트롤러
          </div>
        </div>
        <div className="w-1/4">
          <div className="h-[400px] w-full bg-slate-400"></div>
          <div className="mt-4 ml-4 w-full text-2xl font-semibold">
            PC & 모바일
          </div>
        </div>
      </div>
    </div>
  );
}
