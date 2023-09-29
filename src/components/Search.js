export default function Search() {
  return /*html */ `
    <div class="pl-20">
      <form action="" class="flex items-center h-10">
        <input type="text" class="h-full w-[626px] rounded-l-sm px-3 outline-none"/>
        <button class="flex items-center justify-center gap-2 h-full w-28 bg-[#0D5CB6] rounded-r-sm text-[13px] text-white">
          <img src="/search.svg" alt="" />
          <span>Tìm Kiếm</span>
        </button>
      </form>
    </div>
  `;
}
