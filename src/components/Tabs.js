export default function Tabs() {
  return /*html*/ `
    <div>
        <ul class="flex relative">
            <li class="px-4">
                <a href="#" class="block px-2 py-3 border-b-4 border-[#0D5CB6]">Phổ biến</a>
            </li>
            <li class="px-4">
                <a href="#" class="block px-2 py-3">Bán chạy</a>
            </li>
            <li class="px-4">
                <a href="#" class="block px-2 py-3">Hàng mới</a>
            </li>
            <li class="px-4">
                <a href="#" class="block px-2 py-3">Giá thấp</a>
            </li>
            <li class="px-4">
                <a href="#" class="block px-2 py-3">Giá cao</a>
            </li>
            <div class="absolute left-0 bottom-[1.5px] -z-[1] h-[1px] bg-[#F2F2F2] w-full"></div>
        </ul>
    </div>
  `;
}
